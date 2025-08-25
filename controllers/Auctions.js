const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const Transaction = require('../models/Transaction')

// create auction logic
exports.createAuction = async (req, res) => {
  try {
    const { itemId, startDate, endDate, initialPrice } = req.body
    if (!itemId || !startDate || !endDate || !initialPrice) {
      return res.status(400).send({ status: 'error', msg: 'missing fields' })
    }
    const sd = new Date(startDate)
    const ed = new Date(endDate)
    if (sd >= ed)
      return res
        .status(400)
        .send({ status: 'error', msg: 'startDate must be < endDate' })

    // determine status
    const status = sd > new Date() ? 'upcoming' : 'ongoing'

    const auction = await Auction.create({
      itemId,
      ownerId: '1', // replace with res.locals.payload.id
      startDate: sd,
      endDate: ed,
      status,
      initialPrice,
      currentPrice: initialPrice
    })
    return res.status(201).send(auction)
  } catch (error) {
    throw error
  }
}
