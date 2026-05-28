"use client";

// ======================================================
// File: components/property/details/PropertyOverview.jsx
// Description: Property Overview Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import styles from "./PropertyOverview.module.css";

import {
  Home,
  Sofa,
  CalendarDays,
  Compass,
  Car,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function PropertyOverview({ property = {} }) {
  const {
    description = `Experience premium living in this beautifully designed
    luxury apartment located in a prime residential area.
    Spacious interiors, modern amenities, excellent connectivity,
    and high-end finishes make this property ideal for families
    seeking comfort and convenience.`,

    propertyType = "Apartment",
    furnishing = "Semi Furnished",
    possession = "Ready to Move",
    propertyAge = "2 Years",
    facing = "East",
    parking = "1 Covered Parking",
    floor = "5th Floor of 8",

    highlights = [
      "Prime Location",
      "24x7 Security",
      "Power Backup",
      "Lift Facility",
      "Covered Parking",
      "Nearby Schools & Hospitals",
    ],
  } = property;

  const details = [
    {
      label: "Property Type",
      value: propertyType,
      icon: Home,
    },
    {
      label: "Furnishing",
      value: furnishing,
      icon: Sofa,
    },
    {
      label: "Possession",
      value: possession,
      icon: CalendarDays,
    },
    {
      label: "Facing",
      value: facing,
      icon: Compass,
    },
    {
      label: "Parking",
      value: parking,
      icon: Car,
    },
    {
      label: "Floor",
      value: floor,
      icon: Building2,
    },
  ];

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>Overview</h2>

        <p className={styles.subText}>
          Property description and detailed specifications.
        </p>
      </div>

      {/* ===================== */}
      {/* Description */}
      {/* ===================== */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>About This Property</h3>

        <p className={styles.description}>{description}</p>
      </div>

      {/* ===================== */}
      {/* Highlights */}
      {/* ===================== */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Property Highlights</h3>

        <div className={styles.highlightGrid}>
          {highlights.map((item, index) => (
            <div key={index} className={styles.highlightItem}>
              <CheckCircle2 size={18} />

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/* Property Details */}
      {/* ===================== */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Property Details</h3>

        <div className={styles.detailsGrid}>
          {details.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className={styles.detailCard}>
                <div className={styles.iconBox}>
                  <Icon size={20} />
                </div>

                <div>
                  <p className={styles.label}>{item.label}</p>

                  <h4 className={styles.value}>{item.value}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
