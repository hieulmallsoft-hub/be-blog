    import React from "react";

    export default function Pagination({ page, totalPages, onChange }) {
        if (!totalPages || totalPages <= 1) return null;

        const clamp = (n) => Math.max(1, Math.min(totalPages, n));

        const getPages = () => {
            const pages = [];
            const windowSize = 2;

            pages.push(1);

            const start = Math.max(2, page - windowSize);
            const end = Math.min(totalPages - 1, page + windowSize);

            if (start > 2) pages.push("...");
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push("...");

            if (totalPages > 1) pages.push(totalPages);
            return pages;
        };

        const pages = getPages();

        return (
            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onChange(clamp(page - 1))}>
                            Prev
                        </button>
                    </li>

                    {pages.map((p, idx) =>
                        p === "..." ? (
                            <li key={`dots-${idx}`} className="page-item disabled">
                                <span className="page-link">…</span>
                            </li>
                        ) : (
                            <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                                <button className="page-link" onClick={() => onChange(p)}>
                                    {p}
                                </button>
                            </li>
                        )
                    )}

                    <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onChange(clamp(page + 1))}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
