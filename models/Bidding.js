// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const bidSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: { type: Number, required: true, min: 0 }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

export default mongoose.model('Bidding', bidSchema)
