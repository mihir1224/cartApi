const router = require("express").Router();
const productController = require("../controllers/product_controller");

router.post("/", productController.createProduct);
router.get("/", productController.showAllProduct);
router.get("/:productId", productController.showSingleProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
