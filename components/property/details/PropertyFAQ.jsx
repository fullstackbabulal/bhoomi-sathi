"use client";

// ======================================================
// File: components/property/details/PropertyFAQ.jsx
// Description: Property FAQ Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useState } from "react";

import styles from "./PropertyFAQ.module.css";

import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function PropertyFAQ({ property = {} }) {
  const {
    faqs = [
      {
        question: "Is this property RERA approved?",
        answer:
          "Yes, this property is RERA approved and all legal documents are verified.",
      },
      {
        question: "Is home loan available for this property?",
        answer:
          "Yes, major banks provide home loan support for this property subject to eligibility.",
      },
      {
        question: "What is the possession status?",
        answer:
          "The property is ready to move and immediate possession is available.",
      },
      {
        question: "Are there maintenance charges?",
        answer:
          "Yes, maintenance charges may apply depending on the society and amenities.",
      },
      {
        question: "Can I schedule a site visit?",
        answer:
          "Yes, you can contact the owner or agent and schedule a site visit anytime.",
      },
    ],
  } = property;

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <div className={styles.headingRow}>
          <HelpCircle size={26} />

          <h2 className={styles.heading}>Frequently Asked Questions</h2>
        </div>

        <p className={styles.subText}>
          Common questions buyers ask before purchasing this property.
        </p>
      </div>

      {/* ===================== */}
      {/* FAQ List */}
      {/* ===================== */}
      <div className={styles.faqList}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`${styles.card} ${isOpen ? styles.open : ""}`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className={styles.questionButton}
              >
                <span className={styles.question}>{faq.question}</span>

                {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>

              {isOpen && (
                <div className={styles.answerWrapper}>
                  <p className={styles.answer}>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
