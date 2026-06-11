"use client";

// ======================================================
// File: components/property/add/PropertyStatusCard.jsx
// Description: Premium Property Status Section
// ======================================================

import { ShieldCheck, BadgeCheck, Star, Eye } from "lucide-react";

import styles from "./PropertyStatusCard.module.css";

const PropertyStatusCard = ({ formData, updateField }) => {
  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <ShieldCheck size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 07</span>

              <span className={styles.infoBadge}>Status</span>
            </div>

            <h2 className={styles.title}>Listing Status & Visibility</h2>

            <p className={styles.subtitle}>
              Configure featured, verified and visibility settings for this
              property.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* FEATURED */}
        <div className={styles.statusCard}>
          <div className={styles.statusLeft}>
            <div className={styles.statusIcon}>
              <Star size={22} />
            </div>

            <div>
              <h3 className={styles.statusTitle}>Featured Property</h3>

              <p className={styles.statusDescription}>
                Highlight this listing in premium sections and homepage.
              </p>
            </div>
          </div>

          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => updateField("isFeatured", e.target.checked)}
            />

            <span className={styles.slider} />
          </label>
        </div>

        {/* VERIFIED */}
        <div className={styles.statusCard}>
          <div className={styles.statusLeft}>
            <div className={styles.statusIcon}>
              <BadgeCheck size={22} />
            </div>

            <div>
              <h3 className={styles.statusTitle}>Verified Property</h3>

              <p className={styles.statusDescription}>
                Mark property as verified after document validation.
              </p>
            </div>
          </div>

          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={formData.isVerified}
              onChange={(e) => updateField("isVerified", e.target.checked)}
            />

            <span className={styles.slider} />
          </label>
        </div>

        {/* VISIBILITY */}
        <div className={styles.statusCard}>
          <div className={styles.statusLeft}>
            <div className={styles.statusIcon}>
              <Eye size={22} />
            </div>

            <div>
              <h3 className={styles.statusTitle}>Public Visibility</h3>

              <p className={styles.statusDescription}>
                Property becomes visible immediately after publishing.
              </p>
            </div>
          </div>

          <div className={styles.visibilityBadge}>Active</div>
        </div>
      </div>
    </section>
  );
};

export default PropertyStatusCard;
