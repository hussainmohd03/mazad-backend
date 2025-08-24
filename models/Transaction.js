const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    price: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema)
