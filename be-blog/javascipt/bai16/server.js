const express = require("express");
const connectDB = require("./config/db");
const app = express();
app.set("views", "./view");
app.set("view engine", "pug");
app.use(express.static("public"));

const port = 3000;

const Router1 = require("./router/product")

app.use("/api/", Router1)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

connectDB()