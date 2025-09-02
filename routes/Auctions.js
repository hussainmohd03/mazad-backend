const controller = require("../controllers/Auctions");
const router = require("express").Router();
const middleware = require("../middleware");

router.get(
  "/me/user",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getUsersBiddings
);

router.post(
  "",
  middleware.stripToken,
  middleware.verifyToken,
  controller.createAuction
);

router.get(
  "/me",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getSellerAuctions
);
router.post(
  "/autobid",
  middleware.stripToken,
  middleware.verifyToken,
  controller.createAutoBidding
);

router.get(
  "/category",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAuctionByCategory
);
router.get(
  "/categories",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getCategoryCount
);

router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAuction
);

router.get(
  "",
  middleware.stripToken,
  middleware.verifyToken,
  controller.listAuctions
);

router.post(
  "/:id/bids",
  middleware.stripToken,
  middleware.verifyToken,
  controller.placeBidding
);

router.get(
  "/me/purchases",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getUserPurchases
);

module.exports = router;
