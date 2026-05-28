"use client";

// ======================================================
// File: components/property/details/PropertyAmenities.jsx
// Description: Property Amenities Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import styles from "./PropertyAmenities.module.css";

import {
  ShieldCheck,
  Car,
  Dumbbell,
  Trees,
  Building2,
  Zap,
  Wifi,
  Camera,
  Waves,
  Droplets,
  DoorOpen,
  BadgeCheck,
} from "lucide-react";

export default function PropertyAmenities({ property = {} }) {
  const {
    amenities = [
      {
        name: "24x7 Security",
        icon: "security",
      },
      {
        name: "Covered Parking",
        icon: "parking",
      },
      {
        name: "Gymnasium",
        icon: "gym",
      },
      {
        name: "Garden Area",
        icon: "garden",
      },
      {
        name: "Lift Facility",
        icon: "lift",
      },
      {
        name: "Power Backup",
        icon: "power",
      },
      {
        name: "WiFi Connectivity",
        icon: "wifi",
      },
      {
        name: "CCTV Surveillance",
        icon: "cctv",
      },
      {
        name: "Swimming Pool",
        icon: "pool",
      },
      {
        name: "24 Hour Water",
        icon: "water",
      },
      {
        name: "Club House",
        icon: "club",
      },
      {
        name: "Verified Property",
        icon: "verified",
      },
    ],
  } = property;

  const iconMap = {
    security: ShieldCheck,
    parking: Car,
    gym: Dumbbell,
    garden: Trees,
    lift: Building2,
    power: Zap,
    wifi: Wifi,
    cctv: Camera,
    pool: Waves,
    water: Droplets,
    club: DoorOpen,
    verified: BadgeCheck,
  };

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Amenities & Features</h2>

        <p className={styles.subText}>
          Facilities and amenities available with this property.
        </p>
      </div>

      {/* ===================== */}
      {/* Amenities Grid */}
      {/* ===================== */}
      <div className={styles.grid}>
        {amenities.map((amenity, index) => {
          const Icon = iconMap[amenity.icon] || BadgeCheck;

          return (
            <div key={index} className={styles.card}>
              <div className={styles.iconBox}>
                <Icon size={22} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{amenity.name}</h3>

                <span className={styles.available}>Available</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
