"use client";

import styles from "./StatsSection.module.css";

/**
 * StatsSection
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
 * - H3 for stat labels
 */

export default function StatsSection({ data = {}, loading = false }) {
  const {
    badge = "Our Impact In Numbers",

    title = "Trusted by Thousands Across India",

    items = [],
  } = data || {};

  return (
    <section className={styles.section} aria-label="Bhoomi Sathi Statistics">
      <div className={styles.container}>
        <div className={styles.heading}>
          {badge && <span className={styles.badge}>{badge}</span>}

          {/* SEO: H2 */}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {items?.length > 0 && (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <article key={item?.id || index} className={styles.card}>
                <div className={styles.icon} aria-hidden="true">
                  {getIcon(item?.icon)}
                </div>

                <div className={styles.content}>
                  <p className={styles.value}>{item?.value}</p>

                  {/* SEO: H3 */}
                  <h3 className={styles.label}>{item?.label}</h3>
                </div>
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
    case "home":
      return "🏠";

    case "users":
      return "👥";

    case "agent":
      return "🧑‍💼";

    case "verified":
      return "✅";

    default:
      return "📊";
  }
}
