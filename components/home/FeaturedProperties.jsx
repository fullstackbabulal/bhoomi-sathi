"use client";

import Link from "next/link";
import styles from "./FeaturedProperties.module.css";

export default function FeaturedProperties({ properties = [] }) {
  const safeProperties = Array.isArray(properties) ? properties : [];

  const featuredProperties = safeProperties.slice(0, 6);

  const hasProperties = featuredProperties.length > 0;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headingBlock}>
            <div className={styles.badge}>Featured Listings</div>

            <h2 className={styles.title}>Featured Properties</h2>

            <p className={styles.subtitle}>
              Explore handpicked plots, flats, homes, and premium property
              listings curated for you.
            </p>
          </div>

          <Link href="/properties" className={styles.viewAllButton}>
            View All Properties →
          </Link>
        </div>

        {/* Properties */}
        {hasProperties ? (
          <div className={styles.grid}>
            {featuredProperties.map((property) => {
              const {
                _id,
                title,
                city,
                state,
                location,
                images,
                image,
                price,
                category,
                propertyType,
                bedrooms,
                bathrooms,
                area,
                isFeatured,
                verified,
              } = property;

              const propertyImage =
                Array.isArray(images) && images.length > 0
                  ? images[0]
                  : image || "/images/property-placeholder.jpg";

              const propertyName = title || propertyType || "Premium Property";

              const propertyCategory =
                category || propertyType || "Residential Property";

              const propertyLocation =
                [city, state, location].filter(Boolean).join(", ") ||
                "Location unavailable";

              return (
                <article key={_id || propertyName} className={styles.card}>
                  {/* Image */}
                  <div className={styles.imageWrapper}>
                    <img
                      src={propertyImage}
                      alt={propertyName}
                      className={styles.image}
                    />

                    <div className={styles.cardBadgeWrapper}>
                      {(isFeatured ?? true) && (
                        <span className={styles.featuredBadge}>Featured</span>
                      )}

                      {(verified ?? true) && (
                        <span className={styles.verifiedBadge}>Verified</span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.content}>
                    <h3 className={styles.price}>
                      {price ? `₹ ${price}` : "Price on request"}
                    </h3>

                    <h4 className={styles.propertyTitle}>{propertyName}</h4>

                    <p className={styles.location}>📍 {propertyLocation}</p>

                    <div className={styles.meta}>
                      <span>🏠 {propertyCategory}</span>

                      {bedrooms ? <span>🛏 {bedrooms} Beds</span> : null}

                      {bathrooms ? <span>🚿 {bathrooms} Baths</span> : null}

                      {area ? <span>📐 {area} sq.ft</span> : null}
                    </div>

                    <Link
                      href={`/properties/${_id || ""}`}
                      className={styles.ctaButton}
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏠</div>

            <h3 className={styles.emptyTitle}>No Featured Properties</h3>

            <p className={styles.emptyText}>
              Featured properties will appear here once premium listings are
              available on Bhoomi Sathi.
            </p>

            <Link href="/properties" className={styles.emptyButton}>
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
