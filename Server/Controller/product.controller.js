const Product = require("../Model/product.model")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
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
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server" })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server" })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" })
        }
        res.json({ message: "Xóa sản phẩm thành công" })
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm" })
    }
}

const editProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật" })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể cập nhật sản phẩm" })
    }
}

module.exports = {
    getAllProducts,
    getProductsByID,
    addProduct,
    deleteProduct,
    editProduct,
    updateProduct
}

