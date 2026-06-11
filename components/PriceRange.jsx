"use client";

// ======================================================
// File: components/property/filter/PriceRange.jsx
// Description: Property Price Range Filter
// ======================================================

import styles from "./PriceRange.module.css";

export default function PriceRange({
  minPrice = "",
  maxPrice = "",
  onMinPriceChange,
  onMaxPriceChange,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Price Range</h3>
        <p className={styles.subtitle}>Select your preferred budget range</p>
      </div>

      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Minimum Price</label>

          <input
            type="number"
            placeholder="₹ Min Price"
            value={minPrice}
            onChange={(e) => onMinPriceChange?.(e.target.value)}
            className={styles.input}
            min="0"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Maximum Price</label>

          <input
            type="number"
            placeholder="₹ Max Price"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange?.(e.target.value)}
            className={styles.input}
            min="0"
          />
        </div>
      </div>
    </div>
  );
}
