"use client";

// ======================================================
// File: components/property/listing/filters/PropertyListingFilters.jsx
// Description: Property Listing Filters Section
// ======================================================

import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "@/store/filterSlice";

import styles from "./PropertyListingFilters.module.css";

export default function PropertyListingFilters() {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      setFilters({
        [name]: value,
      }),
    );
  };

  // ======================================================
  // RESET FILTERS
  // ======================================================
  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.filterCard}>
          {/* HEADER */}
          <div className={styles.header}>
            <div>
              <span className={styles.badge}>Smart Search</span>

              <h2 className={styles.title}>Find Property Faster</h2>

              <p className={styles.subtitle}>
                Filter verified plots, apartments, houses, villas, and
                commercial properties with advanced search.
              </p>
            </div>

            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Reset Filters
            </button>
          </div>

          {/* FILTER GRID */}
          <div className={styles.filterGrid}>
            {/* SEARCH */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Search</label>

              <input
                type="text"
                name="search"
                placeholder="Search property, city, locality..."
                className={styles.input}
                value={filters?.search || ""}
                onChange={handleChange}
              />
            </div>

            {/* PROPERTY TYPE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Property Type</label>

              <select
                name="type"
                className={styles.select}
                value={filters?.type || ""}
                onChange={handleChange}
              >
                <option value="">All Types</option>
                <option value="plot">Plot</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* LOCATION */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Location</label>

              <input
                type="text"
                name="location"
                placeholder="Patna, Kolkata, Delhi..."
                className={styles.input}
                value={filters?.location || ""}
                onChange={handleChange}
              />
            </div>

            {/* MIN PRICE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Min Price</label>

              <input
                type="number"
                name="priceMin"
                placeholder="₹ Minimum"
                className={styles.input}
                value={filters?.priceMin || ""}
                onChange={handleChange}
              />
            </div>

            {/* MAX PRICE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Max Price</label>

              <input
                type="number"
                name="priceMax"
                placeholder="₹ Maximum"
                className={styles.input}
                value={filters?.priceMax || ""}
                onChange={handleChange}
              />
            </div>

            {/* SORT */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Sort By</label>

              <select
                name="sort"
                className={styles.select}
                value={filters?.sort || ""}
                onChange={handleChange}
              >
                <option value="">Recommended</option>
                <option value="newest">Newest</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* ACTIONS */}
          <div className={styles.actionWrapper}>
            <button type="button" className={styles.searchButton}>
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
