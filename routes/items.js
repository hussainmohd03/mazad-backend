const controller = require('../controllers/Items')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.post(
  '',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createItem
)
router.get('/:id', controller.getItemDetails)
router.delete('/:id', controller.deleteItem)
router.get('/', controller.getSellerItems)
module.exports = router
