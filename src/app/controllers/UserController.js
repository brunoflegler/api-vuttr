const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async destroy (req, res) {
    await User.findOneAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new UserController()
