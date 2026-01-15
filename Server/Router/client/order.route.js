const express = require("express")
const router = express.Router()
const orderController = require("../../Controller/client/order.controller")

router.get("/", orderController.getAllOrder)
router.get("/:id", orderController.getOrderById)
router.post("/", orderController.createOrder)
router.put("/:id", orderController.updateOrder)
router.delete("/:id", orderController.deleteOrder)
router.get("/user/:id", orderController.getOrderByUserId)
router.get("/status/:status", orderController.getOrderByStatus)

module.exports = router