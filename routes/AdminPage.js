const controller = require('../controllers/AdminPage')
const router = require('express').Router()

router.put('/items/:id/approve', controller.approveItem) // needed middleware
router.put('/items/:id/reject', controller.rejectItem) // needed middleware
router.put('/items/:id/pending', controller.pendingItem) // needed middleware
router.get('/items', controller.getingAllItems) // needed middleware

module.exports = router
