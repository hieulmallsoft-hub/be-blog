const express = require("express");
const router = express.Router();
const productData = require("../database/database.json");
const fs = require('fs');
const path = require('path');

// Access the array inside the JSON object
const products = productData.product;

// Helper to save changes to file
const saveToDb = () => {
    const dbPath = path.join(__dirname, "../database/database.json");
    // Write the entire productData object back to file
    fs.writeFileSync(dbPath, JSON.stringify(productData, null, 4));
};

router.get("/", (req, res) => {
    res.send(products);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id); // ids in json are numbers
    const item = products.find((p) => p.id === id);
    if (!item) {
        res.status(404).send("Product not found");
        return;
    }
    res.send(item);
});

router.post("/", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    saveToDb(); // Save to file
    res.send(newProduct);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = products.find((p) => p.id === id);
    if (!item) {
        res.status(404).send("Product not found");
        return;
    }
    item.name = req.body.name;
    item.price = req.body.price;
    saveToDb(); // Save to file
    res.send(item);
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const deleted = products.splice(index, 1);
    saveToDb(); // Save to file
    res.send(deleted);
});

module.exports = router;