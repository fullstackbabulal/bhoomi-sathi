"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilters } from "../store/filterSlice";

const PROPERTY_TYPES = [
  {
    label: "Plot",
    value: "plot",
  },
  {
    label: "Flat",
    value: "flat",
  },
  {
    label: "House",
    value: "house",
  },
];

const MAX_PRICE = 10000000;
const PRICE_STEP = 50000;

export default function FilterSidebar() {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state?.filters ?? {});

  const updateFilters = useCallback(
    (payload) => {
      dispatch(setFilters(payload));
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleInputChange = useCallback(
    (field, value) => {
      updateFilters({
        [field]: value,
      });
    },
    [updateFilters],
  );

  const handlePropertyType = useCallback(
    (type) => {
      const selectedType = filters?.type === type ? "" : type;

      updateFilters({
        type: selectedType,
      });
    },
    [filters?.type, updateFilters],
  );

  return (
    <aside
      className="bg-white p-4 rounded-4 shadow-sm border"
      aria-label="Property filters"
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Filters</h5>

          <p className="text-muted small mb-0">Refine your property search</p>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary rounded-pill"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="form-label fw-semibold small">Location</label>

        <input
          type="text"
          className="form-control rounded-pill"
          placeholder="e.g. Ratua"
          value={filters?.location ?? ""}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      {/* Property Type */}
      <div className="mb-4">
        <label className="form-label fw-semibold small">Property Type</label>

        <div className="d-flex flex-wrap gap-2">
          {PROPERTY_TYPES.map(({ label, value }) => {
            const isActive = filters?.type === value;

            return (
              <button
                key={value}
                type="button"
                className={`btn rounded-pill px-3 text-capitalize ${
                  isActive ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={() => handlePropertyType(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="form-label fw-semibold small">Price Range</label>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              min="0"
              value={filters?.priceMin ?? ""}
              onChange={(e) => handleInputChange("priceMin", e.target.value)}
            />
          </div>

          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              min="0"
              value={filters?.priceMax ?? ""}
              onChange={(e) => handleInputChange("priceMax", e.target.value)}
            />
          </div>
        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max={MAX_PRICE}
          step={PRICE_STEP}
          value={filters?.priceMax || 0}
          onChange={(e) => handleInputChange("priceMax", e.target.value)}
        />

        <div className="d-flex justify-content-between small text-muted">
          <span>₹0</span>
          <span>₹{MAX_PRICE.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Area Range */}
      <div className="mb-4">
        <label className="form-label fw-semibold small">Area (sqft)</label>

        <div className="row g-2">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Min Area"
              min="0"
              value={filters?.areaMin ?? ""}
              onChange={(e) => handleInputChange("areaMin", e.target.value)}
            />
          </div>

          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Max Area"
              min="0"
              value={filters?.areaMax ?? ""}
              onChange={(e) => handleInputChange("areaMax", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="form-label fw-semibold small">Sort By</label>

        <select
          className="form-select rounded-pill"
          value={filters?.sort ?? ""}
          onChange={(e) => handleInputChange("sort", e.target.value)}
        >
          <option value="">Default</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>
    </aside>
  );
}
