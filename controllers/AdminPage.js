const Item = require('../models/Item')
const User = require('../models/User')

const updateItemStatus = async (req, res) => {
  try {
    if (req.query.action === 'approved') {
      const aprovedItems = await Item.findByIdAndUpdate(
        req.params.id,
        { status: 'approved' },
        { new: true }
      )
      res.status(200).send(aprovedItems)
    } else if (req.query.action === 'rejected') {
      const rejectedItem = await Item.findByIdAndUpdate(
        req.params.id,
        { status: 'rejected' },
        { new: true }
      )
      res.status(200).send(rejectedItem)
    } else if (req.query.action === 'pending') {
      const pendingItem = await Item.findByIdAndUpdate(
        req.params.id,
        { status: 'pending' },
        { new: true }
      )
      res.status(200).send(pendingItem)
    } else {
      res.send('no query param')
    }
  } catch (error) {}
}

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
  updateItemStatus,
  ListAllItems,
  getAllAdmins,
  deleteAdmin,
  updateAdminProfile
}
