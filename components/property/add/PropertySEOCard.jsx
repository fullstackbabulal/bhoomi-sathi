"use client";

// ======================================================
// File: components/property/add/PropertySEOCard.jsx
// Description: Premium Property SEO Section
// ======================================================

import { Search, Link2, FileText, ImageIcon, Tags, Globe } from "lucide-react";

import styles from "./PropertySEOCard.module.css";

const PropertySEOCard = ({ formData, updateNestedField }) => {
  const seo = formData?.seo || {};

  // ======================================================
  // KEYWORDS
  // ======================================================
  const handleKeywordAdd = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value.trim();

    if (!value) return;

    const exists = seo.keywords?.includes(value);

    if (exists) {
      e.target.value = "";
      return;
    }

    updateNestedField("seo", "keywords", [...(seo.keywords || []), value]);

    e.target.value = "";
  };

  const removeKeyword = (keyword) => {
    updateNestedField(
      "seo",
      "keywords",
      seo.keywords.filter((item) => item !== keyword),
    );
  };

  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <Search size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 06</span>

              <span className={styles.infoBadge}>SEO</span>
            </div>

            <h2 className={styles.title}>SEO Optimization</h2>

            <p className={styles.subtitle}>
              Improve visibility with SEO title, meta description, keywords and
              canonical URL.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* META TITLE */}
        <div className={styles.field}>
          <label className={styles.label}>
            <FileText size={16} className={styles.labelIcon} />
            Meta Title
          </label>

          <input
            type="text"
            placeholder="Luxury Villa in Patna | Bhoomi Sathi"
            value={seo.metaTitle || ""}
            onChange={(e) =>
              updateNestedField("seo", "metaTitle", e.target.value)
            }
            className={styles.input}
          />

          <p className={styles.helperText}>Recommended: 50–60 characters</p>
        </div>

        {/* META DESCRIPTION */}
        <div className={styles.field}>
          <label className={styles.label}>
            <FileText size={16} className={styles.labelIcon} />
            Meta Description
          </label>

          <textarea
            rows={5}
            placeholder="Add SEO-friendly property description"
            value={seo.metaDescription || ""}
            onChange={(e) =>
              updateNestedField("seo", "metaDescription", e.target.value)
            }
            className={styles.textarea}
          />

          <div className={styles.footerInfo}>
            <p className={styles.helperText}>Recommended: 150–160 characters</p>

            <span className={styles.counter}>
              {(seo.metaDescription || "").length} chars
            </span>
          </div>
        </div>

        {/* CANONICAL + OG IMAGE */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>
              <Globe size={16} className={styles.labelIcon} />
              Canonical URL
            </label>

            <div className={styles.inputIcon}>
              <Link2 size={18} />

              <input
                type="text"
                placeholder="https://bhoomisathi.com/property/example"
                value={seo.canonicalUrl || ""}
                onChange={(e) =>
                  updateNestedField("seo", "canonicalUrl", e.target.value)
                }
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <ImageIcon size={16} className={styles.labelIcon} />
              OG Image URL
            </label>

            <div className={styles.inputIcon}>
              <ImageIcon size={18} />

              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={seo.ogImage || ""}
                onChange={(e) =>
                  updateNestedField("seo", "ogImage", e.target.value)
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* KEYWORDS */}
        <div className={styles.field}>
          <label className={styles.label}>
            <Tags size={16} className={styles.labelIcon} />
            SEO Keywords
          </label>

          <input
            type="text"
            placeholder="Press Enter to add keyword"
            onKeyDown={handleKeywordAdd}
            className={styles.input}
          />

          <p className={styles.helperText}>
            Example: luxury villa, apartment in patna, investment property
          </p>

          <div className={styles.keywordList}>
            {seo.keywords?.map((keyword, index) => (
              <button
                key={index}
                type="button"
                className={styles.keywordChip}
                onClick={() => removeKeyword(keyword)}
              >
                <span>{keyword}</span>✕
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySEOCard;
