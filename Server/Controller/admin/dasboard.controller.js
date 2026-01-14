const Product = require("../../Model/product.model");

const Home = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({ deleted: false });
        const activeProducts = await Product.countDocuments({ status: "active", deleted: false });
        const inactiveProducts = await Product.countDocuments({ status: "inactive", deleted: false });

        res.json({
            success: true,
            data: {
                totalProducts,
                activeProducts,
                inactiveProducts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}



module.exports = {
    Home
}   
