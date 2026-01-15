const express = require("express");
const router = express.Router();
const authController = require("../../Controller/client/auth.controller");
const { jwtAuth, jwtAdmin } = require("../../Middleware/jwtAuth");
router.post("/register", authController.register);
router.post("/login", authController.login)
module.exports = router;