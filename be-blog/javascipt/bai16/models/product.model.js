const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    thumbnail: String
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "product");

module.exports = Product;
