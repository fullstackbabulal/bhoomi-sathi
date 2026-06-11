"use client";

// ======================================================
// File: components/property/add/PropertyStickyFooter.jsx
// Description: Premium Sticky Footer Action Bar
// ======================================================

import { Save, Eye, Send, Loader2 } from "lucide-react";

import styles from "./PropertyStickyFooter.module.css";

const PropertyStickyFooter = ({
  loading = false,
  progress = 0,
  onSubmit,
  onSaveDraft,
  onPreview,
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* =====================================
            LEFT CONTENT
        ===================================== */}
        <div className={styles.leftSection}>
          <div className={styles.headingRow}>
            <h3 className={styles.title}>Property Completion</h3>

            <span className={styles.badge}>{progress}% Complete</span>
          </div>

          <p className={styles.description}>
            Complete all required information before publishing your property
            listing.
          </p>

          {/* PROGRESS BAR */}
          <div className={styles.progressWrapper}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <span className={styles.progressText}>{progress}/100</span>
          </div>
        </div>

        {/* =====================================
            ACTION BUTTONS
        ===================================== */}
        <div className={styles.actions}>
          {/* SAVE DRAFT */}
          <button
            type="button"
            onClick={onSaveDraft}
            className={styles.secondaryButton}
          >
            <Save size={18} />
            <span>Save Draft</span>
          </button>

          {/* PREVIEW */}
          <button
            type="button"
            onClick={onPreview}
            className={styles.previewButton}
          >
            <Eye size={18} />
            <span>Preview Listing</span>
          </button>

          {/* PUBLISH */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className={styles.publishButton}
          >
            {loading ? (
              <>
                <Loader2 size={18} className={styles.loader} />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Publish Property</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PropertyStickyFooter;
