const controller = require('../controllers/Auth')
const router = require('express').Router()

router.post('/register', controller.Register)

module.exports = router
