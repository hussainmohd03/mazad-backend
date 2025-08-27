const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')
const { io } = require('../server')

const nowUTC = () => new Date()

const checkAuctions = async () => {
  //TODO 1: Get all upcoming auctions with startData <= now and change their status to ongoing
  await Auction.updateMany(
    { status: 'upcoming', startDate: { $lte: nowUTC() } },
    { $set: { status: 'ongoing' } }
  )

  //TODO 2: notify frontend

  //TODO 3: get all ongoing auctions with endDate <= now and change their status to closed, get highest bid and set winningBidID
  // const expired = await Auction.find({
  //   status: "active",
  //   endDate: { $lte: now }
  // });

  // TODO 4: Trigger transaction

  //TODO 5: frontend
}

module.exports = checkAuctions
