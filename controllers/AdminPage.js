const Item = require('../models/Item')
const User = require('../models/User')

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

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ type: 'admin' })
    res.send({ msg: 'got all admins', admins: admins })
  } catch (error) {}
}

const deleteAdmin = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.send({ msg: 'account deleted ' })
  } catch (error) {}
}

const updateAdminProfile = async (req, res) => {
  try {
    const { id } = req.params
    const admin = await User.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.send({ msg: 'account edited', admin: admin })
  } catch (error) {}
}
module.exports = {
  approveItem,
  rejectItem,
  pendingItem,
  ListAllItems,
  getAllAdmins,
  deleteAdmin,
  updateAdminProfile
}
