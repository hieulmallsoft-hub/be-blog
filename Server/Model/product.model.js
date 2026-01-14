const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    thumbnail: String,
    category: String,
    status: {
        type: String,
        default: "active"
    },
    stock: Number,
    discountPercentage: {
        type: Number,
        default: 0
    },
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model("Product", productSchema, "products")
