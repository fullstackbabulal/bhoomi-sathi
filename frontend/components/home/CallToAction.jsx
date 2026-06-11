"use client";

import Link from "next/link";
import styles from "./CallToAction.module.css";

const CallToAction = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* LEFT SIDE */}
          <div className={styles.leftContent}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🏠</span>
            </div>

            <div className={styles.textContent}>
              <h2 className={styles.title}>
                Ready to Find Your Dream Property?
              </h2>

              <p className={styles.description}>
                Explore thousands of verified listings and find the perfect
                property for you.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.actions}>
            <Link
              href="/properties"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Browse Properties
            </Link>

            <Link
              href="/contact"
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
