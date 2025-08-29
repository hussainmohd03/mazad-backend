const controller = require('../controllers/AdminPage')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.put(
  '/items/:id/updateItem',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.updateItemStatus
)

router.get(
  '/items',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.ListAllItems
)

router.get(
  '',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.getAllAdmins
)

router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.deleteAdmin
)

router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.updateAdminProfile
)
module.exports = router
