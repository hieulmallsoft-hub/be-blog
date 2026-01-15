import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

const Login = ({ role = "user" }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const isAdmin = role === "admin";

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData((s) => ({ ...s, [e.target.name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const url = isAdmin ? `${API_BASE}/admin/auth/login` : `${API_BASE}/auth/login`;

            const payload = isAdmin
                ? { username: formData.email, password: formData.password }
                : { email: formData.email, password: formData.password };

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || "Đăng nhập thất bại");
                return;
            }

            // ✅ chọn storage theo remember
            const storage = formData.remember ? localStorage : sessionStorage;

            // ✅ LUÔN clear cái còn lại để khỏi lệch
            const other = formData.remember ? sessionStorage : localStorage;
            other.removeItem(isAdmin ? "admin_token" : "token");
            other.removeItem(isAdmin ? "admin_user" : "user");

            // ✅ lưu token + user
            storage.setItem(isAdmin ? "admin_token" : "token", data.token);

            // data.user phải tồn tại. Nếu BE trả data.data.user thì bạn đổi chỗ này:
            const userObj = data.user;
            storage.setItem(isAdmin ? "admin_user" : "user", JSON.stringify(userObj));

            // ✅ báo layout cập nhật ngay (cùng tab)
            window.dispatchEvent(new Event("authChanged"));

            navigate(isAdmin ? "/admin/dashboard" : "/");
        } catch (err) {
            setErrorMsg("Không kết nối được server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden">
            <div
                className={`position-absolute rounded-circle ${isAdmin ? "bg-danger" : "bg-primary"} opacity-10`}
                style={{ width: "600px", height: "600px", top: "-100px", right: "-100px", filter: "blur(80px)" }}
            />
            <div
                className={`position-absolute rounded-circle ${isAdmin ? "bg-warning" : "bg-info"} opacity-10`}
                style={{ width: "500px", height: "500px", bottom: "-100px", left: "-100px", filter: "blur(80px)" }}
            />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-4">
                        <div className="card border-0 shadow-lg" style={{ borderRadius: "24px", backdropFilter: "blur(20px)", background: "rgba(255,255,255,0.85)" }}>
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div
                                        className={`d-inline-flex align-items-center justify-content-center ${isAdmin ? "bg-danger" : "bg-primary"} bg-gradient text-white rounded-circle shadow-sm mb-3`}
                                        style={{ width: "64px", height: "64px" }}
                                    >
                                        <i className={`bi ${isAdmin ? "bi-shield-lock-fill" : "bi-person-fill"} fs-2`}></i>
                                    </div>
                                    <h3 className="fw-bold mb-1">{isAdmin ? "Admin Portal" : "Chào mừng trở lại"}</h3>
                                    <p className="text-muted">{isAdmin ? "Vui lòng đăng nhập quyền quản trị" : "Vui lòng đăng nhập để tiếp tục"}</p>
                                </div>

                                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>
                                            {isAdmin ? "Tên đăng nhập" : "Email"}
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={isAdmin ? "admin" : "name@example.com"}
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>
                                            Mật khẩu
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="••••••••"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                            name="remember"
                                            checked={formData.remember}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label text-muted small" htmlFor="rememberMe">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>

                                    <button type="submit" className={`btn ${isAdmin ? "btn-danger" : "btn-primary"} w-100 rounded-pill`} disabled={loading}>
                                        {loading ? "Đang đăng nhập..." : isAdmin ? "Đăng nhập Admin" : "Đăng nhập"}
                                    </button>

                                    {!isAdmin && (
                                        <div className="text-center mt-3">
                                            <p className="text-muted small mb-0">
                                                Chưa có tài khoản? <Link to="/register" className="text-primary fw-bold text-decoration-none">Đăng ký ngay</Link>
                                            </p>
                                        </div>
                                    )}
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

export default Login;
