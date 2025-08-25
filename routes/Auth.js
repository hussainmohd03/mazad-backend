const controller = require('../controllers/Auth')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.post('/register', controller.Register)
router.post('/login', controller.Login)

router.post('/admin/login', controller.loginAsAdmin)
router.post('/admin/users', controller.listAllUsers)
router.post('/admin/signup', controller.addAdminAccount)
module.exports = router
