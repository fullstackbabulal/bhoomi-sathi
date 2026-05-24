"use client";

import Link from "next/link";
import styles from "./AboutCTA.module.css";

/**
 * AboutCTA
 * -----------------------------------
 * Production-ready
 * API-driven
 * SEO optimized
 * Accessible
 * Backward compatible
 *
 * Rules:
 * - Dynamic content via props
 * - Never crashes on missing data
 * - Semantic CTA section
 */

export default function AboutCTA({ data = {}, loading = false }) {
  const {
    title = "Ready to Find Your Dream Property?",

    description = "Join thousands of satisfied buyers, sellers, and investors using Bhoomi Sathi.",

    primaryButton = {
      label: "Browse Properties",
      href: "/properties",
    },

    secondaryButton = {
      label: "Contact Us",
      href: "/contact",
    },
  } = data || {};

  return (
    <section className={styles.section} aria-label="Call to action">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* SEO: H2 */}
          <h2 className={styles.title}>{title}</h2>

          {description && <p className={styles.description}>{description}</p>}

          <div className={styles.actions}>
            {primaryButton?.href && (
              <Link
                href={primaryButton.href}
                className={styles.primaryBtn}
                aria-label={primaryButton.label}
              >
                {primaryButton.label}
              </Link>
            )}

            {secondaryButton?.href && (
              <Link
                href={secondaryButton.href}
                className={styles.secondaryBtn}
                aria-label={secondaryButton.label}
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
