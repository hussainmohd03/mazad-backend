const controller = require('../controllers/User')
const router = require('express').Router()

router.put("/me/watchlist/:auctionId", controller.addToWatchList)


module.exports = router