"use client";

// ======================================================
// File: components/property/details/SimilarProperties.jsx
// Description: Similar Properties Section
// UI Match: Bhoomi Sathi Property Details Design
// API: /api/properties/similar/:id
// ======================================================

import { useEffect, useState } from "react";

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

export default function SimilarProperties({ property = {} }) {
  // ======================================================
  // STATE
  // ======================================================
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  // ======================================================
  // PROPERTY ID
  // ======================================================
  const propertyId = property?._id || "";

  // ======================================================
  // FORMAT PRICE
  // ======================================================
  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  // ======================================================
  // FETCH SIMILAR PROPERTIES
  // ======================================================
  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        if (!propertyId) {
          setLoading(false);
          return;
        }

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

        const response = await fetch(
          `${apiUrl}/api/properties/similar/${propertyId}`,
        );

        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message || "Failed to fetch similar properties",
          );
        }

        setProperties(data?.data || []);
      } catch (error) {
        console.error("SIMILAR PROPERTIES ERROR:", error);

        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProperties();
  }, [propertyId]);

  // ======================================================
  // LOADING
  // ======================================================
  if (loading) {
    return null;
  }

  // ======================================================
  // EMPTY STATE
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
        {properties.map((propertyItem) => {
          const image =
            propertyItem?.thumbnail ||
            propertyItem?.images?.[0]?.url ||
            "/images/property-placeholder.jpg";

          const location = [
            propertyItem?.location?.city,

            propertyItem?.location?.state,
          ]
            .filter(Boolean)
            .join(", ");

          return (
            <article key={propertyItem?._id} className={styles.card}>
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={image}
                  alt={propertyItem?.title || "Property"}
                  fill
                  className={styles.image}
                  sizes="(max-width:768px) 100vw, 33vw"
                />

                {/* Badges */}
                <div className={styles.badges}>
                  {propertyItem?.isFeatured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}

                  {propertyItem?.isVerified && (
                    <span className={styles.verifiedBadge}>
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  )}
                </div>

                {/* Save */}
                <button type="button" className={styles.saveButton}>
                  <Heart size={18} />
                </button>
              </div>

              {/* Content */}
              <div className={styles.content}>
                <h3 className={styles.title}>
                  {propertyItem?.title || "Untitled Property"}
                </h3>

                <div className={styles.location}>
                  <MapPin size={16} />

                  <span>{location || "Location unavailable"}</span>
                </div>

                <h4 className={styles.price}>
                  ₹{formatPrice(propertyItem?.price)}
                </h4>

                {/* Meta */}
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <BedDouble size={16} />

                    <span>{propertyItem?.bedrooms || 0} Beds</span>
                  </div>

                  <div className={styles.metaItem}>
                    <Bath size={16} />

                    <span>{propertyItem?.bathrooms || 0} Bath</span>
                  </div>

                  <div className={styles.metaItem}>
                    <Square size={16} />

                    <span>
                      {propertyItem?.area?.value || 0}{" "}
                      {propertyItem?.area?.unit || "sqft"}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/properties/${
                    propertyItem?.slug || propertyItem?._id
                  }`}
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
