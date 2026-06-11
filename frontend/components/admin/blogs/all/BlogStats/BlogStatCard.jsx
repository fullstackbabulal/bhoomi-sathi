"use client";

// ======================================================
// File: admin/blogs/all/BlogStats/BlogStatCard.jsx
// ======================================================

import styles from "./BlogStats.module.css";

export default function BlogStatCard({ title, value, description, icon }) {
  return (
    <article className={styles.statCard}>
      <div className={styles.iconWrapper}>{icon}</div>

      <div className={styles.statContent}>
        <p className={styles.statTitle}>{title}</p>

        <h3 className={styles.statValue}>{value}</h3>

        {description && <p className={styles.statDescription}>{description}</p>}
      </div>
    </article>
  );
}
