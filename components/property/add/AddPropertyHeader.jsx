"use client";

// ======================================================
// File: components/property/add/AddPropertyHeader.jsx
// Description: Premium Add Property Header
// ======================================================

import { Eye, Save, Home, Send } from "lucide-react";

import styles from "./AddPropertyHeader.module.css";

const AddPropertyHeader = ({ loading, onSubmit }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* =====================================
            LEFT CONTENT
        ===================================== */}
        <div className={styles.leftSection}>
          <div className={styles.iconWrapper}>
            <Home size={28} />
          </div>

          <div className={styles.headingContent}>
            <h1 className={styles.title}>Add New Property</h1>

            <p className={styles.subtitle}>
              Create a premium property listing on Plot in Patna
            </p>
          </div>
        </div>

        {/* =====================================
            RIGHT ACTIONS
        ===================================== */}
        <div className={styles.actionSection}>
          {/* Save Draft */}
          <button type="button" className={styles.secondaryButton}>
            <Save size={18} />

            <span>Save Draft</span>
          </button>

          {/* Preview */}
          <button type="button" className={styles.secondaryButton}>
            <Eye size={18} />

            <span>Preview Listing</span>
          </button>

          {/* Publish */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className={styles.publishButton}
          >
            <Send size={18} />

            <span>{loading ? "Publishing..." : "Publish Property"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AddPropertyHeader;
