const supertest = require('supertest')
const expect = require('chai').expect
const app = require('../server')
const request = supertest.agent(app)

const credentials = {
  _id: '5c00043419f042f0589858ff',
  name: 'Mocha user',
  email: 'mocha@gmail.com',
  password: '123456'
}
const user = {}

before(async () => {
  await request
    .set('Accept', 'application/json')
    .post('/users')
    .send(credentials)
    .expect(200)

  const response = await request
    .post('/sessions')
    .set('Accept', 'application/json')
    .send({
      email: credentials.email,
      password: credentials.password
    })
    .expect(200)

  user.token = response.body.token
})

after(async () => {
  await request
    .set('Accept', 'application/json')
    .delete(`/users/${credentials._id}`)
    .expect(200)
})

describe('POST /tools', () => {
  const tool = {
    _id: '5be2379aa09da1f159170c85',
    title: 'teste',
    link: 'https://www.teste.io/',
    description: 'Example',
    tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost']
  }

  it('respond with json containing a create new tool', async () => {
    const response = await request
      .post('/tools')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user.token}`)
      .send(tool)
      .expect(200)

    expect(response.body._id).to.equal('5be2379aa09da1f159170c85')
  })
})

describe('PUT /tools/5be2379aa09da1f159170c85', () => {
  const tool = {
    _id: '5be2379aa09da1f159170c85',
    title: 'teste updated',
    link: 'https://www.teste.io/',
    description: 'Example',
    tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost']
  }

  it('respond with json containing a update one tool', async () => {
    const response = await request
      .put('/tools/5be2379aa09da1f159170c86')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user.token}`)
      .send(tool)
      .expect(200)

    expect(response.body.title).to.equal('teste updated')
  })
})

describe('DELETE /tools/5be2379aa09da1f159170c85', () => {
  it('respond with 200 OK', async () => {
    await request
      .delete('/tools/5be2379aa09da1f159170c85')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
  })
})

describe('GET /tools', () => {
  it('respond with json containing a list of all tools', async () => {
    await request
      .get('/tools')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
  })
})

describe('GET /tools?tag=organization', () => {
  it('respond with json containing a list of tools by tags', async () => {
    await request
      .get('/tools?tag=organization')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
  })
})
