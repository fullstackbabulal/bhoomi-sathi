"use client";

// ======================================================
// File: frontend/components/admin/property/PropertyStatusBadge.jsx
// Description: Property Status Badge
// ======================================================

import styles from "./PropertyStatusBadge.module.css";

export default function PropertyStatusBadge({ status = "draft" }) {
  const normalizedStatus = status?.toLowerCase() || "draft";

  return (
    <span className={`${styles.badge} ${styles[normalizedStatus]}`}>
      {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}
    </span>
  );
}
