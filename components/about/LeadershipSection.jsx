"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LeadershipSection.module.css";

/**
 * LeadershipSection
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
 * - H3 for leadership member name
 * - next/image for performance
 */

export default function LeadershipSection({ data = {}, loading = false }) {
  const {
    badge = "Our Leadership",

    title = "Meet the People Behind Bhoomi Sathi",

    founderMessage = {},

    team = [],
  } = data || {};

  return (
    <section className={styles.section} aria-label="Leadership Team">
      <div className={styles.container}>
        <div className={styles.heading}>
          {badge && <span className={styles.badge}>{badge}</span>}

          {/* SEO: H2 */}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* Founder Section */}
        <article className={styles.founderCard}>
          <div className={styles.founderImageWrapper}>
            <Image
              src={founderMessage?.image?.url || "/images/about/founder.webp"}
              alt={founderMessage?.image?.alt || "Founder of Bhoomi Sathi"}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 40vw"
              className={styles.founderImage}
            />
          </div>

          <div className={styles.founderContent}>
            <span className={styles.founderBadge}>Founder Message</span>

            {/* SEO: H3 */}
            <h3 className={styles.founderName}>
              {founderMessage?.name || "Founder Name"}
            </h3>

            <p className={styles.designation}>
              {founderMessage?.designation || "Founder & CEO"}
            </p>

            <p className={styles.message}>
              {founderMessage?.message ||
                "We are committed to building trust, transparency, and innovation in real estate."}
            </p>
          </div>
        </article>

        {/* Leadership Team */}
        {team?.length > 0 && (
          <div className={styles.grid}>
            {team.map((member, index) => (
              <article key={member?.id || index} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={
                      member?.image?.url ||
                      "/images/about/team-placeholder.webp"
                    }
                    alt={member?.image?.alt || member?.name}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  {/* SEO: H3 */}
                  <h3 className={styles.name}>{member?.name}</h3>

                  <p className={styles.role}>{member?.designation}</p>

                  <div className={styles.socials}>
                    {member?.socialLinks?.linkedin && (
                      <Link
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${member?.name} LinkedIn`}
                      >
                        in
                      </Link>
                    )}

                    {member?.socialLinks?.twitter && (
                      <Link
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${member?.name} Twitter`}
                      >
                        X
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
