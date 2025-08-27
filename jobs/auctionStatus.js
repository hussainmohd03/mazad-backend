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
    S
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

    //TODO 5: notify frontend

    // TODO 6: Trigger transaction

    await auction.save()

  }
}

module.exports = checkAuctions
