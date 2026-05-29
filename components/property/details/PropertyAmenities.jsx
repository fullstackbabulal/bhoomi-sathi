"use client";

// ======================================================
// File: components/property/details/PropertyAmenities.jsx
// Description: Property Amenities Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// Data Source: getPropertyBySlug()
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
  ParkingCircle,
  Home,
} from "lucide-react";

export default function PropertyAmenities({ property }) {
  // ==================================================
  // SAFE PROPERTY
  // ==================================================
  const safeProperty = property || {};

  // ==================================================
  // AMENITIES
  // Backend:
  // amenities: ["Gym", "Parking"]
  // ==================================================
  const amenities = Array.isArray(safeProperty.amenities)
    ? safeProperty.amenities
    : [];

  // ==================================================
  // ICON MAP
  // ==================================================
  const iconMap = {
    security: ShieldCheck,
    "24x7 security": ShieldCheck,
    parking: ParkingCircle,
    "covered parking": Car,
    gym: Dumbbell,
    gymnasium: Dumbbell,
    garden: Trees,
    park: Trees,
    lift: Building2,
    elevator: Building2,
    power: Zap,
    "power backup": Zap,
    wifi: Wifi,
    internet: Wifi,
    cctv: Camera,
    surveillance: Camera,
    pool: Waves,
    "swimming pool": Waves,
    water: Droplets,
    clubhouse: DoorOpen,
    club: DoorOpen,
    verified: BadgeCheck,
    house: Home,
  };

  // ==================================================
  // GET ICON
  // ==================================================
  const getIcon = (amenityName) => {
    const key = amenityName?.toLowerCase().trim();

    return iconMap[key] || BadgeCheck;
  };

  // ==================================================
  // EMPTY STATE
  // ==================================================
  if (!amenities.length) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Amenities & Features</h2>

          <p className={styles.subText}>
            No amenities available for this property.
          </p>
        </div>
      </section>
    );
  }

  // ==================================================
  // RENDER
  // ==================================================
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
          const Icon = getIcon(amenity);

          return (
            <div key={`${amenity}-${index}`} className={styles.card}>
              <div className={styles.iconBox}>
                <Icon size={22} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{amenity}</h3>

                <span className={styles.available}>Available</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
