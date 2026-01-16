const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const User = require("../../Model/User.model"); 


// lấy token gửi cho fe lưu lại (localStorage) để gọi các API cần đăng nhập 
const signToken = (user) => {
    return jwt.sign(
        { sub: user._id.toString(), role: user.role || "user", type: "user" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Thiếu name/email/password" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Mật khẩu tối thiểu 6 ký tự" });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Không cho client tự set role (tránh tự lên admin)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        console.error("register:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });

        if (!email || !password) {
            return res.status(400).json({ message: "Thiếu email/password" });
        }

        // nếu schema password select:false thì dùng .select("+password")
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(401).json({ message: "Sai email hoặc mật khẩu" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: "Sai email hoặc mật khẩu" });

        const token = signToken(user);

        return res.status(200).json({
            message: "Login successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { register, login };
