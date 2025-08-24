const Items = require('../models/Item')

const approvedItem = async (req, res) => {
  try {
    const aprovedItems = await Items.find({ status: 'approved' })
    res.status(200).send(aprovedItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const rejectedItem = async (req, res) => {
  try {
    const rejectedItem = await Items.find({ status: 'rejected' })
    res.status(200).send(rejectedItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getingAllItems = async (req, res) => {
  try {
    const AllItems = await Items.find()
    res.status(200).send(AllItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  approvedItem,
  rejectedItem,
  getingAllItems
}
