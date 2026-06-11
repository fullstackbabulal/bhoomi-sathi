"use client";

// ======================================================
// File: components/admin/blogs/BlogDetailsCard/BlogDetailsCard.jsx
// Description: Blog Details Form Card
// ======================================================

import styles from "./BlogDetailsCard.module.css";

export default function BlogDetailsCard({ formData = {}, onChange }) {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <section className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>📝</div>

        <div>
          <h2 className={styles.heading}>Blog Details</h2>

          <p className={styles.subheading}>
            Add your blog information and short description
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className={styles.form}>
        {/* TITLE */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="title" className={styles.label}>
              Blog Title
              <span className={styles.required}>*</span>
            </label>

            <span className={styles.counter}>
              {formData.title?.length || 0}
              /100
            </span>
          </div>

          <input
            id="title"
            type="text"
            maxLength={100}
            placeholder="Enter an engaging blog title"
            className={styles.input}
            value={formData.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* SLUG */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="slug" className={styles.label}>
              Slug
              <span className={styles.required}>*</span>
            </label>

            <span className={styles.counter}>
              {formData.slug?.length || 0}
              /100
            </span>
          </div>

          <input
            id="slug"
            type="text"
            maxLength={100}
            placeholder="Enter URL-friendly slug"
            className={styles.input}
            value={formData.slug || ""}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
        </div>

        {/* EXCERPT */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="excerpt" className={styles.label}>
              Excerpt
            </label>

            <span className={styles.counter}>
              {formData.excerpt?.length || 0}
              /160
            </span>
          </div>

          <textarea
            id="excerpt"
            maxLength={160}
            rows={5}
            placeholder="Write a short summary of your blog..."
            className={styles.textarea}
            value={formData.excerpt || ""}
            onChange={(e) => handleChange("excerpt", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
