"use client";

// ======================================================
// File: components/property/details/PropertyHeader.jsx
// Description: Property Details Header
// UI Match: Bhoomi Sathi Property Details Design
// ======================================================

import styles from "./PropertyHeader.module.css";

import { ArrowLeft, Share2, Heart } from "lucide-react";

export default function PropertyHeader({ property, onShare, onSave }) {
  // ==================================================
  // SAFE PROPERTY
  // ==================================================
  const safeProperty = property || {};

  const { propertyId } = safeProperty;

  // ==================================================
  // HANDLER
  // ==================================================
  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className={styles.header}>
      <div className={styles.container}>
        {/* Left */}
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          <ArrowLeft size={18} />

          <span>Back to Search Results</span>
        </button>

        {/* Right */}
        <div className={styles.rightSection}>
          <span className={styles.propertyId}>
            Property ID: {propertyId || "N/A"}
          </span>

          <button type="button" className={styles.iconButton} onClick={onShare}>
            <Share2 size={18} />

            <span>Share</span>
          </button>

          <button type="button" className={styles.iconButton} onClick={onSave}>
            <Heart size={18} />

            <span>Save</span>
          </button>
        </div>
      </div>
    </section>
  );
}
