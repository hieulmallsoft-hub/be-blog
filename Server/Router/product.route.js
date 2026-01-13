const express = require("express")
const Router = express.Router()
const productController = require("../Controller/product.controller")




Router.get("/", productController.getAllProducts)
Router.get("/:id", productController.getProductsByID)
Router.post("/", productController.addProduct)
Router.patch("/:id", productController.updateProduct)
Router.delete("/:id", productController.deleteProduct)



module.exports = Router



