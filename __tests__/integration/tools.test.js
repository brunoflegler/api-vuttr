const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

const server = require('../../src/index')
const factories = require('../factories')
const User = mongoose.model('User')
const Tool = mongoose.model('Tool')

describe('Authenticate a user', () => {
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
})
