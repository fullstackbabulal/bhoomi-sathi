"use client";

// ======================================================
// File: components/admin/blogs/SEOSettings/SEOSettings.jsx
// Description: Blog SEO Settings Card
// ======================================================

import styles from "./SEOSettings.module.css";

import { Search, BadgeInfo, Target } from "lucide-react";

export default function SEOSettings({ formData = {}, onChange }) {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  const metaTitleLength = formData.metaTitle?.length || 0;

  const metaDescriptionLength = formData.metaDescription?.length || 0;

  return (
    <section className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Search size={22} />
        </div>

        <div>
          <h2 className={styles.title}>SEO Settings</h2>

          <p className={styles.subtitle}>
            Optimize your blog for search engines and better ranking
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className={styles.content}>
        {/* META TITLE */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="metaTitle" className={styles.label}>
              <span>Meta Title</span>

              <BadgeInfo size={16} />
            </label>

            <span
              className={`${styles.counter} ${
                metaTitleLength > 60 ? styles.danger : ""
              }`}
            >
              {metaTitleLength}/60
            </span>
          </div>

          <input
            id="metaTitle"
            type="text"
            maxLength={60}
            className={styles.input}
            placeholder="SEO optimized title..."
            value={formData.metaTitle || ""}
            onChange={(e) => handleChange("metaTitle", e.target.value)}
          />

          <span className={styles.helper}>Recommended: 50–60 characters</span>
        </div>

        {/* META DESCRIPTION */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="metaDescription" className={styles.label}>
              <span>Meta Description</span>

              <BadgeInfo size={16} />
            </label>

            <span
              className={`${styles.counter} ${
                metaDescriptionLength > 160 ? styles.danger : ""
              }`}
            >
              {metaDescriptionLength}
              /160
            </span>
          </div>

          <textarea
            id="metaDescription"
            rows={5}
            maxLength={160}
            className={styles.textarea}
            placeholder="Write a compelling meta description..."
            value={formData.metaDescription || ""}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
          />

          <span className={styles.helper}>Recommended: 140–160 characters</span>
        </div>

        {/* FOCUS KEYWORD */}
        <div className={styles.field}>
          <label htmlFor="focusKeyword" className={styles.label}>
            <span>Focus Keyword</span>

            <Target size={16} />
          </label>

          <input
            id="focusKeyword"
            type="text"
            className={styles.input}
            placeholder="Ex: Best Property Investment"
            value={formData.focusKeyword || ""}
            onChange={(e) => handleChange("focusKeyword", e.target.value)}
          />

          <span className={styles.helper}>
            Add one primary keyword for SEO targeting
          </span>
        </div>

        {/* PREVIEW */}
        <div className={styles.previewCard}>
          <span className={styles.previewTag}>Search Preview</span>

          <h4 className={styles.previewTitle}>
            {formData.metaTitle || "Your SEO Title Appears Here"}
          </h4>

          <p className={styles.previewUrl}>
            https://bhoomisathi.com/blog/
            {formData.slug || "your-blog-slug"}
          </p>

          <p className={styles.previewDescription}>
            {formData.metaDescription ||
              "Your meta description preview will appear here and help users understand your page content."}
          </p>
        </div>
      </div>
    </section>
  );
}
