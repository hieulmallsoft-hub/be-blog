require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT;
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../View/Client/pages'))
app.use(express.static(path.join(__dirname, "public")))

// Thêm middleware để đọc dữ liệu từ form (POST)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const db = require("./config/db")

const productRouter = require("./Router/product.route")
const homeRouter = require("./Router/home.route")





app.use("/", homeRouter)
app.use("/products", productRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


db()