const Item = require('../models/Item')

const approveItem = async (req, res) => {
  try {
    const aprovedItems = await Item.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    )
    res.status(200).send(aprovedItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
} // tested

const rejectItem = async (req, res) => {
  try {
    const rejectedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    )
    res.status(200).send(rejectedItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
} // tested

const pendingItem = async (req, res) => {
  try {
    const pendingItem = await Item.findByIdAndUpdate(
      req.params.id,
      { status: 'pending' },
      { new: true }
    )
    res.status(200).send(pendingItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
} // tested

const ListAllItems = async (req, res) => {
  try {
    const items = await Item.find({})
    if (items) {
      res.send({ msg: 'success all items fetched', item: items })
    } else {
      res.send({ msg: 'no items found' })
    }
  } catch {
    throw error
  }
}

module.exports = {
  approveItem,
  rejectItem,
  pendingItem,
  ListAllItems
}
