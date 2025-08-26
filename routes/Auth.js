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
  controller.LoginAsAdmin
)

router.post(
  '/admin/signup',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.AddAdminAccount
)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.checkSession
)
module.exports = router
