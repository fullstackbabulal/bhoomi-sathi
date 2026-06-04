"use client";

// ======================================================
// File: components/property/listing/section/
// PropertyListingSection.jsx
// Description: Reusable Property Listing Section
// ======================================================

import Link from "next/link";

import PropertyListingCard from "../card/PropertyListingCard";

import styles from "./PropertyListingSection.module.css";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {Array<any>} props.properties
 * @param {string} props.type
 */
export default function PropertyListingSection({
  title = "Properties",
  subtitle = "",
  properties = [],
  type = "",
}) {
  const hasProperties = Array.isArray(properties) && properties.length > 0;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.badge}>Verified Listings</span>

            <h2 className={styles.title}>{title}</h2>

            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          {/* VIEW ALL */}
          <Link
            href={type ? `/properties?type=${type}` : "/properties"}
            className={styles.viewAllButton}
          >
            View All
          </Link>
        </div>

        {/* PROPERTY GRID */}
        {hasProperties ? (
          <div className={styles.grid}>
            {properties.map((property) => (
              <PropertyListingCard key={property?._id} property={property} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏠</div>

            <h3 className={styles.emptyTitle}>No Properties Found</h3>

            <p className={styles.emptyText}>
              No listings available in this category right now. Please check
              again later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
