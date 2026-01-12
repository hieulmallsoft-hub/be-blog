const Product = require("../models/product.model");

const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.render("product", { products })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.send("Sản phẩm không tồn tại");
        }
        return res.render("detail", { product })
    } catch (error) {
        res.status(500).json({ message: "ID không hợp lệ hoặc lỗi server" });
    }
}

module.exports = {
    getProduct,
    getProductById
}