const controller = require('../controllers/Items')
const router = require('express').Router()

router.post("/",controller.createItem)
router.get("/:id",controller.getItemDetails)
router.delete("/:id",controller.deleteItem)
router.get("/",controller.getSellerItems)
module.exports = router
