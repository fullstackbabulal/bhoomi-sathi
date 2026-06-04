"use client";

// ======================================================
// File: frontend/components/admin/property/PropertyPagination.jsx
// Description: Property Table Pagination
// ======================================================

import styles from "./PropertyPagination.module.css";

export default function PropertyPagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems,
  rowsPerPage,
}) {
  // ======================================================
  // HANDLERS
  // ======================================================

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ======================================================
  // PAGINATION RANGE
  // ======================================================

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className={styles.paginationSection}>
      <div className={styles.wrapper}>
        {/* Left Info */}
        <div className={styles.info}>
          Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of{" "}
          <strong>{totalItems}</strong> properties
        </div>

        {/* Pagination Controls */}
        <div className={styles.controls}>
          {/* Previous */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={styles.button}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className={styles.pages}>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.active : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={styles.button}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
