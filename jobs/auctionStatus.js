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
    // TODO 2.1: remove the hardcoded ids
    global.io.to('64f3a2c3d4e5f67890123444').emit('auctionStatusChanged', {
      auctionId: '64f3a2c3d4e5f67890123444',
      status: 'ongoing'
    })
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

    //TODO 7: frontend
    await auction.save()

    global.io.to(auction._id.toString()).emit('auctionStatusChanged', {
      auctionId: auction._id,
      status: 'closed'
    })
  }
}

module.exports = checkAuctions
