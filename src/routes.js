const express = require('express')
const Router = express.Router()
const validate = require('express-validation')

const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middlewares/auth')

Router.post(
  '/users',
  validate(validators.UserValidator),
  controllers.UserController.store
)

Router.post(
  '/sessions',
  validate(validators.SessionValidator),
  controllers.SessionController.store
)

Router.use('/tools', authMiddleware)

Router.get('/tools', controllers.ToolController.index)
Router.get('/tools/:id', controllers.ToolController.show)
Router.post(
  '/tools',
  validate(validators.ToolValidator),
  controllers.ToolController.store
)
Router.put(
  '/tools/:id',
  validate(validators.ToolValidator),
  controllers.ToolController.update
)
Router.delete('/tools/:id', controllers.ToolController.destroy)

module.exports = Router
