const Product = require("../../Model/product.model");

const calcPriceNew = (p) => {
    const price = Number(p.price || 0);
    const discount = Number(p.discountPercentage || 0);
    return Math.round((price * (100 - discount)) / 100);
};

const attachPriceNew = (doc) => {
    if (!doc) return doc;
    const obj = doc.toObject ? doc.toObject() : doc;
    obj.priceNew = calcPriceNew(obj);
    return obj;
};

const attachPriceNewList = (docs) => docs.map(attachPriceNew);

// GET /products
const getAllProducts = async (req, res) => {
    try {
        const filter = { deleted: false };
        const products = await Product.find(filter).lean();
        return res.json(attachPriceNewList(products));
    } catch (error) {
        console.error("getAllProducts:", error);
        return res.status(500).json({ message: "Lỗi Server" });
    }

};

// GET /products/:id
const getProductsByID = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, deleted: false }).lean();
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        return res.json(attachPriceNew(product));
    } catch (error) {
        console.error("getProductsByID:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }
        return res.status(500).json({ message: "Lỗi Server" });
    }
};

// GET /products/status?status=active
const findStatus = async (req, res) => {
    try {
        const status = req.query.status;
        const filter = { deleted: false };
        if (status) filter.status = status;

        const products = await Product.find(filter).lean();
        return res.json(attachPriceNewList(products));
    } catch (error) {
        console.error("findStatus:", error);
        return res.status(500).json({ message: "Lỗi Server" });
    }
};


const findProduct = async (req, res) => {
    try {
        const q = (req.query.q || "").trim(); // dùng q cho dễ
        const filter = { deleted: false };

        if (q) {
            filter.title = { $regex: q, $options: "i" }; // tìm gần đúng, không phân biệt hoa thường
        }

        const products = await Product.find(filter).lean();
        return res.json(attachPriceNewList(products));
    } catch (error) {
        console.error("findProduct:", error);
        return res.status(500).json({ message: "Lỗi Server" });
    }
};

const suggestProduct = async (req, res) => {
    try {
        const q = (req.query.q || "").trim(); // dùng q cho dễ
        const filter = { deleted: false };

        if (q) {
            filter.title = { $regex: q, $options: "i" }; // tìm gần đúng, không phân biệt hoa thường
        }

        const products = await Product.find(filter).lean();
        return res.json(attachPriceNewList(products));
    } catch (error) {
        console.error("suggestProduct:", error);
        return res.status(500).json({ message: "Lỗi Server" });
    }
};


const Pagitation = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page || "1", 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || "6", 10), 1), 60);
        const skip = (page - 1) * limit;

        const filter = { deleted: false };

        const total = await Product.countDocuments(filter);
        const totalPages = Math.max(1, Math.ceil(total / limit));

        const products = await Product.find(filter)
            .sort({ position: 1, _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        return res.json({
            data: attachPriceNewList(products), // hoặc products
            page,
            limit,
            total,
            totalPages
        });
    } catch (error) {
        console.error("Pagitation:", error);
        return res.status(500).json({ message: "Lỗi Server" });
    }
};


module.exports = {
    getAllProducts,
    getProductsByID,
    findStatus,
    findProduct,
    suggestProduct,
    Pagitation
};
