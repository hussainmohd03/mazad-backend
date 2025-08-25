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
} // tested

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
} // tested

const pendingItem = async (req, res) => {
  try {
    const pendingItem = await Items.findByIdAndUpdate(
      req.params.id,
      { status: 'pending' },
      { new: true }
    )
    res.status(200).send(pendingItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
} // tested

const getingAllItems = async (req, res) => {
  try {
    const AllItems = await Items.find()
    res.status(200).send(AllItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
} // tested

module.exports = {
  approveItem,
  rejectItem,
  pendingItem,
  getingAllItems
}
