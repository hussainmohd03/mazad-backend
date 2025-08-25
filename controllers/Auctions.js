const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')

const nowUTC = () => new Date()

// create auction logic
exports.createAuction = async (req, res) => {
  try {
    const { itemId, startDate, endDate, initialPrice } = req.body
    if (!itemId || !startDate || !endDate || !initialPrice) {
      return res.status(400).send({ status: 'error', msg: 'missing fields' })
    }

    //TODO 1: when item & user controllers are ready, check if item exists, is approved and user is the owner

    //TODO 2: check for duplicate auctions for the same itemId

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
      ownerId: '1', //TODO 5: replace with res.locals.payload.id
      startDate: sd,
      endDate: ed,
      status,
      initialPrice,
      currentPrice: initialPrice,
      winningBid: null
    })
    return res.status(201).send(auction)
  } catch (error) {
    throw error
  }
}
