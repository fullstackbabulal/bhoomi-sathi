"use client";

import styles from "./WhyChooseUs.module.css";

import {
  ShieldCheck,
  Users,
  Lock,
  Headphones,
  Search,
  Sparkles,
} from "lucide-react";

const iconMap = {
  shield: ShieldCheck,
  users: Users,
  lock: Lock,
  support: Headphones,
  search: Search,
  experience: Sparkles,
};

export default function WhyChooseUs({ data = {}, loading = false }) {
  const {
    badge = "Why Choose Us",
    title = "Why Thousands Trust Bhoomi Sathi?",
    items = [],
  } = data;

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section className={styles.section} aria-labelledby="why-choose-us-title">
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          {badge ? <span className={styles.badge}>{badge}</span> : null}

          <h2 id="why-choose-us-title" className={styles.title}>
            {title}
          </h2>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {safeItems.map((item, index) => {
            const { id, title, description, icon } = item || {};

            const IconComponent = iconMap[icon] || ShieldCheck;

            return (
              <article key={id || index} className={styles.card}>
                <div className={styles.icon}>
                  <IconComponent size={28} strokeWidth={2} />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>
                    {title || "Feature Title"}
                  </h3>

                  <p className={styles.cardDescription}>
                    {description || "Feature description unavailable."}
                  </p>
                </div>
              </article>
            );
          })}

          {/* Backward compatibility */}
          {!safeItems.length &&
            !loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className={styles.card}>
                <div className={styles.icon}>
                  <ShieldCheck size={28} strokeWidth={2} />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>Verified Listings</h3>

                  <p className={styles.cardDescription}>
                    Properties are verified for authenticity.
                  </p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
