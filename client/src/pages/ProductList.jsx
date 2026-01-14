import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = ({ isAdmin }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState(''); // '' for all, 'active', 'inactive'

    useEffect(() => {
        fetchProducts();
    }, [statusFilter]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Client uses /products, Admin uses /admin/products (though data is same, good for separation)
            let baseUrl = isAdmin ? 'http://localhost:3000/admin/products' : 'http://localhost:3000/products';
            let url = baseUrl;

            if (statusFilter) {
                if (isAdmin) {
                    url = `http://localhost:3000/admin/products?status=${statusFilter}`;
                } else {
                    url = `http://localhost:3000/products/status?status=${statusFilter}`;
                }
            }

            const response = await axios.get(url);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            try {
                // DELETE MUST use Admin API
                await axios.delete(`http://localhost:3000/admin/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert('Lỗi khi xóa sản phẩm');
            }
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <span className="badge bg-success">Hoạt động</span>;
            case 'inactive':
                return <span className="badge bg-danger">Dừng hoạt động</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    const basePath = isAdmin ? '/admin/products' : '';

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="row mb-5 align-items-end">
                <div className="col-md-8">
                    <h6 className="text-primary fw-bold text-uppercase mb-2" style={{ letterSpacing: '2px' }}>{isAdmin ? 'Quản trị cửa hàng' : 'Cửa hàng của chúng tôi'}</h6>
                    <h1 className="display-5 fw-bold mb-0">Danh sách sản phẩm</h1>
                    <p className="text-muted mt-2 lead">
                        {isAdmin ? 'Quản lý kho hàng và cập nhật thông tin sản phẩm.' : 'Khám phá bộ sưu tập sản phẩm mới nhất của chúng tôi với chất lượng tốt nhất.'}
                    </p>
                </div>
                <div className="col-md-4 text-md-end">
                    {isAdmin && (
                        <Link to="/admin/products/create" className="btn btn-premium-primary shadow-sm">
                            <i className="bi bi-plus-lg me-2"></i> + Thêm mới sản phẩm
                        </Link>
                    )}
                </div>
            </div>

            {/* Filter Section */}
            <div className="d-flex justify-content-center mb-5">
                <div className="filter-group shadow-sm">
                    <button
                        className={`filter-btn ${statusFilter === '' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('')}
                    >
                        Tất cả sản phẩm
                    </button>
                    <button
                        className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('active')}
                    >
                        Đang hoạt động
                    </button>
                    <button
                        className={`filter-btn ${statusFilter === 'inactive' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('inactive')}
                    >
                        Đã tạm dừng
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                    <p className="mt-4 text-muted fw-500">Đang chuẩn bị dữ liệu cho bạn...</p>
                </div>
            ) : products.length > 0 ? (
                <div className="row g-4">
                    {products.map((product, index) => (
                        <div key={product._id} className="col-lg-4 col-md-6" style={{ animation: `fadeInUp 0.5s ease backwards ${index * 0.1}s` }}>
                            <div className="card h-100 border-0 rounded-4 shadow-sm hover-lift">
                                <div className="product-image-container position-relative">
                                    {product.thumbnail ? (
                                        <img
                                            src={product.thumbnail}
                                            className="card-img-top"
                                            alt={product.title}
                                            style={{ height: '240px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '240px' }}>
                                            <i className="bi bi-image text-muted fs-1"></i>
                                        </div>
                                    )}
                                    <div className="position-absolute top-0 end-0 m-3">
                                        {getStatusBadge(product.status)}
                                    </div>
                                    {product.discountPercentage > 0 && (
                                        <div className="position-absolute top-0 start-0 m-3 badge bg-danger rounded-pill">
                                            -{product.discountPercentage}%
                                        </div>
                                    )}
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title fw-bold text-truncate mb-0 h6" title={product.title}>
                                            {product.title}
                                        </h5>
                                    </div>
                                    <p className="fw-bold fs-5 mb-2">
                                        {product.discountPercentage > 0 ? (
                                            <>
                                                <span className="text-danger me-2">
                                                    {parseInt(product.priceNew).toLocaleString()} <small>VNĐ</small>
                                                </span>
                                                <small className="text-muted text-decoration-line-through">
                                                    {product.price ? product.price.toLocaleString() : 0} VNĐ
                                                </small>
                                            </>
                                        ) : (
                                            <span className="text-primary">
                                                {product.price ? product.price.toLocaleString() : 0} <small>VNĐ</small>
                                            </span>
                                        )}
                                    </p>
                                    <p className="card-text text-muted small text-truncate-2 mb-4" style={{ height: '40px' }}>
                                        {product.description || 'Không có mô tả cho sản phẩm này.'}
                                    </p>
                                    <div className="d-flex gap-2">
                                        <Link to={`${basePath}/detail/${product._id}`} className="btn btn-outline-secondary btn-sm flex-fill rounded-3 border-light-subtle">
                                            Chi tiết
                                        </Link>
                                        {isAdmin && (
                                            <>
                                                <Link to={`/admin/products/edit/${product._id}`} className="btn btn-outline-warning btn-sm flex-fill rounded-3 border-light-subtle">
                                                    Chỉnh sửa
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="btn btn-outline-danger btn-sm flex-fill rounded-3 border-light-subtle"
                                                >
                                                    Xóa
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5 glass-card rounded-4 shadow-sm">
                    <div className="mb-4">
                        <i className="bi bi-search text-muted display-1"></i>
                    </div>
                    <h3 className="fw-bold">Không tìm thấy sản phẩm</h3>
                    <p className="text-muted">Chúng tôi không tìm thấy sản phẩm nào phù hợp với lọc hiện tại.</p>
                    <button className="btn btn-primary mt-2" onClick={() => setStatusFilter('')}>Xem tất cả sản phẩm</button>
                </div>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ProductList;
