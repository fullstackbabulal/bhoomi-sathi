"use client";

// ======================================================
// File: components/property/add/PropertyInformationCard.jsx
// Description: Premium Property Information Section
// ======================================================

import { FileText, Link2, Type, AlignLeft, BadgeInfo } from "lucide-react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import styles from "./PropertyInformationCard.module.css";

const PropertyInformationCard = ({ formData, updateField }) => {
  // ======================================================
  // AUTO SLUG GENERATOR
  // ======================================================
  const handleTitleChange = (value) => {
    updateField("title", value);

    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    updateField("slug", slug);
  };

  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <FileText size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 01</span>

              <span className={styles.requiredBadge}>Required</span>
            </div>

            <h2 className={styles.title}>Property Information</h2>

            <p className={styles.subtitle}>
              Add your property details, title, description and custom listing
              URL.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* =====================================
            PROPERTY TITLE
        ===================================== */}
        <div className={styles.field}>
          <label className={styles.label}>
            <Type size={16} className={styles.labelIcon} />
            Property Title
            <span className={styles.required}>*</span>
          </label>

          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Luxury Villa in Patna with Garden"
            className={styles.input}
          />

          <p className={styles.helperText}>
            Use a descriptive SEO-friendly title.
          </p>
        </div>

        {/* =====================================
            SLUG + TYPE
        ===================================== */}
        <div className={styles.grid}>
          {/* SLUG */}
          <div className={styles.field}>
            <label className={styles.label}>
              <Link2 size={16} className={styles.labelIcon} />
              Custom URL Slug
            </label>

            <div className={styles.slugBox}>
              <span className={styles.slugPrefix}>
                bhoomisathi.com/property/
              </span>

              <input
                type="text"
                value={formData.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="luxury-villa-patna"
                className={styles.slugInput}
              />
            </div>

            <p className={styles.helperText}>
              SEO-friendly custom listing URL.
            </p>
          </div>

          {/* TYPE */}
          <div className={styles.field}>
            <label className={styles.label}>
              <BadgeInfo size={16} className={styles.labelIcon} />
              Property Type
              <span className={styles.required}>*</span>
            </label>

            <select
              value={formData.type}
              onChange={(e) => updateField("type", e.target.value)}
              className={styles.select}
            >
              <option value="plot">Plot</option>

              <option value="apartment">Apartment</option>

              <option value="house">House</option>

              <option value="villa">Villa</option>

              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>

        {/* =====================================
            OVERVIEW
        ===================================== */}
        <div className={styles.field}>
          <label className={styles.label}>
            <AlignLeft size={16} className={styles.labelIcon} />
            Overview
            <span className={styles.required}>*</span>
          </label>

          <RichTextEditor
            height={220}
            value={formData.overview}
            onChange={(value) => updateField("overview", value)}
          />

          <p className={styles.helperText}>
            Short description for cards, previews and SEO snippets.
          </p>
        </div>

        {/* =====================================
            DESCRIPTION
        ===================================== */}
        <div className={styles.field}>
          <label className={styles.label}>
            <FileText size={16} className={styles.labelIcon} />
            Full Description
            <span className={styles.required}>*</span>
          </label>

          <RichTextEditor
            height={420}
            value={formData.description}
            onChange={(value) => updateField("description", value)}
          />

          <div className={styles.footerInfo}>
            <p className={styles.helperText}>
              Detailed content improves conversions and search ranking.
            </p>

            <span className={styles.counter}>
              {formData.description.length} characters
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyInformationCard;
