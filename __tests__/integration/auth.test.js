const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

const server = require('../../src/index')
const factories = require('../factories')
const User = mongoose.model('User')

describe('/users', () => {
  beforeEach(async () => {
    await User.deleteMany()
  })

  describe('Sign up', () => {
    it('It should be able to sign up', async () => {
      const user = await factories.attrs('User')

      const response = await chai
        .resquest(server)
        .post('/users')
        .send(user)

      expect(response).to.have.status(200)
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
    })
  })
})
