"use client";

import styles from "./MissionVision.module.css";
import { Target, Binoculars } from "lucide-react";

const iconMap = {
  target: Target,
  vision: Binoculars,
};

export default function MissionVision({ data = {}, loading = false }) {
  const mission = data?.mission || {};
  const vision = data?.vision || {};

  // React component variables must be PascalCase
  const MissionIcon = iconMap[mission?.icon] || Target;

  const VisionIcon = iconMap[vision?.icon] || Binoculars;

  return (
    <section className={styles.section} aria-label="Mission and Vision">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Mission Card */}
          <article className={`${styles.card} ${styles.missionCard}`}>
            <div className={`${styles.iconWrapper} ${styles.missionIcon}`}>
              <MissionIcon size={38} strokeWidth={2.2} />
            </div>

            <div className={styles.content}>
              <span className={`${styles.cardBadge} ${styles.missionBadge}`}>
                OUR MISSION
              </span>

              <h2 className={styles.cardTitle}>
                {mission?.title || "Simplify Real Estate for Everyone"}
              </h2>

              <p className={styles.cardDescription}>
                {mission?.description ||
                  "Our mission is to make property discovery, buying, and selling simple, transparent, and accessible for everyone."}
              </p>
            </div>
          </article>

          {/* Vision Card */}
          <article className={`${styles.card} ${styles.visionCard}`}>
            <div className={`${styles.iconWrapper} ${styles.visionIcon}`}>
              <VisionIcon size={38} strokeWidth={2.2} />
            </div>

            <div className={styles.content}>
              <span className={`${styles.cardBadge} ${styles.visionBadge}`}>
                OUR VISION
              </span>

              <h2 className={styles.cardTitle}>
                {vision?.title ||
                  "Building India's Most Trusted Property Platform"}
              </h2>

              <p className={styles.cardDescription}>
                {vision?.description ||
                  "Our vision is to become India's most trusted real estate ecosystem through transparency, innovation, and customer satisfaction."}
              </p>
            </div>
          </article>

          {/* Backward compatibility */}
          {!loading && !mission?.title && !vision?.title && null}
        </div>
      </div>
    </section>
  );
}
