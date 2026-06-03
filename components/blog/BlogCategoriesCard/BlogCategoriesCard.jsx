"use client";

// ======================================================
// File: components/blog/BlogCategoriesCard/BlogCategoriesCard.jsx
// Description: Blog Categories Sidebar Card
// UI Match: Plot in Patna Blog Page
// ======================================================

import styles from "./BlogCategoriesCard.module.css";

import { ChevronRight } from "lucide-react";

// ======================================================
// SAMPLE DATA
// ======================================================

const DEFAULT_CATEGORIES = [
  {
    name: "Investment",
    count: 18,
  },

  {
    name: "Buying Guide",
    count: 12,
  },

  {
    name: "Home Loan",
    count: 9,
  },

  {
    name: "Market Trends",
    count: 15,
  },

  {
    name: "Luxury Homes",
    count: 7,
  },

  {
    name: "Legal Advice",
    count: 5,
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function BlogCategoriesCard({
  title = "Categories",

  categories = DEFAULT_CATEGORIES,

  activeCategory = "",

  onCategoryClick = () => {},
}) {
  return (
    <div className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {/* LIST */}
      <div className={styles.list}>
        {categories.map((category, index) => {
          const isActive = activeCategory === category.name;

          return (
            <button
              key={index}
              type="button"
              className={`${styles.item}
                ${isActive ? styles.active : ""}`}
              onClick={() => onCategoryClick(category.name)}
            >
              {/* LEFT */}
              <div className={styles.left}>
                <ChevronRight size={18} />

                <span>{category.name}</span>
              </div>

              {/* COUNT */}
              <span className={styles.count}>{category.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
