"use client";

// ======================================================
// File: components/blog/BlogCategoryTabs/BlogCategoryTabs.jsx
// Description: Blog Category Tabs
// UI Match: Bhoomi Sathi Blog Page
// ======================================================

import styles from "./BlogCategoryTabs.module.css";

// ======================================================
// SAMPLE DATA
// ======================================================

const DEFAULT_CATEGORIES = [
  "All",
  "Investment",
  "Buying Guide",
  "Home Loan",
  "Market Trends",
  "Luxury Homes",
];

// ======================================================
// COMPONENT
// ======================================================

export default function BlogCategoryTabs({
  categories = DEFAULT_CATEGORIES,

  activeCategory = "All",

  onChange = () => {},
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.tabs}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`${styles.tab}
              ${activeCategory === category ? styles.active : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
