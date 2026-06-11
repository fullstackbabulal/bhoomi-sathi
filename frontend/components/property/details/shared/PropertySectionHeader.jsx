"use client";

// ======================================================
// File: components/property/details/shared/PropertySectionHeader.jsx
// Description: Reusable Property Section Header
// ======================================================

import styles from "./PropertySectionHeader.module.css";

export default function PropertySectionHeader({
  title = "Section Title",
  subtitle = "",
  action = null,
  centered = false,
}) {
  return (
    <div className={`${styles.header} ${centered ? styles.centered : ""}`}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
