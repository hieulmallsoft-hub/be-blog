const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Chưa có token" });
        }

        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { id, role, ... }
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

const jwtAdmin = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Chưa có token" });
        }

        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        if (decoded.role !== "admin") {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

module.exports = { jwtAuth, jwtAdmin };
