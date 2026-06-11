"use client";

import FilterSidebar from "./FilterSidebar";

export default function FilterDrawerMobile() {
  return (
    <>
      {/* Mobile Filter Trigger */}
      <div className="d-md-none mb-3">
        <button
          type="button"
          className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileFilterDrawer"
          aria-controls="mobileFilterDrawer"
          aria-label="Open property filters"
        >
          <span>⚙️</span>
          Filters
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileFilterDrawer"
        aria-labelledby="mobileFilterDrawerLabel"
      >
        {/* Header */}
        <div className="offcanvas-header border-bottom">
          <div>
            <h5
              id="mobileFilterDrawerLabel"
              className="offcanvas-title fw-bold mb-1"
            >
              Property Filters
            </h5>

            <p className="text-muted small mb-0">Refine your property search</p>
          </div>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close filters"
          />
        </div>

        {/* Body */}
        <div className="offcanvas-body bg-light">
          <FilterSidebar />

          {/* Footer Actions */}
          <div className="mt-4 d-grid">
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              data-bs-dismiss="offcanvas"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
