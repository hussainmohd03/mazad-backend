const controller = require("../controllers/User");
const router = require("express").Router();
const middleware = require("../middleware/index");

router.put(
  "/me/password",
  middleware.stripToken,
  middleware.verifyToken,
  controller.updatePassword
);

router.put(
  "/me",
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateProfile
);

router.get(
  "/me",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getMyProfileById
);

router.delete(
  "/me",
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteMyProfile
);

router.get(
  '/allusers',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.isAdmin,
  controller.getAllUsers
)


module.exports = router;
