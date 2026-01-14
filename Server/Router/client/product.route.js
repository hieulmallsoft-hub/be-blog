const express = require("express")
const Router = express.Router()
const productController = require("../../Controller/client/product.controller")




Router.get("/", productController.getAllProducts)
Router.get("/:id", productController.getProductsByID)
Router.get("/status", productController.findStatus)



module.exports = Router



