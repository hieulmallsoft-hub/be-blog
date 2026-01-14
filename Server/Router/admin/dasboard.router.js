const express = require("express")
const router = express.Router()
const dashboardController = require("../../Controller/admin/dasboard.controller")
const productController = require("../../Controller/admin/product.controller")

router.get("/dashboard", dashboardController.Home)
router.get("/products", productController.getAllProduct)
router.get("/products/:id", productController.getProductByID)
router.post("/products", productController.addProduct)
router.delete("/products/:id", productController.deleteProduct)
router.put("/products/:id", productController.updateProduct)


module.exports = router

