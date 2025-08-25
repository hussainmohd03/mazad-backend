const User = require('../models/User')
const Item = require('../models/Item')
const middleware = require('../middleware')

const createItem = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const user = await User.findById(id)
    if (user.verified) {
      const item = await Item.create(req.body)
      res.status(200).send({ msg: 'item created successfully', item: item })
    } else {
      return res.status(200).send('user not verified')
    }
  } catch (error) {
    throw error
  }
}

const getItemDetails = async (req, res) => {
  try {
    const itemDetails = await Item.findById(req.params.id)
    res.json(itemDetails)
  } catch (error) {
    throw error
  }
}

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    res.json('done')
  } catch (error) {
    throw error
  }
}

const getSellerItems = async (req, res) => {
  try {
    const items = await Item.find({ ownerId: req.body.ownerId })
    res.json(items)
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
