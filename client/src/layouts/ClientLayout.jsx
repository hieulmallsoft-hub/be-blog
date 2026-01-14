import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div className="client-layout">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/">
                        <i className="bi bi-shop me-2"></i>
                        My Shop
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link fw-medium" to="/">Sản phẩm</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-medium" to="/cart">
                                    <i className="bi bi-cart"></i> Giỏ hàng
                                </Link>
                            </li>
                            <li className="nav-item ms-lg-3">
                                <Link className="btn btn-primary rounded-pill px-4 shadow-sm" to="/login">
                                    Đăng nhập
                                </Link>
                            </li>
                        </ul>
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
