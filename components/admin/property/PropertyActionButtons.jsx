"use client";

// ======================================================
// File: frontend/components/admin/property/PropertyActionButtons.jsx
// Description: Property Action Buttons
// ======================================================

import Link from "next/link";
import styles from "./PropertyActionButtons.module.css";

export default function PropertyActionButtons({
  propertyId,
  slug,
  status,
  onDelete,
  onToggleStatus,
}) {
  const isPublished = status?.toLowerCase() === "published";

  return (
    <div className={styles.actions}>
      {/* View */}
      <Link
        href={`/properties/${slug}`}
        className={`${styles.button} ${styles.view}`}
      >
        View
      </Link>

      {/* Edit */}
      <Link
        href={`/admin/properties/edit/${propertyId}`}
        className={`${styles.button} ${styles.edit}`}
      >
        Edit
      </Link>

      {/* Draft / Publish Toggle */}
      <button
        type="button"
        onClick={() => onToggleStatus(propertyId, status)}
        className={`${styles.button} ${
          isPublished ? styles.draft : styles.publish
        }`}
      >
        {isPublished ? "Draft" : "Publish"}
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(propertyId)}
        className={`${styles.button} ${styles.delete}`}
      >
        Delete
      </button>
    </div>
  );
}
