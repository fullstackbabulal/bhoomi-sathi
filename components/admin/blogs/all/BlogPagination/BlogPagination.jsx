"use client";

// ======================================================
// File: admin/blogs/all/BlogPagination/BlogPagination.jsx
// Description: Blog Pagination
// ======================================================

import styles from "./BlogPagination.module.css";

export default function BlogPagination({
  page = 1,
  totalPages = 1,
  total = 0,
  limit = 10,
  onPageChange,
}) {
  // ======================================================
  // PAGINATION INFO
  // ======================================================

  const start = total === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  // ======================================================
  // PAGE NUMBERS
  // ======================================================

  const getPages = () => {
    const pages = [];

    const maxVisiblePages = 5;

    let startPage = Math.max(1, page - 2);

    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className={styles.pagination}>
      {/* ==========================================
          INFO
      ========================================== */}

      <div className={styles.info}>
        Showing <strong>{start}</strong>
        {" - "}
        <strong>{end}</strong>
        {" of "}
        <strong>{total}</strong> blogs
      </div>

      {/* ==========================================
          CONTROLS
      ========================================== */}

      <div className={styles.controls}>
        {/* Previous */}

        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          className={styles.pageButton}
        >
          Previous
        </button>

        {/* Page Numbers */}

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange?.(pageNumber)}
            className={`${styles.pageButton} ${
              page === pageNumber ? styles.activePage : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next */}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange?.(page + 1)}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}
