"use client";

// ======================================================
// File: components/home/WhyChoose.jsx
// Description: Why Choose Bhoomi Sathi
// UI Match: Compact Homepage Target Design
// ======================================================

import { ShieldCheck, BadgeCheck, LockKeyhole, Headphones } from "lucide-react";

import styles from "./WhyChoose.module.css";

// ======================================================
// FEATURES
// ======================================================

const FEATURES = [
  {
    id: "verified-listings",
    title: "Verified Listings",
    description: "All properties are verified for your safety.",
    icon: ShieldCheck,
    color: "blue",
  },

  {
    id: "trusted-agents",
    title: "Trusted Agents",
    description: "Connect with experienced and trusted agents.",
    icon: BadgeCheck,
    color: "green",
  },

  {
    id: "secure-transactions",
    title: "Secure Transactions",
    description: "We ensure safe and transparent property transactions.",
    icon: LockKeyhole,
    color: "purple",
  },

  {
    id: "expert-support",
    title: "Expert Support",
    description: "Get 24/7 support from our property experts.",
    icon: Headphones,
    color: "orange",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function WhyChoose() {
  return (
    <section className={styles.section} aria-labelledby="why-choose-heading">
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 id="why-choose-heading" className={styles.title}>
            Why Choose Bhoomi Sathi?
          </h2>
        </div>

        {/* FEATURE STRIP */}
        <div className={styles.grid}>
          {FEATURES.map(({ id, title, description, icon: Icon, color }) => (
            <article key={id} className={styles.card}>
              {/* ICON */}
              <div className={`${styles.iconWrapper} ${styles[color]}`}>
                <Icon size={22} strokeWidth={2.2} />
              </div>

              {/* CONTENT */}
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{title}</h3>

                <p className={styles.cardDescription}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
