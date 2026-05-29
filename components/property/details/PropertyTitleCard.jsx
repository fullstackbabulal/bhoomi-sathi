"use client";

// ======================================================
// File: components/property/details/PropertyTitleCard.jsx
// Description: Property Title / Price / Meta Card
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// Data Source: getPropertyBySlug()
// ======================================================

import styles from "./PropertyTitleCard.module.css";

import { MapPin, Share2, Heart, BadgeCheck, IndianRupee } from "lucide-react";

export default function PropertyTitleCard({ property, onShare, onSave }) {
  // ==================================================
  // SAFE PROPERTY
  // ==================================================
  const safeProperty = property || {};

  // ==================================================
  // PROPERTY DATA
  // ==================================================
  const {
    propertyId,
    title,
    location,
    price,
    emi,
    listingType,
    isVerified,
    status,
    type,
  } = safeProperty;

  // ==================================================
  // FORMAT LOCATION
  // ==================================================
  const formattedLocation = [
    location?.address,
    location?.city,
    location?.state,
    location?.country,
    location?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  // ==================================================
  // FORMATTERS
  // ==================================================
  const formattedPrice = Number(price || 0).toLocaleString("en-IN");

  const formattedEmi = Number(emi || 0).toLocaleString("en-IN");

  const formattedListingType = listingType
    ? listingType.charAt(0).toUpperCase() + listingType.slice(1)
    : "Sale";

  const formattedStatus = status
    ? status.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "Available";

  const formattedType = type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : "Property";

  // ==================================================
  // RENDER
  // ==================================================
  return (
    <section className={styles.card}>
      {/* ===================== */}
      {/* Top Row */}
      {/* ===================== */}
      <div className={styles.topRow}>
        <div className={styles.badges}>
          <span className={styles.saleBadge}>For {formattedListingType}</span>

          {isVerified && (
            <span className={styles.verifiedBadge}>
              <BadgeCheck size={14} />
              Verified
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onShare} className={styles.iconButton}>
            <Share2 size={18} />
          </button>

          <button type="button" onClick={onSave} className={styles.iconButton}>
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* ===================== */}
      {/* Title */}
      {/* ===================== */}
      <h1 className={styles.title}>{title || "Untitled Property"}</h1>

      {/* ===================== */}
      {/* Location */}
      {/* ===================== */}
      <div className={styles.location}>
        <MapPin size={18} />

        <span>{formattedLocation || "Location unavailable"}</span>
      </div>

      {/* ===================== */}
      {/* Price */}
      {/* ===================== */}
      <div className={styles.priceRow}>
        <div>
          <div className={styles.priceWrapper}>
            <IndianRupee size={28} />

            <h2 className={styles.price}>{formattedPrice}</h2>
          </div>

          {emi > 0 && (
            <p className={styles.emi}>EMI starts at ₹{formattedEmi} / month</p>
          )}
        </div>

        <div className={styles.propertyMeta}>
          <span className={styles.metaBadge}>{formattedStatus}</span>

          <span className={styles.metaBadge}>{formattedType}</span>
        </div>
      </div>

      {/* ===================== */}
      {/* Footer */}
      {/* ===================== */}
      <div className={styles.footer}>
        <span className={styles.propertyId}>
          Property ID: {propertyId || "N/A"}
        </span>
      </div>
    </section>
  );
}
