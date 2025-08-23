import mongoose from 'mongoose'

const CATEGORIES = [
  'heavy-machinery',
  'art',
  'pearls',
  'jewellery',
  'gold',
  'electronics',
  'industrial',
  'watches',
  'bags',
  'properties',
  'scrap',
  'boats',
  'machinery',
  'vehicles',
  'general-items',
  'court-properties',
  'car-plates'
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
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    sold: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
)

// exported for use in seeder & frontend
export const categories = CATEGORIES
export default mongoose.model('Item', itemSchema)
