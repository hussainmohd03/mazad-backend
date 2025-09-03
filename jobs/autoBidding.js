const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')
const Autobidding = require('../models/Autobidding')
const User = require('../models/user')

const nowUTC = () => new Date()

const makeAutoBidding = async () => {
  const auctions = await Auction.find({ status: 'ongoing' })
  for (let i = 0; i < auctions.length; i++) {
    const highestBidder = await Bidding.find({ auctionId: auctions[i] }).sort({
      createdAt: -1
    })
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

            newNotfication =
              newNotfication.notifications[
                newNotfication.notifications.length - 1
              ].message


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
    
    console.log('reached end of loop')
  }
}

module.exports = makeAutoBidding
// const placeAutoBidding = async () => {
//   // getting all autobiddings from the table
//   const autobiddings = await Autobidding.find()
//   console.log('autobiddings', autobiddings)
//   let bidding = '',
//     amount = 0,
//     max = 0,
//     increment_amount = 0,
//     user = '',
//     userDetails = 0,
//     auction = ''
//   for (let i = 0; i < autobiddings.length; i++) {
//     console.log('entered for loop')
//     bidding = await Bidding.find({ auctionId: autobiddings[i].auctionId }).sort(
//       { amount: -1 }
//     )
//     amount = bidding[0].amount
//     max = autobiddings[i].max_bid_amount
//     increment_amount = autobiddings[i].increment_amount
//     user = bidding[0].userId
//     userDetails = await User.findById(user)
//     auction = await Auction.findById(bidding[0].auctionId)
//     if (auction.status === 'ongoing') {
//       if (
//         userDetails.balance >
//         userDetails.lockedAmount + amount + increment_amount
//       ) {
//         const sd = new Date(auction.startDate)
//         const ed = new Date(auction.endDate)
//         if (sd <= nowUTC() < ed) {
//           const newBidding = await Bidding.create({
//             auctionId: autobiddings[i].auctionId,
//             userId: user,
//             amount: amount + increment_amount
//           })
//         }
//       }
//     }
//   }
// }

// module.exports = placeAutoBidding

// if auto-bidding is checked enable websocket
// listen for biddings placed on the same auction
// when another bidding is placed check if amount is greater than maximum bid + increment
// if amount is less than maximum bid plus increment
//  check if remaining balance is greater than maximum bid plus increment
// check if time is not over
// place bid at past maximum bit plus increment
// repeat

// const checkAutoBidding = async (auctId, id, amount, step) => {
//   console.log('enters function')
//   let currentPrice = parseInt(amount)
//   let highestBidder = id
//   let nextBidder = ''
//   let nextBid = 0

//   while (true) {
//     console.log('loop')
//     const autoBidders = await Autobidding.find({
//       auctionId: auctId,
//       userId: { $ne: highestBidder },
//       max_bid_amount: { $gte: currentPrice + step }
//     }).sort({ max_bid_amount: -1 })
//     console.log(autoBidders)

//     if (autoBidders.length === 0) {
//       break
//     }

//     nextBidder = autoBidders[0]
//     nextBid = Math.min(
//       autoBidders[0].max_bid_amount,
//       currentPrice + autoBidders[0].increment_amount
//     )

//     // will add to lockedAmount the bid that was placed rn

//     const newBid = await Bidding.create({
//       auctionId: auctId,
//       userId: autoBidders[0].userId,
//       amount: nextBid
//     })

//     currentPrice = nextBid
//     highestBidder = autoBidders[0].userId
//     console.log('next bid placed', newBid)
//   }
// }
