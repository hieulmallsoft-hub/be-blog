import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:3000";

const ClientLayout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [openSuggest, setOpenSuggest] = useState(false);

    // ✅ load user từ localStorage hoặc sessionStorage
    useEffect(() => {
        const load = () => {
            try {
                const u = localStorage.getItem("user") || sessionStorage.getItem("user");
                setUser(u ? JSON.parse(u) : null);
            } catch {
                setUser(null);
            }
        };

        load();

        window.addEventListener("authChanged", load);
        window.addEventListener("storage", load);

        return () => {
            window.removeEventListener("authChanged", load);
            window.removeEventListener("storage", load);
        };
    }, []);

    const handleLogout = () => {
        // xóa cả local + session cho khỏi lệch
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        setUser(null);
        window.dispatchEvent(new Event("authChanged"));
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const q = keyword.trim();
        if (!q) return;
        setOpenSuggest(false);
        navigate(`/search?q=${encodeURIComponent(q)}`);
    };

    // ✅ suggest khi gõ
    useEffect(() => {
        const q = keyword.trim();
        if (!q) {
            setSuggestions([]);
            setOpenSuggest(false);
            return;
        }

        const t = setTimeout(async () => {
            try {
                const res = await axios.get(`${API_BASE}/products/suggest?q=${encodeURIComponent(q)}`);
                setSuggestions(Array.isArray(res.data) ? res.data : []);
                setOpenSuggest(true);
            } catch {
                setSuggestions([]);
                setOpenSuggest(false);
            }
        }, 250);

        return () => clearTimeout(t);
    }, [keyword]);

    return (
        <div className="client-layout">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/">
                        <i className="bi bi-shop me-2"></i>
                        My Shop
                    </Link>

                    {/* Search box */}
                    <div className="position-relative ms-3" style={{ width: 360 }}>
                        <form onSubmit={handleSearch} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onFocus={() => keyword.trim() && setOpenSuggest(true)}
                                onBlur={() => setTimeout(() => setOpenSuggest(false), 150)}
                            />
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-search"></i>
                            </button>
                        </form>

                        {openSuggest && suggestions.length > 0 && (
                            <div className="list-group position-absolute w-100 shadow-sm" style={{ top: "110%", zIndex: 999 }}>
                                {suggestions.map((p) => (
                                    <button
                                        key={p._id}
                                        type="button"
                                        className="list-group-item list-group-item-action d-flex align-items-center gap-2"
                                        onMouseDown={() => {
                                            setKeyword(p.title);
                                            setOpenSuggest(false);
                                            navigate(`/products/${p._id}`);
                                        }}
                                    >
                                        <img src={p.thumbnail} alt={p.title} width="34" height="34" className="rounded" style={{ objectFit: "cover" }} />
                                        <div className="text-start">
                                            <div className="fw-semibold">{p.title}</div>
                                            <div className="small text-muted">Giá: {p.priceNew ?? p.price}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="ms-auto">
                        {user ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-light border rounded-pill px-3 d-flex align-items-center dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    type="button"
                                >
                                    <img
                                        src={user.avatar || "https://i.pravatar.cc/40?img=3"}
                                        alt="avatar"
                                        width="32"
                                        height="32"
                                        className="rounded-circle me-2"
                                    />
                                    <span className="fw-medium">{user.name || "User"}</span>
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            <i className="bi bi-person me-2"></i> Hồ sơ
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link className="btn btn-primary rounded-pill px-4 shadow-sm" to="/login">
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className="bg-light py-4 mt-5">
                <div className="container text-center text-muted">
                    <small>&copy; 2024 My Shop. All rights reserved.</small>
                </div>
            </footer>
        </div>
    );
};

export default ClientLayout;
