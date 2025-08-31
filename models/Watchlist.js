const mongoose = require('mongoose')

const watchlistSchema = new mongoose.Schema(
  {
    watchersId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('watchlist', watchlistSchema)
