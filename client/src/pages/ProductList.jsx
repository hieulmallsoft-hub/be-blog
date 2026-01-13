import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
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
                await axios.delete(`http://localhost:3000/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert('Lỗi khi xóa sản phẩm');
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Đang tải...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Danh sách sản phẩm</h1>
                <Link to="/create" className="btn btn-success">+ Thêm mới</Link>
            </div>

            {products.length > 0 ? (
                <div className="row g-4">
                    {products.map(product => (
                        <div key={product._id} className="col-md-4 col-sm-6">
                            <div className="card h-100 shadow-sm">
                                {product.thumbnail ? (
                                    <img
                                        src={product.thumbnail}
                                        className="card-img-top"
                                        alt={product.title}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                                        <span className="text-muted">No Image</span>
                                    </div>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{product.title}</h5>
                                    <p className="card-text text-primary fw-bold">
                                        {product.price ? product.price.toLocaleString() : 0} VNĐ
                                    </p>
                                    <p className="card-text text-truncate small text-muted">{product.description}</p>
                                    <div className="d-flex gap-2">
                                        <Link to={`/detail/${product._id}`} className="btn btn-outline-primary btn-sm flex-fill">Chi tiết</Link>
                                        <Link to={`/edit/${product._id}`} className="btn btn-outline-warning btn-sm flex-fill">Sửa</Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-outline-danger btn-sm flex-fill"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="alert alert-info">Chưa có sản phẩm nào trong cơ sở dữ liệu.</div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
