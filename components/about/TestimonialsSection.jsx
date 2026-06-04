"use client";

import Image from "next/image";
import styles from "./TestimonialsSection.module.css";

/**
 * TestimonialsSection
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
 * - H2 for section heading
 * - H3 for testimonial author
 * - next/image for performance
 */

export default function TestimonialsSection({ data = {}, loading = false }) {
  const {
    badge = "What Our Clients Say",

    title = "Real Stories from Happy Clients",

    items = [],
  } = data || {};

  return (
    <section className={styles.section} aria-label="Customer Testimonials">
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
                <div className={styles.top}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={
                        item?.image?.url ||
                        "/images/about/client-placeholder.webp"
                      }
                      alt={
                        item?.image?.alt || item?.name || "Client testimonial"
                      }
                      fill
                      quality={90}
                      sizes="96px"
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.userInfo}>
                    {/* SEO: H3 */}
                    <h3 className={styles.name}>{item?.name}</h3>

                    <p className={styles.role}>{item?.role}</p>
                  </div>
                </div>

                <div
                  className={styles.rating}
                  aria-label={`${item?.rating || 5} star rating`}
                >
                  {Array.from({
                    length: item?.rating || 5,
                  }).map((_, starIndex) => (
                    <span key={starIndex} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className={styles.comment}>
                  “{item?.comment}”
                </blockquote>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
