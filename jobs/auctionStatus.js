const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')
const User = require('../models/user')
const nowUTC = () => new Date()

const checkAuctions = async () => {
  // //TODO 1: Get all upcoming auctions with startData <= now and change their status to ongoing
  // const upcoming = await Auction.find({
  //   status: 'upcoming',
  //   startDate: { $lte: nowUTC() }
  // })
  // for (let auction of upcoming) {
  //   auction.status = 'ongoing'
  //   await auction.save()
  // }
  // //TODO 3: get all ongoing auctions with endDate <= now and change their status to closed,
  // const expired = await Auction.find({
  //   status: 'ongoing',
  //   endDate: { $lte: nowUTC() }
  // })
  // for (let auction of expired) {
  //   auction.status = 'closed'
  //   //TODO 4:  get highest bid and set winningBidID,
  //   const highest_bid = await Bidding.findOne({ auctionId: auction._id }).sort({
  //     amount: -1
  //   })
  //   // TODO 6:  user Balance
  //   if (highest_bid.length !== 0) {
  //     const highest_bidder = await User.findById(highest_bid.userId)
  //     console.log(highest_bidder)
  //     console.log(highest_bid.userId)
  //     // TODO 6.1: check user balance
  //     if (highest_bidder.balance >= auction.currentPrice) {
  //       // TODO 6.2 : if sufficient reduce balance
  //       highest_bidder.balance -= auction.currentPrice
  //     }
  //     // TODO 7: Trigger transaction
  //     auction.winningBid = highest_bid._id
  //     await auction.save()
  //     await highest_bidder.save()
  //     await Transaction.create({
  //       sellerId: auction.ownerId,
  //       buyerId: highest_bid.userId,
  //       price: highest_bid.amount,
  //       itemId: auction.itemId,
  //       date: nowUTC()
  //     })
  //   }
  // }
}

module.exports = checkAuctions
