const controller = require('../controllers/AdminPage')
const router = require('express').Router()

router.put('/items/:id/approve', controller.approvedItem)
router.put('/items/:id/reject', controller.rejectedItem)
router.get('/items', controller.getingAllItems)

module.exports = router
