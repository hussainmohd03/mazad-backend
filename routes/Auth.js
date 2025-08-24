const controller = require('../controllers/Auth')
const router = require('express').Router()

router.post('/register', controller.Register)
router.post('/login', controller.Login)

module.exports = router
