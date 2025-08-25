const controller = require('../controllers/AdminPage')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.put(
  '/items/:id/approve',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.approveItem
) // needed middleware
router.put(
  '/items/:id/reject',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.rejectItem
) // needed middleware
router.put(
  '/items/:id/pending',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.pendingItem
) // needed middleware
router.get(
  '/items',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.ListAllItems
)

module.exports = router
