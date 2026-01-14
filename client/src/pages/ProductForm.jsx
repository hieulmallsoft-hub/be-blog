import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        thumbnail: '',
        category: '',
        status: 'active',
        discountPercentage: 0
    });

    useEffect(() => {
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            // Fetching via Admin API
            const response = await axios.get(`http://localhost:3000/admin/products/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                // Update using Admin API
                await axios.put(`http://localhost:3000/admin/products/${id}`, formData);
            } else {
                // Create using Admin API
                await axios.post('http://localhost:3000/admin/products', formData);
            }
            // Navigate back to Admin Product List
            navigate('/admin/products');
        } catch (error) {
            alert('Có lỗi xảy ra khi lưu sản phẩm');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-start">
                    <h1 className="fw-bold mb-4">{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm mới sản phẩm'}</h1>
                    <div className="card shadow-sm p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Giá (VNĐ)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Giảm giá (%)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="discountPercentage"
                                        value={formData.discountPercentage}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Trạng thái</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Dừng hoạt động</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Link ảnh (Thumbnail)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Danh mục</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">
                                    {isEdit ? 'Cập nhật' : 'Lưu sản phẩm'}
                                </button>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
