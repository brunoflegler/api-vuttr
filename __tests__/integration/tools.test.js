const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

const server = require('../../src/index')
const factories = require('../factories')

const User = mongoose.model('User')
const Tool = mongoose.model('Tool')

describe('Tools', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Tool.deleteMany()
  })

  it('POST /tools it should be able to create a tool', async () => {
    const tool = await factories.attrs('Tool')
    const user = await factories.create('User')
    const token = await User.generateToken(user)

    const response = await chai
      .request(server)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool)

    expect(response).to.have.status(200)
    expect(response.body).to.have.property('title')
    expect(response.body).to.have.property('description')
    expect(response.body).to.have.property('link')
    expect(response.body).to.have.property('tags')
  })

  it('POST /tools it should be able to validate fields tool', async () => {
    const tool = {}
    const user = await factories.create('User')
    const token = await User.generateToken(user)

    const response = await chai
      .request(server)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool)

    expect(response).to.have.status(400)
    expect(response.body).to.have.property('errors')
  })

  it('PUT /tools it should be able to update a tool', async () => {
    const tool = await factories.create('Tool')

    const user = await factories.create('User')
    const token = await User.generateToken(user)
    tool.tags = ['react', 'nodejs']
    const response = await chai
      .request(server)
      .put(`/tools/${tool._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(tool)

    expect(response).to.have.status(200)
    expect(response.body.tags).to.have.all.members(tool.tags)
  })

  it('GET /tools it should be able to find all a tool', async () => {
    await factories.create('Tool')
    const user = await factories.create('User')
    const token = await User.generateToken(user)

    const response = await chai
      .request(server)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`)

    expect(response).to.have.status(200)
    expect(response.body).to.have.lengthOf(1)
  })

  it('GET /tools it should be able to find tool by tags', async () => {
    const tool = await factories.create('Tool')
    const user = await factories.create('User')
    const token = await User.generateToken(user)

    const response = await chai
      .request(server)
      .get(`/tools?tag=${tool.tags[0]}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response).to.have.status(200)
    expect(response.body).to.have.lengthOf(1)
  })

  it('GET /tools it should be able to find tool by tags correctly', async () => {
    await factories.create('Tool')
    const user = await factories.create('User')
    const token = await User.generateToken(user)

    const response = await chai
      .request(server)
      .get(`/tools?tag=tese`)
      .set('Authorization', `Bearer ${token}`)

    expect(response).to.have.status(200)
    expect(response.body).to.have.lengthOf(0)
  })

  it('GET /tools it should be able to find tool by id', async () => {
    const tool = await factories.create('Tool')
    const user = await factories.create('User')
    const token = await User.generateToken(user)

    const response = await chai
      .request(server)
      .get(`/tools/${tool._id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response).to.have.status(200)
    expect(response.body).to.have.property('title')
    expect(response.body).to.have.property('description')
    expect(response.body).to.have.property('link')
    expect(response.body).to.have.property('tags')
  })

  it('DELETE /tools it should be able to delete a tool', async () => {
    const tool = await factories.create('Tool')
    const user = await factories.create('User')
    const token = await User.generateToken(user)

    const response = await chai
      .request(server)
      .delete(`/tools/${tool._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(tool)

    expect(response).to.have.status(200)
  })
})
