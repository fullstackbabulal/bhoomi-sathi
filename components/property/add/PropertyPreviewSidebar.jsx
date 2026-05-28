"use client";

// ======================================================
// File: components/property/add/PropertyPreviewSidebar.jsx
// Description: Premium Property Preview Sidebar
// ======================================================

import {
  Eye,
  MapPin,
  BedDouble,
  Bath,
  Expand,
  BadgeCheck,
  Star,
  Home,
} from "lucide-react";

import styles from "./PropertyPreviewSidebar.module.css";

const PropertyPreviewSidebar = ({ formData }) => {
  const {
    title,
    overview,
    price,
    type,
    bedrooms,
    bathrooms,
    thumbnail,
    isFeatured,
    isVerified,
    area,
    location,
  } = formData;

  const imagePreview = thumbnail?.preview || thumbnail || "";

  return (
    <aside className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            <Eye size={22} />
          </div>

          <div>
            <h3 className={styles.title}>Live Preview</h3>

            <p className={styles.subtitle}>Real-time property card</p>
          </div>
        </div>
      </div>

      {/* =====================================
          PROPERTY CARD PREVIEW
      ===================================== */}
      <div className={styles.previewCard}>
        {/* IMAGE */}
        <div className={styles.imageWrapper}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="property preview"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>
              <Home size={42} />
              <span>Property Preview</span>
            </div>
          )}

          {/* BADGES */}
          <div className={styles.badges}>
            <span className={styles.typeBadge}>{type || "Property"}</span>

            {isFeatured && (
              <span className={styles.featuredBadge}>
                <Star size={14} />
                Featured
              </span>
            )}

            {isVerified && (
              <span className={styles.verifiedBadge}>
                <BadgeCheck size={14} />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          <h4 className={styles.propertyTitle}>
            {title || "Luxury Property Title"}
          </h4>

          <p className={styles.overview}>
            {overview ||
              "Property overview will appear here in real-time preview..."}
          </p>

          {/* LOCATION */}
          <div className={styles.location}>
            <MapPin size={16} />

            <span>
              {location?.city || "Patna"}
              {location?.state ? `, ${location.state}` : ""}
            </span>
          </div>

          {/* STATS */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <BedDouble size={16} />
              <span>{bedrooms || 0} Beds</span>
            </div>

            <div className={styles.stat}>
              <Bath size={16} />
              <span>{bathrooms || 0} Baths</span>
            </div>

            <div className={styles.stat}>
              <Expand size={16} />
              <span>
                {area?.value || 0} {area?.unit || "sqft"}
              </span>
            </div>
          </div>

          {/* PRICE */}
          <div className={styles.footer}>
            <div>
              <span className={styles.priceLabel}>Starting Price</span>

              <h3 className={styles.price}>
                ₹{price ? Number(price).toLocaleString("en-IN") : "0"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PropertyPreviewSidebar;
