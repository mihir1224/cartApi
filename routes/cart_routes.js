const router = require("express").Router();
const cartController = require("../controllers/cart_controller");

router.post("/", cartController.createCart);
router.get("/", cartController.ShowCart);
router.get("/:cartId", cartController.showSingleCart);
router.put("/:cartId", cartController.updateCart);
router.delete("/:cartId", cartController.deleteCart);

module.exports = router;
