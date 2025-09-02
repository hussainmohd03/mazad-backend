const controller = require('./WatchList')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.put(
  '/me/add/:auctionId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.addToWatchList
)

router.put(
  '/me/remove/:auctionId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.removeFromWatchList
)

router.get(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getWatchList
)

module.exports = router
