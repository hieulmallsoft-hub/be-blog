import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const ProductList = ({ isAdmin }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 9;

    useEffect(() => {
        fetchProducts();

    }, [statusFilter, page, isAdmin]);

    const fetchProducts = async () => {
        setLoading(true);
        try {

            let url = isAdmin
                ? "http://localhost:3000/admin/products/pagitation"
                : "http://localhost:3000/products/pagitation";

            const res = await axios.get(url, {
                params: {
                    page,
                    limit,
                    ...(statusFilter ? { status: statusFilter } : {})
                }
            });

            // 1) lấy list từ 3 kiểu response
            const list =
                (Array.isArray(res.data?.data) && res.data.data) ||
                (Array.isArray(res.data?.products) && res.data.products) ||
                (Array.isArray(res.data) && res.data) ||
                [];

            // 2) lấy meta
            const tp = Number(res.data?.totalPages) || Math.max(1, Math.ceil((Number(res.data?.total) || list.length) / limit));
            const tt = Number(res.data?.total) || list.length;

            // nếu page đang vượt totalPages (sau khi lọc/xóa) → kéo về trang cuối
            if (page > tp && tp >= 1) {
                setTotalPages(tp);
                setTotal(tt);
                setLoading(false);
                setPage(tp);
                return;
            }

            setProducts(list);
            setTotalPages(tp);
            setTotal(tt);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            setProducts([]);
            setTotalPages(1);
            setTotal(0);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            try {
                await axios.delete(`http://localhost:3000/admin/products/${id}`);

                fetchProducts();
            } catch (error) {
                alert("Lỗi khi xóa sản phẩm");
            }
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <span className="badge bg-success">Hoạt động</span>;
            case "inactive":
                return <span className="badge bg-danger">Dừng hoạt động</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    const basePath = isAdmin ? "/admin/products" : "";


    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="row mb-5 align-items-end">
                <div className="col-md-8">
                    <h6 className="text-primary fw-bold text-uppercase mb-2" style={{ letterSpacing: "2px" }}>
                        {isAdmin ? "Quản trị cửa hàng" : "Cửa hàng của chúng tôi"}
                    </h6>
                    <h1 className="display-5 fw-bold mb-0">Danh sách sản phẩm</h1>
                    <p className="text-muted mt-2 lead">
                        {isAdmin
                            ? "Quản lý kho hàng và cập nhật thông tin sản phẩm."
                            : "Khám phá bộ sưu tập sản phẩm mới nhất của chúng tôi với chất lượng tốt nhất."}
                    </p>
                </div>
                <div className="col-md-4 text-md-end">
                    {isAdmin && (
                        <Link to="/admin/products/create" className="btn btn-premium-primary shadow-sm">
                            <i className="bi bi-plus-lg me-2"></i>  Thêm mới sản phẩm
                        </Link>
                    )}
                </div>
            </div>

            {/* Filter Section */}
            <div className="d-flex justify-content-center mb-5">
                <div className="filter-group shadow-sm">
                    <button
                        className={`filter-btn ${statusFilter === "" ? "active" : ""}`}
                        onClick={() => {
                            setStatusFilter("");
                            setPage(1);
                        }}
                    >
                        Tất cả sản phẩm
                    </button>

                    <button
                        className={`filter-btn ${statusFilter === "active" ? "active" : ""}`}
                        onClick={() => {
                            setStatusFilter("active");
                            setPage(1);
                        }}
                    >
                        Đang hoạt động
                    </button>

                    <button
                        className={`filter-btn ${statusFilter === "inactive" ? "active" : ""}`}
                        onClick={() => {
                            setStatusFilter("inactive");
                            setPage(1);
                        }}
                    >
                        Đã tạm dừng
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-grow text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                    <p className="mt-4 text-muted fw-500">Đang chuẩn bị dữ liệu cho bạn...</p>
                </div>
            ) : products.length > 0 ? (
                <>
                    <div className="row g-4">
                        {products.map((product, index) => (
                            <div
                                key={product._id}
                                className="col-lg-4 col-md-6"
                                style={{ animation: `fadeInUp 0.5s ease backwards ${index * 0.1}s` }}
                            >
                                <div className="card h-100 border-0 rounded-4 shadow-sm hover-lift">
                                    <div className="product-image-container position-relative mr-50">
                                        {product.thumbnail ? (
                                            <img
                                                src={product.thumbnail}
                                                className="card-img-top"
                                                alt={product.title}
                                                style={{ height: "540px", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "240px" }}>
                                                <i className="bi bi-image text-muted fs-1"></i>
                                            </div>
                                        )}

                                        <div className="position-absolute top-0 end-0 m-3">{getStatusBadge(product.status)}</div>

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
                                                        {parseInt(product.priceNew ?? 0, 10).toLocaleString()} <small>VNĐ</small>
                                                    </span>
                                                    <small className="text-muted text-decoration-line-through">
                                                        {(product.price ? product.price : 0).toLocaleString()} VNĐ
                                                    </small>
                                                </>
                                            ) : (
                                                <span className="text-primary">
                                                    {(product.price ? product.price : 0).toLocaleString()} <small>VNĐ</small>
                                                </span>
                                            )}
                                        </p>

                                        <p className="card-text text-muted small text-truncate-2 mb-4" style={{ height: "40px" }}>
                                            {product.description || "Không có mô tả cho sản phẩm này."}
                                        </p>

                                        <div className="d-flex gap-2">
                                            <Link
                                                to={`${basePath}/detail/${product._id}`}
                                                className="btn btn-outline-secondary btn-sm flex-fill rounded-3 border-light-subtle"
                                            >
                                                Chi tiết
                                            </Link>

                                            {isAdmin && (
                                                <>
                                                    <Link
                                                        to={`/admin/products/edit/${product._id}`}
                                                        className="btn btn-outline-warning btn-sm flex-fill rounded-3 border-light-subtle"
                                                    >
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

                    {/* Info + Pagination */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-2">
                        <small className="text-muted">
                            Hiển thị {from} - {to} / {total}
                        </small>

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onChange={(p) => {
                                setPage(p);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        />
                    </div>
                </>
            ) : (
                <div className="text-center py-5 glass-card rounded-4 shadow-sm">
                    <div className="mb-4">
                        <i className="bi bi-search text-muted display-1"></i>
                    </div>
                    <h3 className="fw-bold">Không tìm thấy sản phẩm</h3>
                    <p className="text-muted">Chúng tôi không tìm thấy sản phẩm nào phù hợp với lọc hiện tại.</p>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={() => {
                            setStatusFilter("");
                            setPage(1);
                        }}
                    >
                        Xem tất cả sản phẩm
                    </button>
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
