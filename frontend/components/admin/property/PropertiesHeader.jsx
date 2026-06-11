"use client";

// ======================================================
// File: frontend/components/admin/property/PropertiesHeader.jsx
// Description: Properties Page Header
// ======================================================

import Link from "next/link";
import styles from "./PropertiesHeader.module.css";

export default function PropertiesHeader() {
  return (
    <div className={styles.header}>
      {/* Left Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>Properties</h1>

        <p className={styles.subtitle}>
          Manage and monitor all your properties.
        </p>
      </div>

      {/* Right Content */}
      <div className={styles.actions}>
        <Link href="/admin/properties/add" className={styles.addButton}>
          <span className={styles.plusIcon}>+</span>
          Add Property
        </Link>
      </div>
    </div>
  );
}
