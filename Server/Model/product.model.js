const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    thumbnail: String,
    category: String,
    status: String,
    stock: Number,
    discountPercentage: Number,
    position: Number,
    deleted: Boolean
})
module.exports = mongoose.model("Product", productSchema, "products")
