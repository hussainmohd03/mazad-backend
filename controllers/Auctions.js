const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')
const Item = require('../models/Item')
const { io } = require('../server')

const nowUTC = () => new Date()

// create auction logic
exports.createAuction = async (req, res) => {
  try {
    const { itemId, startDate, endDate, initialPrice } = req.body
    if (!itemId || !startDate || !endDate || !initialPrice) {
      return res.status(400).send({ status: 'error', msg: 'missing fields' })
    }

    //TODO 1: when item & user controllers are ready, check if item exists, is approved and user is the owner
    const item = await Item.findById(itemId)
    if (item.ownerId != res.locals.payload.id) {
      return res.status(403).send({
        status: 'error',
        msg: "unauthorized, you don't own this item"
      })
    }
    if (item.status !== 'approved') {
      return res.status(403).send({
        status: 'error',
        msg: 'item must be approved first'
      })
    }
    //TODO 2: check for duplicate auctions for the same itemId
    const isAuctioned = await Auction.findOne({ _id: itemId })
    if (isAuctioned) {
      return res.status(409).send({
        status: 'error',
        msg: 'Auction with this itemId already exists'
      })
    }

    const sd = new Date(startDate)
    const ed = new Date(endDate)
    // TODO 3: check if endDate is in the past
    if (ed < nowUTC()) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'endtDate must not be in the past' })
      // TODO 4: check if startDate is in the past
    } else if (sd < nowUTC()) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'startDate must not be in the past' })
    } else if (sd >= ed) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'startDate must be < endDate' })
    }

    //determine status
    const status = sd > nowUTC() ? 'upcoming' : 'ongoing'

    const auction = await Auction.create({
      itemId,
      ownerId: res.locals.payload.id, //TODO 5: replace with res.locals.payload.id
      startDate: sd,
      endDate: ed,
      status,
      category: item.category,
      initialPrice,
      currentPrice: initialPrice,
      winningBid: null
    })

    // TODO 6: emit event if auction is created as ongoing

    return res.status(201).send(auction)
  } catch (error) {
    throw error
  }
}

exports.getAuction = async (req, res) => {
  try {
    const { id } = req.params

    const auction = await Auction.findById(id).populate('itemId')

    if (!auction)
      res.status(404).send({ status: 'error', msg: 'auction not found' })

    const bidCount = (await Bidding.find({ auctionId: id })).length

    const response = { auction: auction, bidCount: bidCount }

    res.status(200).send(response)
  } catch (error) {
    throw error
  }
}

exports.listAuctions = async (req, res) => {
  try {
    const { status, category } = req.query
    const q = {}
    if (status) q.status = status
    if (category) q.category = category

    const auctions = await Auction.find(q)
      .sort({ createdAt: -1 })
      .populate('itemId')

    return res.status(200).send(auctions)
  } catch (error) {
    throw error
  }
}

exports.getAuctionByCategory = async (req, res) => {
  try {
    const { name } = req.query
    const auctions = await Auction.find({ category: name })
      .sort({ createdAt: -1 })
      .populate('itemId')

    res.status(200).send(auctions)
  } catch (error) {
    res.send('eahga')
  }
}

exports.placeBidding = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const auctionId = req.params.id
    const { amount } = req.body
    const step = 20
    if (!amount) {
      return res.send('invalid amount')
    } else {
      const auction = await Auction.findById(auctionId)
      if (!auction) {
        return res.status(400).send('not found')
      } else {
        if (auction.status === 'ongoing') {
          const sd = new Date(auction.startDate)
          const ed = new Date(auction.endDate)
          if (sd <= nowUTC() < ed) {
            if (amount > auction.currentPrice + step) {
              const newBid = await Bidding.create({
                auctionId: auctionId,
                userId: id,
                amount: amount
              })
              const updatedAuction = await Auction.findByIdAndUpdate(
                auctionId,
                {
                  currentPrice: amount
                },
                { new: true }
              )
              // TODO 1: emit new bid
              io.to(auctionId).emit('newBid', {
                auctionId,
                bid: newBid,
                currentPrice: updatedAuction.currentPrice
              })

              // TODO 2: check if auction should be closed, if yes change state and emit change
              if (auction.status === 'ongoing' && auction.endDate <= nowUTC()) {
                auction.status = 'closed'
                io.to(auction._id.toString()).emit('auctionStatusChanged', {
                  auctionId: auction._id,
                  status: 'closed'
                })
              }

              return res.status(201).send({
                msg: 'new bid created',
                newBid: newBid,
                updatedAuction: updatedAuction
              })
            }
            return res.status(404).send({ msg: 'amount invalid' })
          }
        }
      }
    }
  } catch (error) {
    throw error
  }
}
