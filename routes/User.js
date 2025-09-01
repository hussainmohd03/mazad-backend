const controller = require('../controllers/User')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.put(
  '/me/password',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updatePassword
)

router.put(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateProfile
)

router.get(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getMyProfileById
)
router.get(
  '/me/transactions',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getTransactions
)

router.delete(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteMyProfile
)

router.put(
  '/me/watchlist/:auctionId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.addToWatchList
)

router.put(
  '/me/watchlist/:auctionId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.removeFromWatchList
)

router.get(
  '/me/watchlist',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getWatchList
)

router.get('/allusers', controller.getAllUsers)

module.exports = router