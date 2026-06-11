"use client";

// ======================================================
// File: components/property/details/PropertyHighlights.jsx
// Description: Property Highlights Section
// UI Match: Plot in Patna Property Details Design
// Styling: CSS Modules + Lucide React
// Data Source: getPropertyBySlug()
// ======================================================

import styles from "./PropertyHighlights.module.css";

import {
  BedDouble,
  Bath,
  Square,
  Home,
  BadgeIndianRupee,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

export default function PropertyHighlights({ property }) {
  // ==================================================
  // SAFE PROPERTY
  // ==================================================
  const safeProperty = property || {};

  // ==================================================
  // PROPERTY DATA
  // Matches getPropertyBySlug()
  // ==================================================
  const {
    bedrooms,
    bathrooms,
    area,
    type,
    status,
    listingType,
    isVerified,
    price,
    emi,
  } = safeProperty;

  // ==================================================
  // FORMATTERS
  // ==================================================
  const formattedType = type
    ? type.replace(/\b\w/g, (char) => char.toUpperCase())
    : "N/A";

  const formattedStatus = status
    ? status.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "N/A";

  const formattedListingType = listingType
    ? listingType.replace(/\b\w/g, (char) => char.toUpperCase())
    : "N/A";

  const formattedArea = area?.value
    ? `${area.value} ${area.unit || "sqft"}`
    : "N/A";

  const formattedPrice =
    price > 0 ? `₹${Number(price).toLocaleString("en-IN")}` : "N/A";

  const formattedEmi =
    emi > 0 ? `₹${Number(emi).toLocaleString("en-IN")}/month` : "N/A";

  // ==================================================
  // HIGHLIGHT ITEMS
  // ==================================================
  const items = [
    {
      label: "Bedrooms",
      value: bedrooms || 0,
      icon: BedDouble,
    },

    {
      label: "Bathrooms",
      value: bathrooms || 0,
      icon: Bath,
    },

    {
      label: "Area",
      value: formattedArea,
      icon: Square,
    },

    {
      label: "Property Type",
      value: formattedType,
      icon: Home,
    },

    {
      label: "Property Status",
      value: formattedStatus,
      icon: Building2,
    },

    {
      label: "Listing Type",
      value: formattedListingType,
      icon: Sparkles,
    },

    {
      label: "Price",
      value: formattedPrice,
      icon: BadgeIndianRupee,
    },

    {
      label: "EMI",
      value: formattedEmi,
      icon: BadgeIndianRupee,
    },

    {
      label: "Verification",
      value: isVerified ? "Verified" : "Not Verified",
      icon: ShieldCheck,
    },
  ];

  // ==================================================
  // RENDER
  // ==================================================
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Property Highlights</h2>

        <p className={styles.subText}>
          Quick overview of key property information and important details.
        </p>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className={styles.card}>
              <div className={styles.iconBox}>
                <Icon size={22} />
              </div>

              <div className={styles.content}>
                <p className={styles.label}>{item.label}</p>

                <h3 className={styles.value}>{item.value}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
