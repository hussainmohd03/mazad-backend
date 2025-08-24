const controller = require('../controllers/AdminPage')
const router = require('express').Router()

router.put('/items/:id/approve', controller.approveItem)
router.put('/items/:id/reject', controller.rejectItem)
router.get('/items', controller.getingAllItems)

module.exports = router
