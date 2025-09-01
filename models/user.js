const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true }
  },
  { timestamps: true }
)

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
    // TODO 1: add lockedAmount
    lockedAmount: {
      type: Number,
      default: 0
    },
    // TODO 2: add lockUntil & failedLoginAttempts
    // TODO 3: address
    verified: { type: Boolean, default: false },
    // when auction status changes to closed send notifs
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' }],
    notifications: [notificationSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
