"use client";

// ======================================================
// File: admin/blogs/all/LoadingBlogSkeleton.jsx
// Description: Blogs Page Loading Skeleton
// ======================================================

import styles from "./LoadingBlogSkeleton.module.css";

export default function LoadingBlogSkeleton() {
  return (
    <div className={styles.wrapper}>
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className={styles.header}>
        <div className={styles.title} />

        <div className={styles.button} />
      </div>

      {/* ==========================================
          STATS
      ========================================== */}

      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={styles.statCard}>
            <div className={styles.icon} />

            <div className={styles.statContent}>
              <div className={styles.statLabel} />

              <div className={styles.statValue} />
            </div>
          </div>
        ))}
      </div>

      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className={styles.filters}>
        <div className={styles.filterLarge} />

        <div className={styles.filter} />

        <div className={styles.filter} />

        <div className={styles.filter} />

        <div className={styles.filterButton} />
      </div>

      {/* ==========================================
          TABLE
      ========================================== */}

      <div className={styles.table}>
        {/* Table Header */}

        <div className={styles.tableHeader}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className={styles.headerCell} />
          ))}
        </div>

        {/* Table Rows */}

        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className={styles.tableRow}>
            <div className={styles.thumbnail} />

            <div className={styles.textBlock} />

            <div className={styles.smallBlock} />

            <div className={styles.smallBlock} />

            <div className={styles.badge} />

            <div className={styles.smallBlock} />

            <div className={styles.smallBlock} />

            <div className={styles.actions} />
          </div>
        ))}
      </div>
    </div>
  );
}
