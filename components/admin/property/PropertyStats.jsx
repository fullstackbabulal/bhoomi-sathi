"use client";

// ======================================================
// File: frontend/components/admin/property/PropertyStats.jsx
// Description: Property Statistics Cards
// ======================================================

import styles from "./PropertyStats.module.css";

export default function PropertyStats({ stats }) {
  const statCards = [
    {
      id: 1,
      title: "Total Properties",
      value: stats?.total || 0,
      description: "All property listings",
    },

    {
      id: 2,
      title: "Published",
      value: stats?.published || 0,
      description: "Live published listings",
    },

    {
      id: 3,
      title: "Draft",
      value: stats?.draft || 0,
      description: "Saved draft listings",
    },

    {
      id: 4,
      title: "Archived",
      value: stats?.archived || 0,
      description: "Archived properties",
    },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.grid}>
        {statCards.map((card) => (
          <article key={card.id} className={styles.card}>
            <div className={styles.cardContent}>
              <span className={styles.label}>{card.title}</span>

              <h3 className={styles.value}>{card.value}</h3>

              <p className={styles.description}>{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
