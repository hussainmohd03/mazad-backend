const controller = require('../controllers/AdminPage')
const router = require('express').Router()

router.put('/items/:id/approve', controller.approveItem)
router.put('/items/:id/reject', controller.rejectItem)
router.put('/items/:id/pending', controller.pendingItem)
router.get('/items', controller.getingAllItems)

module.exports = router
