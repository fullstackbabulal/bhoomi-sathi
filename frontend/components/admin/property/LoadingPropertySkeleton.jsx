"use client";

// ======================================================
// File: frontend/components/admin/property/LoadingPropertySkeleton.jsx
// Description: Loading Skeleton for Properties Page
// ======================================================

import styles from "./LoadingPropertySkeleton.module.css";

export default function LoadingPropertySkeleton() {
  return (
    <section className={styles.section}>
      {/* Stats Skeleton */}
      <div className={styles.statsGrid}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statTitle} />

            <div className={styles.statValue} />

            <div className={styles.statDescription} />
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className={styles.filters}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.filterItem} />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className={styles.table}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className={styles.row}>
            {/* Image */}
            <div className={styles.image} />

            {/* Content */}
            <div className={styles.content}>
              <div className={styles.title} />

              <div className={styles.subtitle} />
            </div>

            {/* Meta */}
            <div className={styles.meta} />

            <div className={styles.meta} />

            <div className={styles.badge} />

            <div className={styles.meta} />

            {/* Actions */}
            <div className={styles.actions}>
              {[...Array(4)].map((_, actionIndex) => (
                <div key={actionIndex} className={styles.actionButton} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
