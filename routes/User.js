const controller = require('../controllers/User')
const router = require('express').Router()
const middleware = require('../middleware/index')

router.post(
  '/me/password',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updatePassword
)

router.post(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateProfile
)

router.get(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getMyProfileById
)

router.delete(
  '/me',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteMyProfile
)
module.exports = router
