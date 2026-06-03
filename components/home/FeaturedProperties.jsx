"use client";

// ======================================================
// File: components/home/FeaturedProperties.jsx
// Description: Featured Properties Section
// UI Match: Plot in Patna Target Homepage
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./FeaturedProperties.module.css";

export default function FeaturedProperties({ properties = [] }) {
  // ======================================================
  // FEATURED DATA
  // ======================================================
  const featuredProperties = Array.isArray(properties)
    ? properties.filter((property) => property?.isFeatured).slice(0, 6)
    : [];

  // ======================================================
  // FORMAT PRICE
  // ======================================================
  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  // ======================================================
  // EMPTY
  // ======================================================
  if (!featuredProperties.length) {
    return null;
  }

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headingBlock}>
            <span className={styles.badge}>Featured Properties</span>

            <h2 className={styles.title}>Featured Properties</h2>

            <p className={styles.subtitle}>
              Explore handpicked properties just for you.
            </p>
          </div>

          <Link href="/properties" className={styles.viewAllButton}>
            View All Properties →
          </Link>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {featuredProperties.map((property) => {
            const image =
              property?.thumbnail ||
              property?.images?.[0]?.url ||
              "/images/property-placeholder.jpg";

            const location = [
              property?.location?.city,

              property?.location?.state,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <article key={property?._id} className={styles.card}>
                {/* IMAGE */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={property?.title || "Property"}
                    fill
                    className={styles.image}
                    sizes="
                      (max-width:768px) 100vw,
                      (max-width:1200px) 50vw,
                      33vw
                    "
                    priority={false}
                    unoptimized
                  />

                  {/* BADGES */}
                  <div className={styles.cardBadgeWrapper}>
                    {property?.isFeatured && (
                      <span className={styles.featuredBadge}>Featured</span>
                    )}

                    {property?.isVerified && (
                      <span className={styles.verifiedBadge}>Verified</span>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className={styles.content}>
                  {/* PRICE */}
                  <h3 className={styles.price}>
                    ₹{" "}
                    {property?.price
                      ? formatPrice(property.price)
                      : "Price on request"}
                  </h3>

                  {/* TITLE */}
                  <h4 className={styles.propertyTitle}>
                    {property?.title || "Untitled Property"}
                  </h4>

                  {/* LOCATION */}
                  <p className={styles.location}>
                    📍 {location || "Location unavailable"}
                  </p>

                  {/* META */}
                  <div className={styles.meta}>
                    {!!property?.bedrooms && (
                      <span>{property.bedrooms} Beds</span>
                    )}

                    {!!property?.bathrooms && (
                      <span>{property.bathrooms} Baths</span>
                    )}

                    {!!property?.area?.value && (
                      <span>
                        {property.area.value} {property.area.unit}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/properties/${property?.slug || property?._id}`}
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
}
