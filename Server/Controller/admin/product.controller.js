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

// GET /admin/products?status=active
const getAllProduct = async (req, res) => {
    try {
        const filter = { deleted: false };
        if (req.query.status) filter.status = req.query.status;

        const products = await Product.find(filter).lean();
        return res.json(attachPriceNewList(products));
    } catch (error) {
        console.error("getAllProduct:", error);
        return res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

// GET /admin/products/:id
const getProductByID = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, deleted: false }).lean();
        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
        }
        return res.json(attachPriceNew(product));
    } catch (error) {
        console.error("getProductByID:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }
        return res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

// POST /admin/products
const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({ success: true, data: attachPriceNew(product) });
    } catch (error) {
        console.error("addProduct:", error);
        return res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

// DELETE /admin/products/:id  (soft delete cho khớp deleted:false)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            { deleted: true },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để xóa" });
        }
        return res.json({ success: true, message: "Xóa sản phẩm thành công" });
    } catch (error) {
        console.error("deleteProduct:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }
        return res.status(500).json({ success: false, message: "Lỗi khi xóa sản phẩm" });
    }
};

// PUT /admin/products/:id  (update nhiều field nhưng whitelist để an toàn)
const updateProduct = async (req, res) => {
    try {
        const allowedFields = [
            "title",
            "price",
            "discountPercentage",
            "status",
            "description",
            "thumbnail",
            "category"
        ];

        const data = {};
        for (const key of allowedFields) {
            if (req.body[key] !== undefined) data[key] = req.body[key];
        }

        // validate status nếu bạn dùng active/inactive
        if (data.status !== undefined) {
            const allowedStatus = ["active", "inactive"];
            if (!allowedStatus.includes(data.status)) {
                return res.status(400).json({ success: false, message: "Status không hợp lệ" });
            }
        }

        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            data,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để cập nhật" });
        }
        return res.json({ success: true, data: attachPriceNew(product) });
    } catch (error) {
        console.error("updateProduct:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }
        return res.status(500).json({ success: false, message: "Lỗi không thể cập nhật sản phẩm" });
    }
};

// (Optional) PATCH /admin/products/:id/status
const updateProductStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (status === undefined) {
            return res.status(400).json({ success: false, message: "Thiếu status" });
        }

        const allowedStatus = ["active", "inactive"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ success: false, message: "Status không hợp lệ" });
        }

        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            { status },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để cập nhật" });
        }
        return res.json({ success: true, data: attachPriceNew(product) });
    } catch (error) {
        console.error("updateProductStatus:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }
        return res.status(500).json({ success: false, message: "Lỗi không thể cập nhật sản phẩm" });
    }
};

module.exports = {
    getAllProduct,
    getProductByID,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStatus
};
