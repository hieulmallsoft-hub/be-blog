const jwt = require("jsonwebtoken")
const User = require("../Models/user.model")
const jwtAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" })
    }
}


const jwtAdmin = (req, res, next) => {
    try {
        const header = req.headers.authorization; // "Bearer <token>"

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Chưa có token" });
        }

        const token = header.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Chưa có token" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: "JWT_SECRET missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (decoded.role !== "admin") {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};




module.exports = {
    jwtAuth,
    jwtAdmin
}