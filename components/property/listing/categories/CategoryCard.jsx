"use client";

// ======================================================
// File: components/property/listing/categories/CategoryCard.jsx
// Description: Property Category Card
// ======================================================

import styles from "./PropertyListingCategories.module.css";

export default function CategoryCard({
  title,
  icon,
  count,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.categoryCard} ${active ? styles.activeCard : ""}`}
    >
      {/* ICON */}
      <div
        className={`${styles.iconWrapper} ${active ? styles.activeIcon : ""}`}
      >
        <span className={styles.icon}>{icon}</span>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <h3 className={styles.categoryTitle}>{title}</h3>

        <p className={styles.categoryCount}>{count} Properties</p>
      </div>

      {/* ACTIVE INDICATOR */}
      {active && <span className={styles.activeBadge}>Selected</span>}
    </button>
  );
}
