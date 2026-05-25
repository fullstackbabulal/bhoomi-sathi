"use client";

import React from "react";

const EnquiryFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
  setPage,
}) => {
  const handleReset = () => {
    setSearch("");
    setStatus("");
    setSource("");
    setPage(1);
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <div className="row g-3">
          {/* Search */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Search Lead
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Search name or phone..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          {/* Status */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">
              Status
            </label>

            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">
                Contacted
              </option>
              <option value="visited">Visited</option>
              <option value="closed">Closed</option>
              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>

          {/* Source */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">
              Source
            </label>

            <select
              className="form-select"
              value={source}
              onChange={(e) => {
                setPage(1);
                setSource(e.target.value);
              }}
            >
              <option value="">All Sources</option>
              <option value="website">Website</option>
              <option value="facebook">
                Facebook
              </option>
              <option value="whatsapp">
                WhatsApp
              </option>
              <option value="call">Call</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Reset */}
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryFilters;