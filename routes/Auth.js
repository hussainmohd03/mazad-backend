const controller = require('../controllers/Auth')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.post('/register', controller.Register)
router.post('/login', controller.Login)

router.post(
  '/admin/login',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.loginAsAdmin
)
router.post(
  '/admin/users',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.listAllUsers
)
router.post(
  '/admin/signup',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.addAdminAccount
)
module.exports = router
