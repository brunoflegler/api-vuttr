const mongoose = require('mongoose')
const factoryGirl = require('factory-girl')
const faker = require('faker')

const { factory } = factoryGirl

factory.setAdapter(new factoryGirl.MongooseAdapter())

/**
 * User
 */

factory.define('User', mongoose.model('User'), {
  name: faker.name.findName(),
  username: factory.seq('User.username', u => `user_${u}`),
  email: factory.seq('User.email', u => `user_${u}@email.com`),
  password: faker.internet.password()
})

module.exports = factory
