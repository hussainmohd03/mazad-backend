const controller = require('../controllers/Items')
const router = require('express').Router()

router.post("/",controller.createItem)

module.exports = router
