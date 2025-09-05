const controller = require('../controllers/Watchlist')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.post(
  '/me/:auctionId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.addToWatchList
)

router.delete(
  '/me/:auctionId',
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
