import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        const em = email.trim().toLowerCase();
        if (!em || !password) {
            setErr("Vui lòng nhập email và mật khẩu");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/auth/login`, {
                email: em,
                password,
            });

            const token = res.data?.token;
            const user = res.data?.user;

            if (!token || !user) {
                throw new Error("Thiếu token/user từ server");
            }

            // ✅ chỉ cho admin vào
            if (user.role !== "admin") {
                setErr("Tài khoản này không có quyền admin");
                return;
            }

            // ✅ DÙNG CHUNG KEY với phần còn lại của app
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // ✅ set default header cho axios để gọi /admin/... không bị 401
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            window.dispatchEvent(new Event("authChanged"));
            navigate("/admin/dashboard", { replace: true });
        } catch (e2) {
            setErr(e2?.response?.data?.message || e2?.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: 520 }}>
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-4 p-md-5">
                    <h3 className="fw-bold mb-1">Admin Login</h3>
                    <p className="text-muted mb-4">Đăng nhập để vào trang quản trị</p>

                    {err && <div className="alert alert-danger">{err}</div>}

                    <form onSubmit={handleSubmit} className="d-grid gap-3">
                        <div>
                            <label className="form-label">Email</label>
                            <input
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                autoComplete="email"
                            />
                        </div>

                        <div>
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </div>

                        <button className="btn btn-dark rounded-3" disabled={loading}>
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
