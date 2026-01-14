const Product = require("../../Model/product.model")


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        const newProducts = saleProduct(products)
        res.json(newProducts)
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server" })
    }
}

const getProductsByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" })
        }
        const productObject = product.toObject ? product.toObject() : product;
        productObject.priceNew = (productObject.price * (100 - (productObject.discountPercentage || 0)) / 100).toFixed(0);
        res.json(productObject)
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server" })
    }
}

const findStatus = async (req, res) => {
    try {
        const status = req.query.status
        const products = await Product.find({ status: status, deleted: false })
        const newProducts = saleProduct(products)
        res.json(newProducts)
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server" })
    }
}

const saleProduct = (products) => {
    return products.map((item) => {
        const productObject = item.toObject ? item.toObject() : item;
        productObject.priceNew = (productObject.price * (100 - (productObject.discountPercentage || 0)) / 100).toFixed(0);
        return productObject;
    })
}


module.exports = {
    getAllProducts,
    getProductsByID,
    findStatus,
    saleProduct
}
