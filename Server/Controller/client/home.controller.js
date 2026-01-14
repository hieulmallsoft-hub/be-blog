const Product = require("../../Model/product.model")

const homegetAllProducts = async (req, res) => {
    try {
        res.render("home/index", {
            pageTitle: "Trang chủ"
        })
    } catch (error) {
        res.status(500).send("Lỗi Server")
    }
}

module.exports = {
    homegetAllProducts
}
