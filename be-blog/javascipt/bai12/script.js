const express = require("express");
const app = express();
const Router1 = require("./Router/Router.product");



app.use(express.json());

app.use("/api/product", Router1);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

