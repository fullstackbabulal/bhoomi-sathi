"use client";

// ======================================================
// File: components/property/listing/highlights/
// PropertyHighlights.jsx
// Description: Property Listing Highlights Section
// ======================================================

import styles from "./PropertyHighlights.module.css";

const highlights = [
  {
    id: 1,
    icon: "✅",
    title: "Verified Properties",
    description:
      "Every property goes through a verification process to ensure trust, transparency, and reliability.",
  },
  {
    id: 2,
    icon: "🤝",
    title: "Trusted Sellers",
    description:
      "Connect with genuine property owners, verified agents, and trusted sellers across India.",
  },
  {
    id: 3,
    icon: "🔒",
    title: "Secure Transactions",
    description:
      "Experience safer and transparent communication throughout your property journey.",
  },
  {
    id: 4,
    icon: "🎯",
    title: "Expert Support",
    description:
      "Get professional guidance from experienced real estate experts whenever needed.",
  },
];

export default function PropertyHighlights() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.badge}>Why Choose Bhoomi Sathi</span>

          <h2 className={styles.title}>Trusted Real Estate Experience</h2>

          <p className={styles.subtitle}>
            Explore verified properties with complete transparency, trusted
            sellers, secure transactions, and dedicated support — all in one
            platform.
          </p>
        </div>

        {/* HIGHLIGHTS GRID */}
        <div className={styles.grid}>
          {highlights.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.iconBox}>
                <span className={styles.icon}>{item.icon}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>

              <p className={styles.cardDescription}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
