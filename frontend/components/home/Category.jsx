"use client";

// ======================================================
// File: components/home/Category.jsx
// Description: Property Categories
// UI Match: Compact Homepage Target Design
// ======================================================

import Link from "next/link";
import styles from "./Category.module.css";

// ======================================================
// DEFAULT CATEGORY DATA
// ======================================================

const DEFAULT_CATEGORIES = [
  {
    id: 1,
    title: "Apartment",
    count: "2,430+",
    icon: "🏢",
    color: "blue",
    type: "apartment",
  },
  {
    id: 2,
    title: "Villa",
    count: "1,245+",
    icon: "🏡",
    color: "green",
    type: "villa",
  },
  {
    id: 3,
    title: "Residential Plot",
    count: "3,210+",
    icon: "🌿",
    color: "lime",
    type: "plot",
  },
  {
    id: 4,
    title: "Commercial",
    count: "1,120+",
    icon: "🏬",
    color: "red",
    type: "commercial",
  },
  {
    id: 5,
    title: "Office Space",
    count: "890+",
    icon: "🏙️",
    color: "purple",
    type: "office-space",
  },
  {
    id: 6,
    title: "Farm House",
    count: "560+",
    icon: "🏠",
    color: "orange",
    type: "farm-house",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function Category({
  categories = [],
  title = "Property Categories",
  description = "",
}) {
  // ==========================================
  // SAFE CATEGORY DATA
  // ==========================================

  const safeCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories.filter(Boolean)
      : DEFAULT_CATEGORIES;

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!safeCategories.length) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="category-heading">
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headingBlock}>
            <span className={styles.badge}>Categories</span>

            <h2 id="category-heading" className={styles.title}>
              {title}
            </h2>

            {description ? (
              <p className={styles.subtitle}>{description}</p>
            ) : null}
          </div>
        </div>

        {/* CATEGORY GRID */}
        <div className={styles.grid}>
          {safeCategories.map((category) => {
            const { id, title, count, icon, color, type } = category;

            return (
              <Link
                key={id}
                href={`/properties?type=${encodeURIComponent(type)}`}
                className={styles.card}
                aria-label={`Browse ${title} properties`}
              >
                {/* ICON */}
                <div className={`${styles.iconWrapper} ${styles[color] || ""}`}>
                  <span className={styles.icon} aria-hidden="true">
                    {icon}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className={styles.cardTitle}>{title}</h3>

                {/* COUNT */}
                <p className={styles.cardCount}>{count}</p>
              </Link>
            );
          })}
        </div>

        {/* VIEW ALL */}
        <Link
          href="/properties"
          className={styles.viewAllButton}
          aria-label="View all property categories"
        >
          View All Categories →
        </Link>
      </div>
    </section>
  );
}
