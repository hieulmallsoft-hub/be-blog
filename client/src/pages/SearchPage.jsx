import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function SearchPage() {
    const [params] = useSearchParams();
    const q = params.get("q") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!q.trim()) {
                setProducts([]);
                return;
            }
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/products/find?q=${encodeURIComponent(q)}`);
                setProducts(res.data);
            } finally {
                setLoading(false);
            }
        };

        fetchSearch();
    }, [q]);

    useEffect(() => {
        const fetchSuggest = async () => {
            if (!q.trim()) {
                setProducts([]);
                return;
            }
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/products/suggest?q=${encodeURIComponent(q)}`);
                setProducts(res.data);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggest();
    }, [q]);

    return (
        <div className="container">
            <h5 className="mb-3">Kết quả cho: <b>{q}</b></h5>

            {loading && <div>Đang tìm...</div>}

            {!loading && products.length === 0 && (
                <div>Không tìm thấy sản phẩm</div>
            )}

            <div className="row g-3">
                {products.map((p) => (
                    <div className="col-12 col-md-6 col-lg-4" key={p._id}>
                        <Link to={`/products/${p._id}`} className="text-decoration-none">
                            <div className="card h-100">
                                <img src={p.thumbnail} className="card-img-top" alt={p.title} />
                                <div className="card-body">
                                    <div className="fw-bold">{p.title}</div>
                                    <div className="text-muted">Giá: {p.priceNew ?? p.price}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
