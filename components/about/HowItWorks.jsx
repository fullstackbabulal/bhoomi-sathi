"use client";

import styles from "./HowItWorks.module.css";

/**
 * HowItWorks
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
 * - H2 for section title
 * - H3 for step title
 */

export default function HowItWorks({ data = {}, loading = false }) {
  const {
    badge = "Our Process",

    title = "How It Works?",

    steps = [],
  } = data || {};

  return (
    <section className={styles.section} aria-label="How Bhoomi Sathi Works">
      <div className={styles.container}>
        <div className={styles.heading}>
          {badge && <span className={styles.badge}>{badge}</span>}

          {/* SEO: H2 */}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {steps?.length > 0 && (
          <div className={styles.timeline}>
            {steps.map((step, index) => (
              <article key={step?.id || index} className={styles.card}>
                <div className={styles.stepTop}>
                  <div className={styles.icon} aria-hidden="true">
                    {getIcon(step?.icon)}
                  </div>

                  <span className={styles.stepNumber}>
                    {step?.step || `0${index + 1}`}
                  </span>
                </div>

                <div className={styles.content}>
                  {/* SEO: H3 */}
                  <h3 className={styles.cardTitle}>{step?.title}</h3>

                  <p className={styles.cardDescription}>{step?.description}</p>
                </div>

                {index !== steps.length - 1 && (
                  <div className={styles.connector} aria-hidden="true" />
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Icon Resolver
 * Future-ready for API values
 */
function getIcon(icon) {
  switch (icon) {
    case "search":
      return "🔍";

    case "compare":
      return "⚖️";

    case "contact":
      return "📞";

    case "check":
      return "✅";

    default:
      return "✔️";
  }
}
