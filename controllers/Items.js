const User = require('../models/User')
const Item = require('../models/Item')
const middleware = require('../middleware')

const createItem = async (req, res) => {
  try {
    req.body.ownerId = res.locals.payload.id
    const createdItem = await Item.create(req.body)
    res.send(createdItem)
  } catch (error) {
    throw error
  }
}

const getItemDetails = async (req, res) => {
  try {
    const itemDetails = await Item.findById(req.params.id)
    res.send(itemDetails)
  } catch (error) {
    throw error
  }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const item = await Item.findById(req.params.id)
    if (item.ownerId.toString() === id) {
      await Item.findOneAndDelete(req.params.id)
      res.send({ msg: 'successful' })
    }
  } catch (error) {
    throw error
  }
}

const getSellerItems = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const items = await Item.find({ ownerId: id })
    res.send({ msg: 'successful', items: items })
  } catch (error) {
    throw error
  }
}


module.exports = {
  createItem,
  getItemDetails,
  deleteItem,
  getSellerItems
}
