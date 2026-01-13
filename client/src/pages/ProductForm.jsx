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
        category: ''
    });

    useEffect(() => {
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/products/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.patch(`http://localhost:3000/products/${id}`, formData);
            } else {
                await axios.post('http://localhost:3000/products', formData);
            }
            navigate('/');
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
                            <div className="mb-3">
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
