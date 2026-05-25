/* frontend/components/home/Category.jsx */

"use client";

import styles from "./Category.module.css";

const DEFAULT_CATEGORIES = [
  {
    id: 1,
    title: "Apartment",
    count: "2,430+",
    icon: "🏢",
    color: "blue",
  },
  {
    id: 2,
    title: "Villa",
    count: "1,245+",
    icon: "🏡",
    color: "green",
  },
  {
    id: 3,
    title: "Residential Plot",
    count: "3,210+",
    icon: "🌿",
    color: "lime",
  },
  {
    id: 4,
    title: "Commercial",
    count: "1,120+",
    icon: "🏬",
    color: "red",
  },
  {
    id: 5,
    title: "Office Space",
    count: "890+",
    icon: "🏙️",
    color: "purple",
  },
  {
    id: 6,
    title: "Farm House",
    count: "560+",
    icon: "🏠",
    color: "orange",
  },
];

export default function Category({
  categories = [],
  title = "Property Categories",
  description = "Explore property types across verified listings.",
}) {
  const safeCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories.filter(Boolean)
      : DEFAULT_CATEGORIES;

  const hasCategories = safeCategories.length > 0;

  return (
    <section className={styles.section} aria-labelledby="category-heading">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headingBlock}>
            <span className={styles.badge}>Categories</span>

            <h2 id="category-heading" className={styles.title}>
              {title}
            </h2>

            <p className={styles.subtitle}>{description}</p>
          </div>
        </div>

        {/* Empty State */}
        {!hasCategories ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏘️</div>

            <h3 className={styles.emptyTitle}>No Categories Available</h3>

            <p className={styles.emptyText}>
              Property categories will appear here when listings become
              available.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {safeCategories.map((category, index) => {
                const { id, title, count, icon, color } = category;

                return (
                  <article key={id || index} className={styles.card}>
                    <div
                      className={`${styles.iconWrapper} ${
                        styles[color || "blue"]
                      }`}
                    >
                      <span className={styles.icon} aria-hidden="true">
                        {icon}
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{title}</h3>

                    <p className={styles.cardCount}>{count}</p>
                  </article>
                );
              })}
            </div>

            <div className={styles.footer}>
              <button type="button" className={styles.viewAllButton}>
                View All Categories →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
