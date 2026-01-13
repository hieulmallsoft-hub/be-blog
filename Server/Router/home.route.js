const express = require("express")
const Router = express.Router()
const homeController = require("../Controller/home.controller")




Router.get("/", homeController.homegetAllProducts)




module.exports = Router