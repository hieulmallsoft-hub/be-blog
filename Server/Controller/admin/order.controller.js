const mongoose = require("mongoose")
const Order = require("../../Model/Order.model")

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({ deleted: false }).lean()
        return res.json(orders)
    } catch (error) {
        console.error("getAllOrder:", error)
        return res.status(500).json({ success: false, message: "Lỗi Server" })
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).lean()
        return res.json(order)
    } catch (error) {
        console.error("getOrderById:", error)
        return res.status(500).json({ success: false, message: "Lỗi Server" })
    }
}

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean()
        return res.json(order)
    } catch (error) {
        console.error("updateOrder:", error)
        return res.status(500).json({ success: false, message: "Lỗi Server" })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true }).lean()
        return res.json(order)
    } catch (error) {
        console.error("deleteOrder:", error)
        return res.status(500).json({ success: false, message: "Lỗi Server" })
    }
}

const getOrderByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id, deleted: false }).lean()
        return res.json(orders)
    } catch (error) {
        console.error("getOrderByUserId:", error)
        return res.status(500).json({ success: false, message: "Lỗi Server" })
    }
}

const getOrderByStatus = async (req, res) => {
    try {
        const orders = await Order.find({ status: req.params.status, deleted: false }).lean()
        return res.json(orders)
    } catch (error) {
        console.error("getOrderByStatus:", error)
        return res.status(500).json({ success: false, message: "Lỗi Server" })
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderByUserId,
    getOrderByStatus
}