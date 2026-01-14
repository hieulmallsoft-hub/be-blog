const Product = require("../../Model/product.model");

const getAllProduct = async (req, res) => {
    try {
        const find = {
            deleted: false
        }
        if (req.query.status) {
            find.status = req.query.status
        }
        const products = await Product.find(find)
        const newProducts = saleProduct(products)
        res.json(newProducts)
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}


const getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id, {
            deleted: false
        })
        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
        }
        const productObject = product.toObject ? product.toObject() : product;
        productObject.priceNew = (productObject.price * (100 - (productObject.discountPercentage || 0)) / 100).toFixed(0);
        res.json(productObject)
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}
const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}



const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để xóa" });
        }
        res.json({ message: "Xóa sản phẩm thành công" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi xóa sản phẩm" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để cập nhật" });
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi không thể cập nhật sản phẩm" });
    }
}

const updateProductStatus = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để cập nhật" });
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi không thể cập nhật sản phẩm" });
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
    getAllProduct,
    getProductByID,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStatus
}