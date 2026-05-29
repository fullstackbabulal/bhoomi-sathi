"use client";

// ======================================================
// File: components/home/FeaturedProperties.jsx
// Description: Featured Properties Section
// ======================================================

import Link from "next/link";
import styles from "./FeaturedProperties.module.css";

// ======================================================
// COMPONENT
// ======================================================
const FeaturedProperties = ({ properties = [] }) => {
  // ==========================================
  // FILTER FEATURED PROPERTIES
  // ==========================================
  const featuredProperties = Array.isArray(properties)
    ? properties.filter((property) => property?.isFeatured)
    : [];

  // ==========================================
  // EMPTY STATE
  // ==========================================
  if (!featuredProperties.length) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.badge}>Featured Properties</span>

            <h2 className={styles.title}>Explore Premium Properties</h2>

            <p className={styles.subtitle}>
              No featured properties are available at the moment.
            </p>
          </div>

          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏡</div>

            <h3 className={styles.emptyTitle}>No Featured Properties</h3>

            <p className={styles.emptyText}>
              Featured properties will appear here once available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Featured Properties</span>

          <h2 className={styles.title}>Explore Premium Properties</h2>

          <p className={styles.subtitle}>
            Discover handpicked premium properties with modern amenities and
            prime locations.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {featuredProperties.map((property) => {
            const {
              _id,
              slug,
              title,
              type,
              price,
              bedrooms,
              bathrooms,
              area,
              location,
              images,
              thumbnail,
              isFeatured,
              isVerified,
            } = property;

            // =====================
            // IMAGE
            // =====================
            const propertyImage =
              thumbnail ||
              images?.[0]?.url ||
              "/images/property-placeholder.jpg";

            // =====================
            // LOCATION
            // =====================
            const propertyLocation = [location?.city, location?.state]
              .filter(Boolean)
              .join(", ");

            return (
              <article key={_id} className={styles.card}>
                {/* Image */}
                <div className={styles.imageWrapper}>
                  <img
                    src={propertyImage}
                    alt={title}
                    className={styles.image}
                  />

                  <div className={styles.cardBadgeWrapper}>
                    {isFeatured && (
                      <span className={styles.featuredBadge}>Featured</span>
                    )}

                    {isVerified && (
                      <span className={styles.verifiedBadge}>Verified</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <h3 className={styles.price}>
                    {price ? `₹ ${price.toLocaleString()}` : "Price on request"}
                  </h3>

                  <h4 className={styles.propertyTitle}>{title}</h4>

                  <p className={styles.location}>
                    📍 {propertyLocation || "Location unavailable"}
                  </p>

                  <div className={styles.meta}>
                    <span>🏠 {type}</span>

                    {!!bedrooms && <span>🛏 {bedrooms} Beds</span>}

                    {!!bathrooms && <span>🚿 {bathrooms} Baths</span>}

                    {!!area?.value && (
                      <span>
                        📐 {area.value} {area.unit}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/properties/${property.slug}`}
                    className={styles.ctaButton}
                  >
                    View Details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
