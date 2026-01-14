import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="admin-layout bg-light min-vh-100">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/admin/dashboard">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Admin Panel
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="adminNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} to="/admin/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname.includes('/admin/products') ? 'active' : ''}`} to="/admin/products">
                                    Quản lý sản phẩm
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <span className="text-white-50 me-3">Xin chào, Admin</span>
                            <Link to="/" className="btn btn-outline-light btn-sm">
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="pb-5">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
