const bcrypt = require("bcrypt");
const jwwt = require("jsonwebtoken");
const User = require("../../Model/User.model");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    register
}