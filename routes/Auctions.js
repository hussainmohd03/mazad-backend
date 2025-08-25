const controller = require('../controllers/Auctions')
const router = require('express').Router()

router.post('', controller.createAuction)

module.exports = router