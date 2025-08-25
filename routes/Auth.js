const controller = require('../controllers/Auth')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.post('/register', controller.Register)
router.post('/login', controller.Login)


module.exports = router
