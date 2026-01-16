const express = require("express");
const router = express.Router();

const dashboardController = require("../../Controller/admin/dasboard.controller");
const productController = require("../../Controller/admin/product.controller");
const clientProductController = require("../../Controller/client/product.controller");

const { jwtAdmin } = require("../../Middleware/jwtAuth"); // ✅ FIX

router.get("/dashboard", dashboardController.Home);

router.get("/products/pagitation", clientProductController.Pagitation);
router.get("/products", productController.getAllProduct);
router.get("/products/:id", productController.getProductByID);

// ✅ chỉ admin mới được thao tác
router.post("/products", jwtAdmin, productController.addProduct);
router.delete("/products/:id", jwtAdmin, productController.deleteProduct);
router.put("/products/:id", jwtAdmin, productController.updateProduct);

module.exports = router;
