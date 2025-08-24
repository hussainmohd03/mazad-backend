const Items = require('../models/Item')

const approvedItem = async (req, res) => {
  try {
    const aprovedItems = await Items.find({})
  } catch (error) {
    throw error
  }
}

const rejectedItem = async (req, res) => {
  try {
    const rejectedItem = await Items.find({})
  } catch (error) {
    throw error
  }
}

// const AddingOrder = async (req, res) => {
//   try {
//     const order = await Order.create(req.body)
//     res.status(200).send(order)
//   } catch (error) {
//     throw error
//   }
// } // tested

// const GettingAllOrder = async (req, res) => {
//   try {
//     const allOrder = await Order.find()
//     res.status(200).send(allOrder)
//   } catch (error) {
//     throw error
//   }
// } // tested

// const GettingOneOrder = async (req, res) => {
//   try {
//     const oneOrder = await Order.findById(req.params.id)
//     res.status(200).send(oneOrder)
//   } catch (error) {
//     throw error
//   }
// } // tested

// const UpdateOrder = async (req, res) => {
//   try {
//     const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
//       new: true
//     })
//     res.status(200).send(updateOrder)
//   } catch (error) {
//     throw error
//   }
// } // tested

// const DeletingOrder = async (req, res) => {
//   try {
//     const deleteOrder = await Order.findByIdAndDelete(req.params.id)
//     res.send(200)
//   } catch (error) {
//     throw error
//   }
// } // tested

// module.exports = {
//   AddingOrder,
//   GettingAllOrder,
//   GettingOneOrder,
//   UpdateOrder,
//   DeletingOrder
// }
