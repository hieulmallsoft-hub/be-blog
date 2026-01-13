const Product = require("../Model/product.model")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.render("products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: products
        })
    } catch (error) {
        res.status(500).send("Lỗi Server")
    }
}

const getProductsByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render("products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        })
    } catch (error) {
        res.status(500).send("Không tìm thấy sản phẩm")
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.redirect("/products")
    } catch (error) {
        res.status(500).send("Lỗi Server")
    }
}


const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await Product.findByIdAndDelete(id)
        res.redirect("/products")
    } catch (error) {
        res.status(500).send("Lỗi không tìm thấy sản phẩm để xóa")
    }
}

const editProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render("products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        })
    } catch (error) {
        res.status(500).send("Lỗi Server")
    }
}

const updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/products")
    } catch (error) {
        res.status(500).send("Lỗi không thể cập nhật sản phẩm")
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

