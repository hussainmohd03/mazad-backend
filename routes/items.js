const controller = require('../controllers/Items')
const router = require('express').Router()

router.put('/items/:id/approve')
router.put('/items/:id/reject')
router.get('/items')
router.get('')

module.exports = router
