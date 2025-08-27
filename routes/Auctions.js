const controller = require('../controllers/Auctions')
const router = require('express').Router()
const middleware = require('../middleware')

router.post(
  '',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createAuction
)

router.get(
  '/category',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAuctionByCategory
)
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAuction
)

router.get(
  '',
  middleware.stripToken,
  middleware.verifyToken,
  controller.listAuctions
)

router.get(
  '/my_bids/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getBiddingsByUser
)
router.post(
  '/:id/bids',
  middleware.stripToken,
  middleware.verifyToken,
  controller.placeBidding
)
module.exports = router
