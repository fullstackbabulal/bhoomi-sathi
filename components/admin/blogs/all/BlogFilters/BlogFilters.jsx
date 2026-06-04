"use client";

// ======================================================
// File: admin/blogs/all/BlogFilters/BlogFilters.jsx
// Description: Blog Filters
// ======================================================

import { FiSearch, FiRotateCcw } from "react-icons/fi";

import styles from "./BlogFilters.module.css";

export default function BlogFilters({ filters = {}, onChange, onReset }) {
  const handleChange = (field) => (event) => {
    onChange?.(field, event.target.value);
  };

  return (
    <section className={styles.filtersCard} aria-label="Blog Filters">
      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className={styles.searchWrapper}>
        <FiSearch className={styles.searchIcon} />

        <input
          type="text"
          placeholder="Search blogs..."
          value={filters.keyword || ""}
          onChange={handleChange("keyword")}
          className={styles.searchInput}
        />
      </div>

      {/* ==================================================
          STATUS
      ================================================== */}

      <select
        value={filters.status || ""}
        onChange={handleChange("status")}
        className={styles.select}
      >
        <option value="">All Status</option>

        <option value="published">Published</option>

        <option value="draft">Draft</option>

        <option value="archived">Archived</option>
      </select>

      {/* ==================================================
          CATEGORY
      ================================================== */}

      <select
        value={filters.category || ""}
        onChange={handleChange("category")}
        className={styles.select}
      >
        <option value="">All Categories</option>

        <option value="real-estate">Real Estate</option>

        <option value="property-investment">Property Investment</option>

        <option value="market-trends">Market Trends</option>

        <option value="home-buying">Home Buying</option>

        <option value="property-tips">Property Tips</option>
      </select>

      {/* ==================================================
          AUTHOR
      ================================================== */}

      <input
        type="text"
        placeholder="Author"
        value={filters.author || ""}
        onChange={handleChange("author")}
        className={styles.input}
      />

      {/* ==================================================
          RESET
      ================================================== */}

      <button type="button" onClick={onReset} className={styles.resetButton}>
        <FiRotateCcw size={16} />

        <span>Reset</span>
      </button>
    </section>
  );
}
