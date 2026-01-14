import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ role = 'user' }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [loading, setLoading] = useState(false);

    const isAdmin = role === 'admin';

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setLoading(false);
            if (isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }, 1500);
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden">
            {/* Background Decoration */}
            <div className={`position-absolute rounded-circle ${isAdmin ? 'bg-danger' : 'bg-primary'} opacity-10`} style={{ width: '600px', height: '600px', top: '-100px', right: '-100px', filter: 'blur(80px)' }}></div>
            <div className={`position-absolute rounded-circle ${isAdmin ? 'bg-warning' : 'bg-info'} opacity-10`} style={{ width: '500px', height: '500px', bottom: '-100px', left: '-100px', filter: 'blur(80px)' }}></div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-4">
                        <div className="card border-0 shadow-lg glass-card" style={{ borderRadius: '24px', backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.8)' }}>
                            <div className="card-body p-5">
                                <div className="text-center mb-5">
                                    <div className={`d-inline-flex align-items-center justify-content-center ${isAdmin ? 'bg-danger' : 'bg-primary'} bg-gradient text-white rounded-circle shadow-sm mb-3`} style={{ width: '64px', height: '64px' }}>
                                        <i className={`bi ${isAdmin ? 'bi-shield-lock-fill' : 'bi-person-fill'} fs-2`}></i>
                                    </div>
                                    <h3 className="fw-bold mb-1">{isAdmin ? 'Admin Portal' : 'Chào mừng trở lại'}</h3>
                                    <p className="text-muted">{isAdmin ? 'Vui lòng đăng nhập quyền quản trị' : 'Vui lòng đăng nhập để tiếp tục'}</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>{isAdmin ? 'Tên đăng nhập' : 'Email'}</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 border-light-subtle rounded-start-3 ps-3 text-muted">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control border-start-0 border-light-subtle rounded-end-3 py-2 ps-2"
                                                placeholder={isAdmin ? "admin" : "name@example.com"}
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <label className="form-label text-muted small fw-bold text-uppercase mb-0" style={{ letterSpacing: '1px' }}>Mật khẩu</label>
                                            <a href="#" className={`text-decoration-none small ${isAdmin ? 'text-danger' : 'text-primary'} fw-bold`}>Quên mật khẩu?</a>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 border-light-subtle rounded-start-3 ps-3 text-muted">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control border-start-0 border-light-subtle rounded-end-3 py-2 ps-2"
                                                placeholder="••••••••"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 form-check">
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

                                    <div className="d-grid mb-4">
                                        <button
                                            type="submit"
                                            className={`btn ${isAdmin ? 'btn-danger' : 'btn-primary'} btn-lg rounded-pill shadow-sm fw-bold bg-gradient border-0 hover-lift`}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Checking access...
                                                </>
                                            ) : (
                                                <>
                                                    {isAdmin ? 'Đăng nhập Admin' : 'Đăng nhập'} <i className="bi bi-arrow-right ms-2"></i>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {!isAdmin && (
                                        <div className="text-center">
                                            <p className="text-muted small mb-0">
                                                Chưa có tài khoản? <Link to="#" className="text-primary fw-bold text-decoration-none">Đăng ký ngay</Link>
                                            </p>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <Link to="/" className="text-decoration-none text-muted small opacity-75 hover-opacity-100">
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
