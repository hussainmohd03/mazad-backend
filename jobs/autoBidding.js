const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')
const User = require('../models/user')
const Autobidding = require('../models/Autobidding')
const nowUTC = () => new Date()

const makeAutoBidding = async () => {
  const auctions = await Auction.find({ status: 'ongoing' })
  for (let i = 0; i < auctions.length; i++) {
    const highestBidder = await Bidding.find({ auctionId: auctions[i] }).sort({
      createdAt: -1
    })
    if (highestBidder.length !== 0) {
      const autoBidders = await Autobidding.find({
        auctionId: auctions[i]._id,
        userId: { $ne: highestBidder[0].userId },
        max_bid_amount: {
          $gte: highestBidder[0].amount + 20
        }
      }).sort({ max_bid_amount: -1 })

      if (autoBidders.length !== 0) {
        const nextBid = Math.min(
          autoBidders[0].max_bid_amount,
          highestBidder[0].amount + autoBidders[0].increment_amount
        )
        const user = await User.findById(autoBidders[0].userId)
        if (
          highestBidder.length !== 0 &&
          highestBidder[0].userId !== autoBidders[0].userId
        ) {
          // console.log(highestBidder[0].userId.toString())
          // console.log('highest bidder', highestBidder[0])
          const previousBidder = await User.findById(
            highestBidder[0].userId.toString()
          )
          console.log('previous bidder', previousBidder)
          console.log('id of previous bidder', previousBidder._id)
          if (previousBidder) {
            console.log('inside second if ', previousBidder)
            previousBidder.lockedAmount -= highestBidder[0].amount
            await previousBidder.save()
            let newNotfication = await User.findByIdAndUpdate(
              previousBidder._id,
              {
                $push: {
                  notifications: {
                    message: `You've been outbid on auction #${auctions[i]._id}.`
                  }
                }
              },
              { new: true }
            )
            console.log('previous bidder id', previousBidder._id)
            console.log('response from notifi', newNotfication)
            newNotfication =
              newNotfication.notifications[
                newNotfication.notifications.length - 1
              ].message

            console.log(previousBidder)
            global.io
              .to(previousBidder._id.toString())
              .emit('notify', newNotfication)
          }
        }
        if (auctions[i].status === 'ongoing') {
          if (
            user.balance >
            user.lockedAmount +
              highestBidder[0].amount +
              autoBidders[0].increment_amount
          ) {
            const sd = new Date(auctions[i].startDate)
            const ed = new Date(auctions[i].endDate)
            if (sd <= nowUTC() < ed) {
              const newBidding = await Bidding.create({
                auctionId: auctions[i],
                userId: autoBidders[0].userId,
                amount: highestBidder[0].amount + 20
              })

              const updatedAuction = await Auction.findByIdAndUpdate(
                auctions[i],
                {
                  currentPrice: newBidding.amount
                }
              )
              const newBidCount = await Bidding.countDocuments(auctions[i])

              global.io.to(auctions[i]).emit('newBid', {
                auctionId: auctions[i],
                bid: newBidding,
                currentPrice: updatedAuction.currentPrice,
                bidCount: newBidCount
              })

              console.log('new bidding', newBidding)
              let newNotfication = await User.findByIdAndUpdate(
                newBidding.userId,
                {
                  $push: {
                    notifications: {
                      message: `Autobidding placed on auction #${auctions[i]._id}  @ BHD${newBidding.amount}.`
                    }
                  }
                },
                { new: true }
              )
              newNotfication =
                newNotfication.notifications[
                  newNotfication.notifications.length - 1
                ].message
              global.io
                .to(newBidding.userId.toString())
                .emit('notify', newNotfication)
            }
          }
        }
        user.lockedAmount += nextBid
        await user.save()
      }
    }
    console.log('reached end of loop')
  }
}

module.exports = makeAutoBidding
