"use client";

// ======================================================
// File: components/property/details/PropertyHeader.jsx
// Description: Property Details Header
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import styles from "./PropertyHeader.module.css";

import {
  ArrowLeft,
  MapPin,
  Share2,
  Heart,
  BedDouble,
  Bath,
  Square,
  Car,
  Compass,
  Building2,
} from "lucide-react";

export default function PropertyHeader({ property = {}, onShare, onSave }) {
  const {
    propertyId = "BS123456",
    title = "Luxury 3 BHK Apartment",
    location = "Sevoke Road, Siliguri, West Bengal 734001",

    price = 8500000,
    emi = 42354,

    bedrooms = 3,
    bathrooms = 2,
    area = 1650,
    parking = 1,
    facing = "East",
    floor = "5th Floor out of 8",

    listingType = "For Sale",
    verified = true,
    propertyType = "Apartment",
    propertyStatus = "Ready to Move",
  } = property;

  const formattedPrice = new Intl.NumberFormat("en-IN").format(price);
  const formattedEMI = new Intl.NumberFormat("en-IN").format(emi);

  return (
    <section className={styles.header}>
      {/* ===================== */}
      {/* Top Navigation Row */}
      {/* ===================== */}
      <div className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={18} />
          <span>Back to Search Results</span>
        </button>

        <div className={styles.topRight}>
          <span className={styles.propertyId}>Property ID: {propertyId}</span>

          <button
            type="button"
            className={styles.actionButton}
            onClick={onShare}
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>

          <button
            type="button"
            className={styles.actionButton}
            onClick={onSave}
          >
            <Heart size={18} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* ===================== */}
      {/* Badges */}
      {/* ===================== */}
      <div className={styles.badges}>
        <span className={styles.saleBadge}>{listingType}</span>

        {verified && (
          <span className={styles.verifiedBadge}>Verified Property</span>
        )}
      </div>

      {/* ===================== */}
      {/* Title */}
      {/* ===================== */}
      <h1 className={styles.title}>{title}</h1>

      {/* ===================== */}
      {/* Location */}
      {/* ===================== */}
      <div className={styles.location}>
        <MapPin size={16} />

        <span>{location}</span>
      </div>

      {/* ===================== */}
      {/* Price Row */}
      {/* ===================== */}
      <div className={styles.priceSection}>
        <div className={styles.priceWrapper}>
          <h2 className={styles.price}>₹{formattedPrice}</h2>

          <span className={styles.negotiable}>Negotiable</span>
        </div>

        <p className={styles.emiText}>EMI starts at ₹{formattedEMI} / month</p>
      </div>

      {/* ===================== */}
      {/* Property Status Tags */}
      {/* ===================== */}
      <div className={styles.metaBadges}>
        <span className={styles.metaBadge}>{propertyStatus}</span>

        <span className={styles.metaBadge}>{propertyType}</span>
      </div>

      {/* ===================== */}
      {/* Stats */}
      {/* ===================== */}
      <div className={styles.statsCard}>
        <div className={styles.statItem}>
          <BedDouble size={22} />

          <div>
            <h4>{bedrooms}</h4>
            <span>Bedrooms</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <Bath size={22} />

          <div>
            <h4>{bathrooms}</h4>
            <span>Bathrooms</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <Square size={22} />

          <div>
            <h4>{area}</h4>
            <span>Sq. Ft.</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <Car size={22} />

          <div>
            <h4>{parking}</h4>
            <span>Car Parking</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <Compass size={22} />

          <div>
            <h4>{facing}</h4>
            <span>Facing</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <Building2 size={22} />

          <div>
            <h4>{floor}</h4>
            <span>Floor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
