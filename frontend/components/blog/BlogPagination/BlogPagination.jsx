"use client";

// ======================================================
// File: components/blog/BlogPagination/BlogPagination.jsx
// Description: Blog Pagination
// UI Match: Plot in Patna Blog Page
// ======================================================

import styles from "./BlogPagination.module.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogPagination({
  currentPage = 1,

  totalPages = 8,

  onPageChange = () => {},
}) {
  // ====================================================
  // GENERATE PAGE NUMBERS
  // ====================================================

  const getPages = () => {
    const pages = [];

    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);

    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <nav className={styles.pagination} aria-label="Blog pagination">
      {/* PREVIOUS */}
      <button
        type="button"
        className={styles.navButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={18} />

        <span>Previous</span>
      </button>

      {/* PAGE NUMBERS */}
      <div className={styles.pageNumbers}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton}
              ${currentPage === page ? styles.active : ""}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* NEXT */}
      <button
        type="button"
        className={styles.navButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span>Next</span>

        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
