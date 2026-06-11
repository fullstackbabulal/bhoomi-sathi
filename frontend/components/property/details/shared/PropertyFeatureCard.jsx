"use client";

// ======================================================
// File: components/property/details/shared/PropertyFeatureCard.jsx
// Description: Reusable Property Feature Card
// ======================================================

import styles from "./PropertyFeatureCard.module.css";

export default function PropertyFeatureCard({
  icon = "🏠",
  label = "Feature",
  value = "N/A",
}) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>

      <div className={styles.content}>
        <p className={styles.label}>{label}</p>

        <h4 className={styles.value}>{value}</h4>
      </div>
    </div>
  );
}
