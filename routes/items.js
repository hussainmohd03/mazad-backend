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
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteItem
)
router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getSellerItems
)
module.exports = router
