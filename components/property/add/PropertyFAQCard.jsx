"use client";

// ======================================================
// File: components/property/add/PropertyFAQCard.jsx
// Description: Property FAQ Card
// ======================================================

import {
  CircleHelp,
  Plus,
  Trash2,
  FileQuestion,
  MessageSquare,
} from "lucide-react";

import styles from "./PropertySpecificationCard.module.css";

const PropertyFAQCard = ({ formData, updateField }) => {
  // ======================================================
  // FAQ DATA
  // ======================================================
  const faq = formData?.faq || [];

  // ======================================================
  // ADD FAQ
  // ======================================================
  const addFAQ = () => {
    updateField("faq", [
      ...faq,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  // ======================================================
  // REMOVE FAQ
  // ======================================================
  const removeFAQ = (index) => {
    updateField(
      "faq",
      faq.filter((_, i) => i !== index),
    );
  };

  // ======================================================
  // UPDATE FAQ
  // ======================================================
  const updateFAQ = (index, key, value) => {
    const updated = [...faq];

    updated[index] = {
      ...updated[index],
      [key]: value,
    };

    updateField("faq", updated);
  };

  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <CircleHelp size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 06</span>

              <span className={styles.infoBadge}>FAQ</span>
            </div>

            <h2 className={styles.title}>Property FAQ</h2>

            <p className={styles.subtitle}>
              Add frequently asked questions about the property to improve buyer
              trust, clarity and SEO.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* EMPTY STATE */}
        {!faq.length && (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No FAQ Added</h3>

            <p className={styles.emptyText}>
              Add common property questions like loan availability, RERA
              approval, possession, water supply, electricity and legal
              documents.
            </p>
          </div>
        )}

        {/* FAQ LIST */}
        {faq.map((item, index) => (
          <div key={index} className={styles.placeCard}>
            {/* HEADER */}
            <div className={styles.placeHeader}>
              <div className={styles.placeHeaderContent}>
                <span className={styles.placeBadge}>FAQ #{index + 1}</span>

                <h3 className={styles.sectionHeading}>Question & Answer</h3>

                <p className={styles.placeSubtitle}>
                  Add a frequently asked property question and answer.
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFAQ(index)}
                className={styles.removeButton}
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>

            {/* FORM */}
            <div className={styles.grid}>
              {/* QUESTION */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <FileQuestion size={16} className={styles.labelIcon} />
                  Question
                </label>

                <input
                  type="text"
                  placeholder="Is loan available?"
                  value={item.question || ""}
                  onChange={(e) => updateFAQ(index, "question", e.target.value)}
                  className={styles.input}
                />
              </div>

              {/* ANSWER */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <MessageSquare size={16} className={styles.labelIcon} />
                  Answer
                </label>

                <input
                  type="text"
                  placeholder="Yes, loan facility is available."
                  value={item.answer || ""}
                  onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
          </div>
        ))}

        {/* ACTION */}
        <div className={styles.actionRow}>
          <button type="button" onClick={addFAQ} className={styles.addButton}>
            <Plus size={18} />
            Add FAQ
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyFAQCard;
