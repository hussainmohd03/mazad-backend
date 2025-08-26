const controller = require('../controllers/Auctions')
const router = require('express').Router()
const middleware = require('../middleware')

router.post(
  '',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createAuction
)
router.get('/:id', controller.getAuction)

module.exports = router
