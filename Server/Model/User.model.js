const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    status: String,
    createdAt: Date,
});

module.exports = mongoose.model("User", userSchema);