const mongoose = require('mongoose')

const auctionSchema = new mongoose.Schema(
  {
    itemId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Item',
      type: String,
      required: true
    },
    ownerId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User',
      type: String,
      required: true
    },
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'closed'],
      default: 'upcoming'
    },
    initialPrice: { type: Number, required: true, min: 0 },
    currentPrice: { type: Number, required: true, min: 0 },
    winningBid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bid',
      default: null
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Auction', auctionSchema)
