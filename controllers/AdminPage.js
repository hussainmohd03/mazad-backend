const Items = require('../models/Item')

const approveItem = async (req, res) => {
  try {
    const aprovedItems = await Items.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    )
    res.status(200).send(aprovedItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const rejectItem = async (req, res) => {
  try {
    const rejectedItem = await Items.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    )
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
  approveItem,
  rejectItem,
  getingAllItems
}
