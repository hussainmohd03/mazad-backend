const mongoose = require('mongoose')

const CATEGORIES = [
  'properties',
  'car-plates',
  'taxi-plates',
  'general items',
  'vehichles',
  'machinery',
  'industrial',
  'boats',
  'electronics',
  'furniture',
  'jewelry',
  'scrap-&-metal'
]
const auctionSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: { type: String, enum: CATEGORIES, required: true },
    startDate: { type: Date, required: true },
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
