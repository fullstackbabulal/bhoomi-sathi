"use client";

// ======================================================
// File: components/property/details/PropertySimilar.jsx
// Description: Similar Properties Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// Dynamic Data Only
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./SimilarProperties.module.css";

import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  Heart,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export default function SimilarProperties({ properties = [] }) {
  // ======================================================
  // FORMAT PRICE
  // ======================================================
  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  // ======================================================
  // NO DATA
  // ======================================================
  if (!Array.isArray(properties) || properties.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Similar Properties</h2>

          <p className={styles.subText}>
            Discover more properties similar to this one.
          </p>
        </div>

        <Link href="/properties" className={styles.viewAll}>
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* ===================== */}
      {/* Cards */}
      {/* ===================== */}
      <div className={styles.grid}>
        {properties.map((property) => {
          // ======================================================
          // SAFE VALUES
          // ======================================================
          const image =
            property?.images?.[0]?.url || "/images/property-placeholder.jpg";

          const location = [property?.location?.city, property?.location?.state]
            .filter(Boolean)
            .join(", ");

          return (
            <article key={property?._id} className={styles.card}>
              {/* ===================== */}
              {/* Image */}
              {/* ===================== */}
              <div className={styles.imageWrapper}>
                <Image
                  src={image}
                  alt={property?.title || "Property"}
                  fill
                  className={styles.image}
                  sizes="(max-width:768px) 100vw, 33vw"
                  loading="eager"
                />

                {/* ===================== */}
                {/* Badges */}
                {/* ===================== */}
                <div className={styles.badges}>
                  {property?.isFeatured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}

                  {property?.isVerified && (
                    <span className={styles.verifiedBadge}>
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  )}
                </div>

                {/* ===================== */}
                {/* Save Button */}
                {/* ===================== */}
                <button type="button" className={styles.saveButton}>
                  <Heart size={18} />
                </button>
              </div>

              {/* ===================== */}
              {/* Content */}
              {/* ===================== */}
              <div className={styles.content}>
                <h3 className={styles.title}>
                  {property?.title || "Untitled Property"}
                </h3>

                <div className={styles.location}>
                  <MapPin size={16} />

                  <span>{location || "Location unavailable"}</span>
                </div>

                <h4 className={styles.price}>
                  ₹{formatPrice(property?.price)}
                </h4>

                {/* ===================== */}
                {/* Meta */}
                {/* ===================== */}
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <BedDouble size={16} />

                    <span>{property?.bedrooms || 0} Beds</span>
                  </div>

                  <div className={styles.metaItem}>
                    <Bath size={16} />

                    <span>{property?.bathrooms || 0} Bath</span>
                  </div>

                  <div className={styles.metaItem}>
                    <Square size={16} />

                    <span>
                      {property?.area?.value || 0}{" "}
                      {property?.area?.unit || "sqft"}
                    </span>
                  </div>
                </div>

                {/* ===================== */}
                {/* CTA */}
                {/* ===================== */}
                <Link
                  href={`/properties/${property?.slug || property?._id}`}
                  className={styles.button}
                >
                  View Details
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
