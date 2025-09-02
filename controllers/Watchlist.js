const watchList = require('../models/Watchlist')
const Item = require('../models/Item')

// get approved items

const addToWatchList = async (req, res) => {
  try {
    const addedWatchList = await watchList.create({
      auctionId: req.params.auctionId,
      userId: res.locals.payload.id
    })
    res.status(200).send({ addedWatchList })
  } catch (error) {
    throw error
  }
}

const removeFromWatchList = async (req, res) => {
  try {
    const removedItem = await watchList.findOneAndDelete({
      auctionId: req.params.auctionId,
      userId: res.locals.payload.id
    })

    res.status(200).send({ removedItem })
  } catch (error) {
    throw error
  }
}

const getWatchList = async (req, res) => {
  try {
    const usersWatchList = await watchList
      .find({
        userId: res.locals.payload.id
      })
      .populate('auctionId')
      .lean()
    for (const watchItem of usersWatchList) {
      console.log(watchItem)
      const item = await Item.findById(watchItem.auctionId.itemId.toString())
      watchItem.itemDetails = item
      console.log(watchItem)
    }
    res.status(200).send(usersWatchList)
  } catch (error) {
    throw error
  }
}

module.exports = {
  addToWatchList,
  removeFromWatchList,
  getWatchList
}
