const WatchList = require('../models/Watchist')

const addToWatchList = async (req, res) => {
  try {
    console.log('something')
    const addedWatchList = await WatchList.create({
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
