"use client";

// ======================================================
// File: components/property/details/shared/PropertyBadge.jsx
// Description: Reusable Property Badge Component
// ======================================================

import styles from "./PropertyBadge.module.css";

export default function PropertyBadge({
  label = "Featured",
  variant = "primary",
  size = "md",
  icon = null,
}) {
  return (
    <span
      className={`
        ${styles.badge}
        ${styles[variant] || styles.primary}
        ${styles[size] || styles.md}
      `}
    >
      {icon && <span className={styles.icon}>{icon}</span>}

      <span className={styles.text}>{label}</span>
    </span>
  );
}
