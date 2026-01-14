import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = ({ isAdmin }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Đang tải...</div>;
    if (!product) return <div className="container mt-5"><div className="alert alert-danger">Không tìm thấy sản phẩm.</div></div>;

    const backLink = isAdmin ? '/admin/products' : '/';

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    {product.thumbnail ? (
                        <img src={product.thumbnail} className="img-fluid rounded shadow" alt={product.title} />
                    ) : (
                        <div className="bg-light d-flex align-items-center justify-content-center border" style={{ height: '400px' }}>
                            <span className="text-muted">No Image</span>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <h1 className="fw-bold mb-3">{product.title}</h1>
                    <div className="mb-4">
                        {product.discountPercentage > 0 ? (
                            <>
                                <h3 className="text-danger fw-bold d-inline me-3">
                                    {parseInt(product.priceNew).toLocaleString()} VNĐ
                                </h3>
                                <span className="text-muted text-decoration-line-through fs-5">
                                    {product.price ? product.price.toLocaleString() : 0} VNĐ
                                </span>
                            </>
                        ) : (
                            <h3 className="text-primary mb-4">{product.price ? product.price.toLocaleString() : 0} VNĐ</h3>
                        )}
                    </div>

                    <div className="mb-4">
                        <span className="badge bg-secondary mb-2">{product.category || 'Chưa phân loại'}</span>
                        <p className="lead">{product.description}</p>
                    </div>

                    <div className="d-flex gap-2">
                        {isAdmin && (
                            <Link to={`/admin/products/edit/${product._id}`} className="btn btn-warning">Chỉnh sửa</Link>
                        )}
                        <Link to={backLink} className="btn btn-outline-secondary">Quay lại danh sách</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
