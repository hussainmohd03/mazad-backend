const controller = require('../controllers/Items')
const router = require('express').Router()

router.post("/",controller.createItem)

router.get("/:id",controller.getItemDetails)

router.delete("/:id",controller.deleteItem)

module.exports = router
