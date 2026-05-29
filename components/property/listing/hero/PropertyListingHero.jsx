"use client";

// ======================================================
// File: components/property/listing/hero/PropertyListingHero.jsx
// Description: Property Listing Hero Section
// ======================================================

import styles from "./PropertyListingHero.module.css";

export default function PropertyListingHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* LEFT CONTENT */}
          <div className={styles.leftContent}>
            <span className={styles.badge}>
              Verified Properties Across India
            </span>

            <h1 className={styles.title}>
              Find Your Perfect
              <span className={styles.highlight}> Property</span>
            </h1>

            <p className={styles.description}>
              Discover verified plots, apartments, villas, houses, and
              commercial properties tailored to your needs. Trusted listings,
              transparent details, and smarter search — all in one place.
            </p>

            {/* QUICK STATS */}
            <div className={styles.statsWrapper}>
              <div className={styles.statCard}>
                <h3>10K+</h3>
                <p>Verified Listings</p>
              </div>

              <div className={styles.statCard}>
                <h3>5K+</h3>
                <p>Happy Buyers</p>
              </div>

              <div className={styles.statCard}>
                <h3>100%</h3>
                <p>Trusted Platform</p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className={styles.rightContent}>
            <div className={styles.visualWrapper}>
              <div className={styles.circleOne}></div>

              <div className={styles.circleTwo}></div>

              <div className={styles.heroCard}>
                <div className={styles.cardTop}>
                  <span className={styles.liveBadge}>Featured</span>
                </div>

                <div className={styles.cardImage}>
                  <div className={styles.imageOverlay}>
                    <h4>Premium Property Collection</h4>

                    <p>
                      Explore handpicked verified properties for investment and
                      living.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
