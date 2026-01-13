const express = require("express")
const Router = express.Router()
const productController = require("../Controller/product.controller")




Router.get("/", productController.getAllProducts)
Router.get("/create", (req, res) => res.render("products/create", { pageTitle: "Thêm sản phẩm" }))
Router.get("/detail/:id", productController.getProductsByID)
Router.get("/edit/:id", productController.editProduct)
Router.post("/edit/:id", productController.updateProduct)
Router.post("/add", productController.addProduct)
Router.get("/delete/:id", productController.deleteProduct)



module.exports = Router



