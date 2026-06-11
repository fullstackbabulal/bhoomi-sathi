"use client";

import styles from "./HowItWorks.module.css";

import { Search, Scale, PhoneCall, CircleCheckBig } from "lucide-react";

const iconMap = {
  search: Search,
  compare: Scale,
  contact: PhoneCall,
  check: CircleCheckBig,
};

export default function HowItWorks({ data = {}, loading = false }) {
  const { badge = "Our Process", title = "How It Works?", steps = [] } = data;

  const safeSteps = Array.isArray(steps) ? steps : [];

  const fallbackSteps = [
    {
      id: 1,
      step: "01",
      title: "Search Property",
      description: "Browse verified properties using filters and preferences.",
      icon: "search",
    },
    {
      id: 2,
      step: "02",
      title: "Compare Listings",
      description: "Compare prices, locations, and features easily.",
      icon: "compare",
    },
    {
      id: 3,
      step: "03",
      title: "Contact Seller",
      description: "Connect with sellers or agents directly.",
      icon: "contact",
    },
    {
      id: 4,
      step: "04",
      title: "Finalize Property",
      description: "Close the deal and make it yours.",
      icon: "check",
    },
  ];

  const renderSteps = safeSteps.length > 0 ? safeSteps : fallbackSteps;

  return (
    <section className={styles.section} aria-labelledby="how-it-works-title">
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          {badge ? <span className={styles.badge}>{badge}</span> : null}

          <h2 id="how-it-works-title" className={styles.title}>
            {title}
          </h2>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {renderSteps.map((stepItem, index) => {
            const { id, step, title, description, icon } = stepItem || {};

            const IconComponent = iconMap[icon] || Search;

            return (
              <article key={id || index} className={styles.card}>
                {/* Connector */}
                {index !== renderSteps.length - 1 && (
                  <span className={styles.connector} aria-hidden="true" />
                )}

                <div className={styles.cardInner}>
                  {/* Icon */}
                  <div className={styles.iconWrapper}>
                    <div className={styles.icon}>
                      <IconComponent size={30} strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.content}>
                    <span className={styles.stepNumber}>
                      {step || `0${index + 1}`}
                    </span>

                    <h3 className={styles.cardTitle}>
                      {title || "Step Title"}
                    </h3>

                    <p className={styles.cardDescription}>
                      {description || "Description unavailable."}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
