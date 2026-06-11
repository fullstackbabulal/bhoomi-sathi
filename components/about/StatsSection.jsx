"use client";

import styles from "./StatsSection.module.css";

import { House, Users, UserRound, ShieldCheck } from "lucide-react";

const iconMap = {
  home: House,
  users: Users,
  agent: UserRound,
  verified: ShieldCheck,
};

export default function StatsSection({ data = {}, loading = false }) {
  const {
    badge = "Our Impact In Numbers",

    title = "Trusted by Thousands Across India",

    items = [],
  } = data;

  const safeItems = Array.isArray(items) ? items : [];

  const fallbackItems = [
    {
      id: 1,
      label: "Properties Listed",
      value: "10K+",
      icon: "home",
    },
    {
      id: 2,
      label: "Happy Buyers",
      value: "2K+",
      icon: "users",
    },
    {
      id: 3,
      label: "Trusted Agents",
      value: "500+",
      icon: "agent",
    },
    {
      id: 4,
      label: "Verified Listings",
      value: "100%",
      icon: "verified",
    },
  ];

  const renderItems = safeItems.length > 0 ? safeItems : fallbackItems;

  return (
    <section className={styles.section} aria-labelledby="stats-title">
      <div className={styles.container}>
        <div className={styles.statsWrapper}>
          {/* Heading */}
          <div className={styles.heading}>
            {badge ? <span className={styles.badge}>{badge}</span> : null}

            <h2 id="stats-title" className={styles.title}>
              {title}
            </h2>
          </div>

          {/* Stats */}
          <div className={styles.grid}>
            {renderItems.map((item, index) => {
              const { id, label, value, icon } = item;

              const Icon = iconMap[icon] || House;

              return (
                <article key={id || index} className={styles.card}>
                  {/* Divider */}
                  {index !== renderItems.length - 1 && (
                    <span className={styles.divider} aria-hidden="true" />
                  )}

                  <div className={styles.icon}>
                    <Icon size={34} strokeWidth={2} />
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.value}>{value}</h3>

                    <p className={styles.label}>{label}</p>
                  </div>
                </article>
              );
            })}

            {/* fallback */}
            {!renderItems.length &&
              !loading &&
              fallbackItems.map((item, index) => {
                const Icon = iconMap[item.icon] || House;

                return (
                  <article key={index} className={styles.card}>
                    <div className={styles.icon}>
                      <Icon size={34} />
                    </div>

                    <div className={styles.content}>
                      <h3 className={styles.value}>{item.value}</h3>

                      <p className={styles.label}>{item.label}</p>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
