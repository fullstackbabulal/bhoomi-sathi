"use client";

// ======================================================
// File: components/property/details/PropertyOverview.jsx
// Description: Property Overview Section
// UI Match: Bhoomi Sathi Property Details Design
// Fixed: Hydration mismatch
// ======================================================

import { useEffect, useState } from "react";

import styles from "./PropertyOverview.module.css";

export default function PropertyOverview({ property = {} }) {
  // ==================================================
  // PROPERTY DATA
  // ==================================================
  const { description = "" } = property;

  // ==================================================
  // STATE
  // ==================================================
  const [expanded, setExpanded] = useState(false);

  const [mounted, setMounted] = useState(false);

  // ==================================================
  // HYDRATION FIX
  // ==================================================
  useEffect(() => {
    setMounted(true);
  }, []);

  // ==================================================
  // CONTENT
  // ==================================================
  const isLong = description.length > 2500;

  const shortContent = description.slice(0, 2500);

  const finalContent = expanded || !isLong ? description : `${shortContent}...`;

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>Overview</h2>

        <p className={styles.subText}>
          Property description and detailed information.
        </p>
      </div>

      {/* Content */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>About This Property</h3>

        {/* Hydration-safe HTML */}
        {mounted ? (
          <div
            className={styles.blogContent}
            dangerouslySetInnerHTML={{
              __html: finalContent,
            }}
          />
        ) : (
          <div className={styles.loadingText}>Loading property details...</div>
        )}

        {/* Read More */}
        {mounted && isLong && (
          <button
            type="button"
            className={styles.readMoreButton}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </section>
  );
}
