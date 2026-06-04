"use client";

// ======================================================
// File: components/property/listing/categories/CategoryCard.jsx
// Description: Property Category Card
// ======================================================

import Link from "next/link";
import styles from "./PropertyListingCategories.module.css";

// ======================================================
// CATEGORY → PROPERTY TYPE MAPPING
// ======================================================

const getPropertyType = (title = "") => {
  const normalizedTitle = title.trim().toLowerCase();

  const categoryMap = {
    apartment: "apartment",
    apartments: "apartment",

    villa: "villa",
    villas: "villa",

    house: "house",
    houses: "house",

    plot: "plot",
    plots: "plot",

    commercial: "commercial",
    commercials: "commercial",
  };

  return categoryMap[normalizedTitle] || "";
};

export default function CategoryCard({
  title,
  icon,
  count,
  active = false,
  onClick,
}) {
  const propertyType = getPropertyType(title);

  const href = propertyType
    ? `/properties?type=${encodeURIComponent(propertyType)}`
    : "/properties";

  return (
    <Link
      href={href}
      className={styles.categoryLink}
      onClick={onClick}
      aria-label={`Browse ${title} properties`}
    >
      <div
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
      </div>
    </Link>
  );
}
