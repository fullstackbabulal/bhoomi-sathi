"use client";

// ======================================================
// File: components/property/details/PropertyTitleCard.jsx
// Description: Property Title / Price / Meta Card
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import styles from "./PropertyTitleCard.module.css";

import { MapPin, Share2, Heart, BadgeCheck, IndianRupee } from "lucide-react";

export default function PropertyTitleCard({ property = {}, onShare, onSave }) {
  const {
    propertyId = "BS123456",

    title = "Luxury 3 BHK Apartment",

    location = "Sevoke Road, Siliguri, West Bengal 734001",

    price = 8500000,

    emi = 42354,

    listingType = "For Sale",

    verified = true,

    propertyStatus = "Ready to Move",

    propertyType = "Apartment",
  } = property;

  const formattedPrice = new Intl.NumberFormat("en-IN").format(price);

  const formattedEmi = new Intl.NumberFormat("en-IN").format(emi);

  return (
    <section className={styles.card}>
      {/* ===================== */}
      {/* Top Row */}
      {/* ===================== */}
      <div className={styles.topRow}>
        <div className={styles.badges}>
          <span className={styles.saleBadge}>{listingType}</span>

          {verified && (
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
      <h1 className={styles.title}>{title}</h1>

      {/* ===================== */}
      {/* Location */}
      {/* ===================== */}
      <div className={styles.location}>
        <MapPin size={18} />

        <span>{location}</span>
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

          <p className={styles.emi}>EMI starts at ₹{formattedEmi} / month</p>
        </div>

        <div className={styles.propertyMeta}>
          <span className={styles.metaBadge}>{propertyStatus}</span>

          <span className={styles.metaBadge}>{propertyType}</span>
        </div>
      </div>

      {/* ===================== */}
      {/* Footer */}
      {/* ===================== */}
      <div className={styles.footer}>
        <span className={styles.propertyId}>
          Property ID:
          {propertyId}
        </span>
      </div>
    </section>
  );
}
