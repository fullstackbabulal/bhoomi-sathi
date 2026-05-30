"use client";

// ======================================================
// File: components/home/Category.jsx
// Description: Property Categories
// UI Match: Bhoomi Sathi Homepage
// ======================================================

import Link from "next/link";
import styles from "./Category.module.css";

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
    title: "Plot",
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
    type: "commercial",
  },
  {
    id: 6,
    title: "House",
    count: "560+",
    icon: "🏠",
    color: "orange",
    type: "house",
  },
];

export default function Category({
  categories = [],
  title = "Browse By Property Category",
  description = "Find the right property type from verified listings.",
}) {
  const safeCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories.filter(Boolean)
      : DEFAULT_CATEGORIES;

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

            <p className={styles.subtitle}>{description}</p>
          </div>

          <Link href="/properties" className={styles.viewAllButton}>
            View All →
          </Link>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {safeCategories.map((category) => (
            <Link
              key={category.id}
              href={`/properties?type=${category.type}`}
              className={styles.card}
            >
              <div
                className={`${styles.iconWrapper} ${styles[category.color]}`}
              >
                <span className={styles.icon} aria-hidden="true">
                  {category.icon}
                </span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{category.title}</h3>

                <p className={styles.cardCount}>{category.count} Properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
