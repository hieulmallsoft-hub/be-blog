require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override')
const cors = require('cors')
const port = process.env.PORT;

app.use(cors())
app.use(methodOverride('_method'))

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