"use client";

// ======================================================
// File: frontend/components/admin/property/PropertyFilters.jsx
// Description: Property Filters Toolbar
// ======================================================

import styles from "./PropertyFilters.module.css";

export default function PropertyFilters({
  search,
  setSearch,

  status,
  setStatus,

  propertyType,
  setPropertyType,

  location,
  setLocation,
}) {
  const handleReset = () => {
    setSearch("");
    setStatus("all");
    setPropertyType("all");
    setLocation("all");
  };

  return (
    <section className={styles.filtersSection}>
      <div className={styles.filtersWrapper}>
        {/* Search */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search property by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Status Filter */}
        <div className={styles.selectWrapper}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Status</option>

            <option value="published">Published</option>

            <option value="draft">Draft</option>

            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Property Type Filter */}
        <div className={styles.selectWrapper}>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Property Types</option>

            <option value="apartment">Apartment</option>

            <option value="villa">Villa</option>

            <option value="plot">Plot</option>

            <option value="commercial">Commercial</option>

            <option value="office">Office</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className={styles.selectWrapper}>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Locations</option>

            <option value="patna">Patna</option>

            <option value="delhi">Delhi</option>

            <option value="kolkata">Kolkata</option>

            <option value="mumbai">Mumbai</option>

            <option value="bangalore">Bangalore</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={handleReset}
          className={styles.resetButton}
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
}
