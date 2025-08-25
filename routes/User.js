const controller = require('../controllers/User')
const router = require('express').Router()

router.put("/me/watchlist/:auctionId", controller.addToWatchList)
router.delete("/me/watchlist/:auctionId",controller.removeFromWatchList)
router.get("/me/watchlist",controller.getWatchList)
module.exports = router