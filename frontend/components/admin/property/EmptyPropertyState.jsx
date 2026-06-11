"use client";

// ======================================================
// File: frontend/components/admin/property/EmptyPropertyState.jsx
// Description: Empty State for No Properties
// ======================================================

import Link from "next/link";
import styles from "./EmptyPropertyState.module.css";

export default function EmptyPropertyState() {
  return (
    <section className={styles.emptySection}>
      <div className={styles.card}>
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>🏠</span>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h3 className={styles.title}>No properties found</h3>

          <p className={styles.description}>
            You have not added any property listings yet. Start by creating your
            first property.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.actions}>
          <Link href="/admin/properties/add" className={styles.button}>
            + Add Property
          </Link>
        </div>
      </div>
    </section>
  );
}
