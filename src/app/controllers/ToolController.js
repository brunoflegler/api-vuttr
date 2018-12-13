const Tool = require('../models/Tool')

class ToolsController {
  async index (req, res) {
    const { ...query } = req.query

    let filters = {}

    if (query.tag) {
      filters = { tags: { $all: [query.tag] } }
    }

    const tools = await Tool.find(filters)
    res.json(tools)
  }

  async show (req, res) {
    const tool = await Tool.findById(req.params.id)
    return res.json(tool)
  }

  async store (req, res) {
    const { ...data } = req.body
    const tool = await Tool.create(data)
    return res.json(tool)
  }

  async update (req, res) {
    const { ...data } = req.body

    const tool = await Tool.findOneAndUpdate(req.params.id, data, {
      new: true
    })

    res.json(tool)
  }

  async destroy (req, res) {
    await Tool.findOneAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new ToolsController()
