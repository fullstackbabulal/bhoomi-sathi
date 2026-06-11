"use client";

// ======================================================
// File: components/admin/blogs/PublishSettings/PublishSettings.tsx
// Description: Blog Publish Settings
// ======================================================

import {
  CalendarDays,
  FolderKanban,
  Globe,
  Settings2,
  Tag,
} from "lucide-react";

import styles from "./PublishSettings.module.css";

// ======================================================
// TYPES
// ======================================================

export interface BlogFormData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;

  category?: string;
  status?: string;
  tags?: string;
  publishDate?: string;

  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
}

type BlogField = keyof BlogFormData;

interface PublishSettingsProps {
  formData?: BlogFormData;

  categories?: string[];

  onChange?: (field: BlogField, value: string) => void;
}

// ======================================================
// COMPONENT
// ======================================================

export default function PublishSettings({
  formData = {},
  categories = [],
  onChange,
}: PublishSettingsProps) {
  // ====================================================
  // HANDLERS
  // ====================================================

  const handleChange = (field: BlogField, value: string) => {
    onChange?.(field, value);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.card}>
      {/* HEADER */}

      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Settings2 size={20} />
        </div>

        <div>
          <h3 className={styles.title}>Publish Settings</h3>

          <p className={styles.subtitle}>
            Configure publication and visibility options.
          </p>
        </div>
      </div>

      {/* BODY */}

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

            {categories.map((category) => (
              <option key={category} value={category}>
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

          <span className={styles.helperText}>Separate tags using commas.</span>
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
