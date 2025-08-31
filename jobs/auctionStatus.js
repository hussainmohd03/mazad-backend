const auction = require('../models/auction')
const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')
const User = require('../models/user')
const Watchlist = require('../models/Watchlist')

const nowUTC = () => new Date()

const checkAuctions = async () => {
  let newNotfication = ''
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
    console.log(auction)
    const watchlist = await Watchlist.find({ auctionId: auction._id }).populate(
      ['userId', 'auctionId']
    )

    for (let i = 0; i < watchlist.length; i++) {
      newNotfication = await User.findByIdAndUpdate(
        watchlist[i].userId,
        {
          $push: {
            notifications: {
              message: `${watchlist.auctionId.name} has been sold.`
            }
          }
        },
        { new: true }
      )
      newNotfication =
        newNotfication.notifications[newNotfication.notifications.length - 1]
          .message
      global.io.to(watchlist[i].userId).emit('removedItem', newNotfication)
      console.log('from job', newNotfication)
    }

    //TODO 4:  get highest bid and set winningBidID,
    const highest_bid = await Bidding.findOne({ auctionId: auction._id }).sort({
      amount: -1
    })

    // TODO 6:  user Balance
    if (highest_bid) {
      const highest_bidder = await User.findById(highest_bid.userId)
      console.log(highest_bidder)
      console.log(highest_bid.userId)
      // TODO 6.1: check user balance
      if (highest_bidder.balance >= auction.currentPrice) {
        // TODO 6.2 : if sufficient reduce balance
        highest_bidder.balance -= auction.currentPrice
      }
      // TODO 7: Trigger transaction
      auction.winningBid = highest_bid._id
      await auction.save()
      await highest_bidder.save()
      await Transaction.create({
        sellerId: auction.ownerId,
        buyerId: highest_bid.userId,
        price: highest_bid.amount,
        itemId: auction.itemId,
        date: nowUTC()
      })
    }
  }
  // TODO 5: emit only ongoing auctions
  const ongoingAuctions = await Auction.find({ status: 'ongoing' }).populate(
    'itemId'
  )

  global.io.emit('updateAuctions', { ongoing: ongoingAuctions })
}

module.exports = checkAuctions
