import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        inactiveProducts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/dashboard');
            if (response.data.success) {
                setStats(response.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="text-center py-5">
            <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="mb-5">
                <h6 className="text-primary fw-bold text-uppercase mb-2" style={{ letterSpacing: '2px' }}>Tổng quan</h6>
                <h1 className="display-5 fw-bold mb-0">Admin Dashboard</h1>
                <p className="text-muted mt-2 lead">Chào mừng trở lại! Đây là tình hình hoạt động của cửa hàng.</p>
            </div>

            <div className="row g-4 mb-5">
                {/* Total Products Card */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 hover-lift" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)', color: 'white' }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="mb-0 fw-medium opacity-75">Tổng sản phẩm</p>
                                    <h2 className="display-4 fw-bold mb-0">{stats.totalProducts}</h2>
                                </div>
                                <div className="p-3 rounded-4 bg-white bg-opacity-10">
                                    <i className="bi bi-box-seam fs-2"></i>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-top border-white border-opacity-25">
                                <Link to="/" className="text-white text-decoration-none d-flex align-items-center small fw-bold">
                                    Xem chi tiết <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Products Card */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 hover-lift glass-card" style={{ borderRadius: '16px' }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted mb-0 fw-medium">Đang hoạt động</p>
                                    <h2 className="display-4 fw-bold mb-0 text-success">{stats.activeProducts}</h2>
                                </div>
                                <div className="p-3 rounded-4 bg-success bg-opacity-10 text-success">
                                    <i className="bi bi-check-circle fs-2"></i>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-top">
                                <Link to="/?status=active" className="text-primary text-decoration-none d-flex align-items-center small fw-bold">
                                    Lọc sản phẩm <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inactive Products Card */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 hover-lift glass-card" style={{ borderRadius: '16px' }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted mb-0 fw-medium">Dừng hoạt động</p>
                                    <h2 className="display-4 fw-bold mb-0 text-secondary">{stats.inactiveProducts}</h2>
                                </div>
                                <div className="p-3 rounded-4 bg-secondary bg-opacity-10 text-secondary">
                                    <i className="bi bi-pause-circle fs-2"></i>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-top">
                                <Link to="/?status=inactive" className="text-primary text-decoration-none d-flex align-items-center small fw-bold">
                                    Lọc sản phẩm <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-light">
                <i className="bi bi-bar-chart-line text-muted display-4 mb-3"></i>
                <h4 className="fw-bold">Biểu đồ thống kê</h4>
                <p className="text-muted">Tính năng biểu đồ đang được phát triển...</p>
            </div>
        </div>
    );
};

export default Dashboard;
