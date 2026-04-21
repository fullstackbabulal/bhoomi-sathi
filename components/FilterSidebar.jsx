import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../store/filterSlice";

const propertyTypes = ["plot", "flat", "house"];

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const update = (data) => {
    dispatch(setFilters(data));
  };

  return (
    <div className="bg-white p-3 rounded-4 shadow-sm">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">Filters</h6>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => dispatch(resetFilters())}
        >
          Reset
        </button>
      </div>

      {/* LOCATION */}
      <div className="mb-3">
        <label className="form-label small fw-semibold">Location</label>
        <input
          type="text"
          className="form-control rounded-pill"
          placeholder="e.g. Ratua"
          value={filters.location}
          onChange={(e) => update({ location: e.target.value })}
        />
      </div>

      {/* PROPERTY TYPE (TOUCH PILLS) */}
      <div className="mb-3">
        <label className="form-label small fw-semibold">Property Type</label>
        <div className="d-flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type}
              className={`btn rounded-pill px-3 ${
                filters.type === type ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => update({ type })}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE RANGE (TOUCH SLIDER STYLE) */}
      <div className="mb-3">
        <label className="form-label small fw-semibold">Price Range</label>

        <div className="d-flex gap-2 mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => update({ priceMin: e.target.value })}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => update({ priceMax: e.target.value })}
          />
        </div>

        {/* RANGE SLIDER */}
        <input
          type="range"
          className="form-range"
          min="0"
          max="10000000"
          step="50000"
          value={filters.priceMax || 0}
          onChange={(e) => update({ priceMax: e.target.value })}
        />
      </div>

      {/* AREA RANGE */}
      <div className="mb-3">
        <label className="form-label small fw-semibold">Area (sqft)</label>

        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min"
            value={filters.areaMin}
            onChange={(e) => update({ areaMin: e.target.value })}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max"
            value={filters.areaMax}
            onChange={(e) => update({ areaMax: e.target.value })}
          />
        </div>
      </div>

      {/* SORT */}
      <div className="mb-2">
        <label className="form-label small fw-semibold">Sort By</label>
        <select
          className="form-select rounded-pill"
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value })}
        >
          <option value="">Default</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
