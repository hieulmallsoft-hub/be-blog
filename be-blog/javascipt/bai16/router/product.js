const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller")
router.get("/", (req, res) => {
    res.send("<h1 style='color: green;'> Trang chủ</h1>")
});

router.get("/contact", (req, res) => {
    res.send("<h1 style='color: blue;'> Trang liên hệ</h1>")
})

router.get("/about", (req, res) => {
    res.send("<h1 style='color: purple;'> Trang giới thiệu</h1>")
})


router.get("/product", controller.getProduct);
router.get("/product/:id", controller.getProductById);
module.exports = router