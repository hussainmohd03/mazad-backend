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

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, enum: CATEGORIES, required: true },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'listed', 'rejected'],
      default: 'pending'
    },
    // TODO 1: add weight
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sold: { type: Boolean, default: false }
  },
  { timestamps: true }
)

// exported for use in seeder & frontend
// const Item = mongoose.model('Item', itemSchema)
// module.exports = { Item, CATEGORIES }
module.exports = mongoose.model('Item', itemSchema)
