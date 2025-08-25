const controller = require('../controllers/User')
const router = require('express').Router()
const middleware = require('../middleware/index')




router.post(
  '/me/password',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updatePassword
)

router.post(
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

router.delete(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteMyProfile
)

router.put("/me/watchlist/:auctionId", 
  middleware.stripToken,
  middleware.verifyToken,
  controller.addToWatchList)

router.delete("/me/watchlist/:auctionId",
  middleware.stripToken,
  middleware.verifyToken,
  controller.removeFromWatchList)

router.get("/me/watchlist",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getWatchList)

module.exports = router
