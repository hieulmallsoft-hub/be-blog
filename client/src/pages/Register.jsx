import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        remember: true,
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [e.target.name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const name = form.name.trim();
        const email = form.email.trim();
        const password = form.password;

        if (!name || !email || !password) {
            setErrorMsg("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        if (password.length < 6) {
            setErrorMsg("Mật khẩu phải từ 6 ký tự trở lên.");
            return;
        }
        if (password !== form.confirmPassword) {
            setErrorMsg("Mật khẩu nhập lại không khớp.");
            return;
        }

        setLoading(true);
        try {
            // 1) Register
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || "Đăng ký thất bại.");
                return;
            }

            setSuccessMsg("Đăng ký thành công! Đang đăng nhập...");

            // 2) Auto login (optional)
            const loginRes = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginRes.json();

            if (loginRes.ok && loginData?.token) {
                const storage = form.remember ? localStorage : sessionStorage;
                storage.setItem("token", loginData.token);
                if (loginData.user) storage.setItem("user", JSON.stringify(loginData.user));
                window.dispatchEvent(new Event("authChanged"));
                navigate("/");
            } else {
                // Nếu backend chưa trả token/user thì điều hướng qua login
                navigate("/login");
            }
        } catch (err) {
            setErrorMsg("Không kết nối được server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden">
            {/* Background Decoration */}
            <div
                className="position-absolute rounded-circle bg-primary opacity-10"
                style={{
                    width: "600px",
                    height: "600px",
                    top: "-100px",
                    right: "-100px",
                    filter: "blur(80px)",
                }}
            ></div>
            <div
                className="position-absolute rounded-circle bg-info opacity-10"
                style={{
                    width: "500px",
                    height: "500px",
                    bottom: "-100px",
                    left: "-100px",
                    filter: "blur(80px)",
                }}
            ></div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "24px",
                                backdropFilter: "blur(20px)",
                                background: "rgba(255,255,255,0.85)",
                            }}
                        >
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-primary bg-gradient text-white rounded-circle shadow-sm mb-3"
                                        style={{ width: "64px", height: "64px" }}
                                    >
                                        <i className="bi bi-person-plus-fill fs-2"></i>
                                    </div>
                                    <h3 className="fw-bold mb-1">Tạo tài khoản</h3>
                                    <p className="text-muted mb-0">Đăng ký để bắt đầu mua sắm</p>
                                </div>

                                {errorMsg && (
                                    <div className="alert alert-danger py-2" role="alert">
                                        {errorMsg}
                                    </div>
                                )}

                                {successMsg && (
                                    <div className="alert alert-success py-2" role="alert">
                                        {successMsg}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold text-uppercase">
                                            Họ tên
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control border-start-0 rounded-end-3"
                                                name="name"
                                                placeholder="Hieu"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold text-uppercase">
                                            Email
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control border-start-0 rounded-end-3"
                                                name="email"
                                                placeholder="name@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold text-uppercase">
                                            Mật khẩu
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control border-start-0 rounded-end-3"
                                                name="password"
                                                placeholder="••••••••"
                                                value={form.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-text">Tối thiểu 6 ký tự.</div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold text-uppercase">
                                            Nhập lại mật khẩu
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                                                <i className="bi bi-shield-check"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control border-start-0 rounded-end-3"
                                                name="confirmPassword"
                                                placeholder="••••••••"
                                                value={form.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Remember */}
                                    <div className="mb-4 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="remember"
                                            name="remember"
                                            checked={form.remember}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label text-muted small" htmlFor="remember">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>

                                    <div className="d-grid mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg rounded-pill shadow-sm fw-bold bg-gradient border-0"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Đang tạo tài khoản...
                                                </>
                                            ) : (
                                                <>
                                                    Đăng ký <i className="bi bi-arrow-right ms-2"></i>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-muted small mb-0">
                                            Đã có tài khoản?{" "}
                                            <Link to="/login" className="text-primary fw-bold text-decoration-none">
                                                Đăng nhập
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <Link to="/" className="text-decoration-none text-muted small opacity-75">
                                <i className="bi bi-arrow-left me-1"></i> Quay lại trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
