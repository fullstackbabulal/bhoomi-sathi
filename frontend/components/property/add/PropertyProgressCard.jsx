"use client";

// ======================================================
// File: components/property/add/PropertyProgressCard.jsx
// Description: Premium Property Progress Card
// ======================================================

import { CircleCheckBig, LoaderCircle, TrendingUp } from "lucide-react";

import styles from "./PropertyProgressCard.module.css";

const PropertyProgressCard = ({ progress = 0 }) => {
  const getStatus = () => {
    if (progress >= 90) {
      return {
        label: "Ready to Publish",
        type: "success",
      };
    }

    if (progress >= 50) {
      return {
        label: "Almost Complete",
        type: "warning",
      };
    }

    return {
      label: "In Progress",
      type: "progress",
    };
  };

  const status = getStatus();

  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Form Progress</h2>

          <p className={styles.subtitle}>Track listing completion</p>
        </div>

        <div className={`${styles.statusBadge} ${styles[status.type]}`}>
          {progress >= 90 ? (
            <CircleCheckBig size={14} />
          ) : (
            <LoaderCircle size={14} className={styles.loaderIcon} />
          )}

          <span>{status.label}</span>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.body}>
        {/* PROGRESS VALUE */}
        <div className={styles.topContent}>
          <div>
            <p className={styles.completionLabel}>Completion</p>

            <h3 className={styles.progressValue}>{progress}%</h3>
          </div>

          <div className={styles.iconBox}>
            <TrendingUp size={34} />
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Listing Progress</span>

            <span className={styles.progressCount}>{progress}/100</span>
          </div>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* CHECKLIST */}
        <div className={styles.checklistCard}>
          <h4 className={styles.checklistTitle}>Publishing Checklist</h4>

          <div className={styles.checklist}>
            <ChecklistItem
              label="Property Information"
              complete={progress >= 20}
            />

            <ChecklistItem
              label="Property Location"
              complete={progress >= 40}
            />

            <ChecklistItem label="Media Uploaded" complete={progress >= 60} />

            <ChecklistItem label="SEO Optimized" complete={progress >= 80} />

            <ChecklistItem label="Ready to Publish" complete={progress >= 95} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ======================================================
// CHECKLIST ITEM
// ======================================================
const ChecklistItem = ({ label, complete }) => {
  return (
    <div className={styles.checklistItem}>
      <span className={styles.checklistLabel}>{label}</span>

      <div
        className={`${styles.checkIconWrapper} ${
          complete ? styles.checkComplete : styles.checkPending
        }`}
      >
        <CircleCheckBig size={16} />
      </div>
    </div>
  );
};

export default PropertyProgressCard;
