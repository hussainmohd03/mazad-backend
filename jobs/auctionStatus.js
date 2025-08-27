const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')
// const { io } = require('../server')

const nowUTC = () => new Date()

const checkAuctions = async () => {
  //TODO 1: Get all upcoming auctions with startData <= now and change their status to ongoing
  const upcoming = await Auction.find({
    status: 'upcoming',
    startDate: { $lte: nowUTC() }
  })

  for (let auction of upcoming) {
    auction.status = 'ongoing'
    await auction.save()
  }

  //TODO 3: get all ongoing auctions with endDate <= now and change their status to closed,
  const expired = await Auction.find({
    status: 'ongoing',
    endDate: { $lte: nowUTC() }
  })
  for (let auction of expired) {
    auction.status = 'closed'

    //TODO 4:  get highest bid and set winningBidID,
    const highest_bid = await Bidding.find().sort({ createdAt: -1 })
    await auction.save()

    // TODO 5: Trigger transaction
    if (highest_bid) {
      auction.winningBid = highest_bid._id
      await Transaction.create({
        sellerId: auction.ownerId,
        buyerId: highest_bid.userId,
        price: highest_bid.amount,
        itemId: auction.itemId,
        date: nowUTC()
      })
    }
  }
}

module.exports = checkAuctions
