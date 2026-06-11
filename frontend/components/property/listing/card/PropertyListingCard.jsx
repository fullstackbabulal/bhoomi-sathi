"use client";

// ======================================================
// File: components/property/listing/card/
// PropertyListingCard.jsx
// Description: Property Listing Card
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./PropertyListingCard.module.css";

export default function PropertyListingCard({ property = {} }) {
  const {
    slug = "",
    title = "Untitled Property",
    thumbnail = "",
    price = 0,
    type = "property",
    isFeatured = false,
    isVerified = false,
    location = {},
    area = {},
  } = property;

  // ======================================================
  // FORMAT PRICE
  // ======================================================
  const formattedPrice =
    Number(price) > 0
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(price)
      : "Price on Request";

  const locationText = [location?.locality, location?.city, location?.state]
    .filter(Boolean)
    .join(", ");

  const areaText =
    area?.value && area?.unit ? `${area.value} ${area.unit}` : null;

  return (
    <article className={styles.card}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <Link href={`/properties/${slug}`} className={styles.imageLink}>
          <Image
            src={thumbnail || "/images/property/property-placeholder.webp"}
            alt={title}
            fill
            priority={false}
            className={styles.image}
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          />
        </Link>

        {/* BADGES */}
        <div className={styles.badgeWrapper}>
          {isFeatured && <span className={styles.featuredBadge}>Featured</span>}

          {isVerified && <span className={styles.verifiedBadge}>Verified</span>}
        </div>

        {/* WISHLIST */}
        <button
          type="button"
          aria-label="Wishlist"
          className={styles.wishlistButton}
        >
          ♡
        </button>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {/* TYPE */}
        <span className={styles.type}>{type}</span>

        {/* TITLE */}
        <Link href={`/properties/${slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        {/* LOCATION */}
        <p className={styles.location}>
          📍 {locationText || "Location not available"}
        </p>

        {/* INFO */}
        <div className={styles.metaWrapper}>
          {areaText && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Area</span>

              <span className={styles.metaValue}>{areaText}</span>
            </div>
          )}

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Type</span>

            <span className={styles.metaValue}>{type}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <div>
            <span className={styles.priceLabel}>Starting From</span>

            <h4 className={styles.price}>{formattedPrice}</h4>
          </div>

          <Link href={`/properties/${slug}`} className={styles.viewButton}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
