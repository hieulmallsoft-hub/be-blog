const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: "String",
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: Number,
        price: Number
    }],

    totalAmount: Number,
    customerName: String,
    Address: String,
    Phone: String,
    createdAt: Date,
    deleted: Boolean

})

const Order = mongoose.model("Order", OrderSchema, "Order")

module.exports = Order
