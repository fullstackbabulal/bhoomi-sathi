"use client";

// ======================================================
// File: components/property/details/PropertyHighlights.jsx
// Description: Property Highlights Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import styles from "./PropertyHighlights.module.css";

import {
  BedDouble,
  Bath,
  Square,
  Car,
  Compass,
  Building2,
  Sofa,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function PropertyHighlights({ property = {} }) {
  const {
    highlights = {
      bedrooms: 3,
      bathrooms: 2,
      area: "1650 Sq. Ft.",
      parking: "1 Covered",
      facing: "East",
      floor: "5th of 8",
      furnishing: "Semi Furnished",
      security: "24x7 Security",
      premium: "Premium Property",
    },
  } = property;

  const items = [
    {
      label: "Bedrooms",
      value: highlights.bedrooms,
      icon: BedDouble,
    },
    {
      label: "Bathrooms",
      value: highlights.bathrooms,
      icon: Bath,
    },
    {
      label: "Area",
      value: highlights.area,
      icon: Square,
    },
    {
      label: "Parking",
      value: highlights.parking,
      icon: Car,
    },
    {
      label: "Facing",
      value: highlights.facing,
      icon: Compass,
    },
    {
      label: "Floor",
      value: highlights.floor,
      icon: Building2,
    },
    {
      label: "Furnishing",
      value: highlights.furnishing,
      icon: Sofa,
    },
    {
      label: "Security",
      value: highlights.security,
      icon: ShieldCheck,
    },
    {
      label: "Category",
      value: highlights.premium,
      icon: Sparkles,
    },
  ];

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Property Highlights</h2>

        <p className={styles.subText}>
          Quick overview of key property information and premium features.
        </p>
      </div>

      {/* ===================== */}
      {/* Highlights Grid */}
      {/* ===================== */}
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
