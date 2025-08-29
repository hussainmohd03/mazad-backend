const mongoose = require('mongoose')

const autobiddingSchema = new mongoose.Schema(
  {
    increment_amount: { type: Number, required: true },
    max_bid_amount: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
      required: true
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

module.exports = mongoose.model('Autobidding', autobiddingSchema)
