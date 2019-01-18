const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

const server = require('../../src/index')
const User = mongoose.model('User')
const factories = require('../factories')

describe('Authenticate a user', () => {
  beforeEach(async () => {
    await User.deleteMany()
  })

  describe('Sign in', () => {
    it('POST /sessions it should be able authenticate a user', async () => {
      const user = await factories.create('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post('/sessions')
        .send({
          email: user.email,
          password: '123456'
        })

      expect(response.body).to.be.property('token')
      expect(response).to.be.status(200)
    })

    it('POST /sessions it should be able validate user exists ', async () => {
      const user = await factories.attrs('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post('/sessions')
        .send({
          email: user.email,
          password: '123456'
        })

      expect(response.body).to.be.property('error')
      expect(response).to.be.status(400)
    })

    it('POST /sessions it should be able validate password ', async () => {
      const user = await factories.attrs('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post('/sessions')
        .send({
          email: user.email,
          password: '1234568='
        })

      expect(response.body).to.be.property('error')
      expect(response).to.be.status(400)
    })
  })

  describe('Sign up', () => {
    it('POST /users it should be able to sign up', async () => {
      const user = await factories.attrs('User')

      const response = await chai
        .request(server)
        .post('/users')
        .send(user)

      expect(response).to.have.status(200)
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
    })

    it('POST /users it should be able validate email duplicated', async () => {
      const user = await factories.create('User')
      const userDuplicated = await factories.attrs('User', {
        email: user.email
      })
      const response = await chai
        .request(server)
        .post('/users')
        .send(userDuplicated)

      expect(response).to.have.status(400)
      expect(response.body).to.be.property('error')
    })

    it('POST /users it should be able validate fields', async () => {
      const user = {}

      const response = await chai
        .request(server)
        .post('/users')
        .send(user)

      expect(response).to.have.status(400)
      expect(response.body).to.be.property('errors')
    })
  })
})
