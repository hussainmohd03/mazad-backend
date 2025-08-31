const controller = require("../controllers/WatchList");
const router = require("express").Router();
const middleware = require("../middleware/index");

router.put(
  "/me/:auctionId",
  middleware.stripToken,
  middleware.verifyToken,
  controller.addToWatchList
);

router.put(
  "/me/:auctionId",
  middleware.stripToken,
  middleware.verifyToken,
  controller.removeFromWatchList
);

router.get(
  "/me",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getWatchList
);

module.exports = router;
