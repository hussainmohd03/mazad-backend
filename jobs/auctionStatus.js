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
    //TODO 2: notify frontend
    global.io.to(auction._id.toString()).emit('auctionStatusChanged', {
      auctionId: auction._id,
      status: 'ongoing'
    })
    await auction.save()
  }

  //TODO 3: get all ongoing auctions with endDate <= now and change their status to closed, get highest bid and set winningBidID
  const expired = await Auction.find({
    status: 'ongoing',
    endDate: { $lte: nowUTC() }
  })
  for (let auction of expired) {
    auction.status = 'closed'
    //TODO 2: notify frontend
    global.io.to(auction._id.toString()).emit('auctionStatusChanged', {
      auctionId: auction._id,
      status: 'closed'
    })
    await auction.save()
  }

  // TODO 4: Trigger transaction

  //TODO 5: frontend
}

module.exports = checkAuctions
