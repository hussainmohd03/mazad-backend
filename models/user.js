const mongoose = require('mongoose')
const Auction = require('./auction')

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHash: { type: String, required: true },
    avatar: { type: String, default: '' },
    type: {
      type: String,
      enum: ['user', 'admin', 'owner'],
      default: 'user'
    },
    balance: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
