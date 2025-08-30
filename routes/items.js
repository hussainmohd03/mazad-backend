const controller = require('../controllers/Items')
const router = require('express').Router()
const middleware = require('../middleware/index')
const upload = require('../middleware/imagesUpload')
router.post(
  '',
  middleware.stripToken,
  middleware.verifyToken,
  upload.array('images', 4),
  controller.createItem
)

router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getItemDetails
)

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

router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateItem
)

module.exports = router
