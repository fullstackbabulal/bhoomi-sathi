"use client";

// ======================================================
// File: components/admin/blogs/PublishSettings/PublishSettings.jsx
// Description: Blog Publish Settings Card
// ======================================================

import styles from "./PublishSettings.module.css";

import {
  Settings2,
  CalendarDays,
  Tag,
  FolderKanban,
  Globe,
} from "lucide-react";

export default function PublishSettings({
  formData = {},
  categories = [],
  onChange,
}) {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <section className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Settings2 size={22} />
        </div>

        <div>
          <h2 className={styles.title}>Publish Settings</h2>

          <p className={styles.subtitle}>
            Configure publishing options and blog visibility
          </p>
        </div>
      </div>

      <div className={styles.content}>
        {/* STATUS */}
        <div className={styles.field}>
          <label className={styles.label}>
            <Globe size={16} />
            Status
          </label>

          <select
            className={styles.select}
            value={formData.status || "draft"}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="draft">Draft</option>

            <option value="published">Published</option>

            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div className={styles.field}>
          <label className={styles.label}>
            <FolderKanban size={16} />
            Category
          </label>

          <select
            className={styles.select}
            value={formData.category || ""}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* TAGS */}
        <div className={styles.field}>
          <label className={styles.label}>
            <Tag size={16} />
            Tags
          </label>

          <input
            type="text"
            className={styles.input}
            placeholder="real estate, property, investment"
            value={formData.tags || ""}
            onChange={(e) => handleChange("tags", e.target.value)}
          />

          <span className={styles.helper}>Separate tags with commas</span>
        </div>

        {/* PUBLISH DATE */}
        <div className={styles.field}>
          <label className={styles.label}>
            <CalendarDays size={16} />
            Publish Date
          </label>

          <input
            type="datetime-local"
            className={styles.input}
            value={formData.publishDate || ""}
            onChange={(e) => handleChange("publishDate", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
