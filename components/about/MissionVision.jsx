"use client";

import styles from "./MissionVision.module.css";

/**
 * MissionVision
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
 * - H2 reserved for major section heading
 * - H3 used for mission/vision cards
 */

export default function MissionVision({ data = {}, loading = false }) {
  const {
    mission = {
      title: "Simplify Real Estate for Everyone",
      description:
        "Our mission is to make property discovery, buying, and selling simple, transparent, and accessible for everyone.",
      icon: "🎯",
    },

    vision = {
      title: "Building India's Most Trusted Property Platform",
      description:
        "Our vision is to become India's most trusted real estate ecosystem through transparency, innovation, and customer satisfaction.",
      icon: "👁️",
    },
  } = data || {};

  return (
    <section className={styles.section} aria-label="Mission and Vision">
      <div className={styles.container}>
        {/* SEO: H2 */}
        <div className={styles.heading}>
          <span className={styles.badge}>Mission & Vision</span>

          <h2 className={styles.title}>What Drives Bhoomi Sathi</h2>

          <p className={styles.description}>
            We are building a trustworthy, transparent, and technology-driven
            real estate experience for buyers, sellers, and investors.
          </p>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">
              {mission?.icon || "🎯"}
            </div>

            <div className={styles.content}>
              <span className={styles.cardBadge}>Our Mission</span>

              {/* SEO: H3 */}
              <h3 className={styles.cardTitle}>{mission?.title}</h3>

              <p className={styles.cardDescription}>{mission?.description}</p>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.icon} aria-hidden="true">
              {vision?.icon || "👁️"}
            </div>

            <div className={styles.content}>
              <span className={styles.cardBadge}>Our Vision</span>

              {/* SEO: H3 */}
              <h3 className={styles.cardTitle}>{vision?.title}</h3>

              <p className={styles.cardDescription}>{vision?.description}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
