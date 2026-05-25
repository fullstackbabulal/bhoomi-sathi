"use client";

import Image from "next/image";
import styles from "./WhoWeAre.module.css";

/**
 * WhoWeAre
 * -----------------------------------
 * Production-ready
 * API-driven
 * SEO optimized
 * Accessible
 * Backward compatible
 *
 * Rules:
 * - Uses dynamic props
 * - Never crashes on missing data
 * - H2 for SEO hierarchy
 * - next/image for performance
 */

export default function WhoWeAre({ data = {}, loading = false }) {
  const {
    badge = "Who We Are",

    title = "Your Trusted Real Estate Partner",

    description = "We are passionate about helping people find the right property with confidence. Bhoomi Sathi combines transparency, technology, and trust to simplify the property journey.",

    image = {
      url: "/images/about/who-we-are.png",
      alt: "Modern residential living space representing Bhoomi Sathi services",
    },

    features = [],
  } = data || {};

  return (
    <section className={styles.section} aria-label="Who We Are">
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={image?.url || "/images/about/who-we-are.png"}
            alt={image?.alt || "Who We Are"}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          {badge && <span className={styles.badge}>{badge}</span>}

          {/* SEO: H2 */}
          <h2 className={styles.title}>{title}</h2>

          {description && <p className={styles.description}>{description}</p>}

          {features?.length > 0 && (
            <ul className={styles.featureList}>
              {features.map((item, index) => (
                <li key={item?.id || index} className={styles.featureItem}>
                  <div className={styles.icon} aria-hidden="true">
                    ✓
                  </div>

                  <div>
                    <h3 className={styles.featureTitle}>{item?.title}</h3>

                    <p className={styles.featureDescription}>
                      {item?.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
