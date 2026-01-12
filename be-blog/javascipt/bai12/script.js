const express = require("express");
const app = express();
const post = 3000
const Router1 = require("./Router/Router.product");
app.set("views", "./views");
app.set("view engine", "pug");



app.use(express.json());

app.use("/api/product", Router1);

app.listen(post, () => {
    console.log(`Server is running on ${post}`);
});

