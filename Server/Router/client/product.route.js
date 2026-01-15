const express = require("express")
const Router = express.Router()
const productController = require("../../Controller/client/product.controller")


Router.get("/", productController.getAllProducts);
Router.get("/status", productController.findStatus);
Router.get("/search", productController.findProduct);
Router.get("/suggest", productController.suggestProduct);
Router.get("/:id", productController.getProductsByID);


module.exports = Router



