const express = require("express")
const Router = express.Router()
const homeController = require("../../Controller/client/home.controller")




Router.get("/", homeController.homegetAllProducts)




module.exports = Router