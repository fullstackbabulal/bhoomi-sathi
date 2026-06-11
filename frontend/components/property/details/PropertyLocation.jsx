"use client";

// ======================================================
// File: components/property/details/PropertyLocation.jsx
// Description: Property Location Section
// UI Match: Plot in Patna Property Details Design
// Data Source: getPropertyBySlug()
// ======================================================

import styles from "./PropertyLocation.module.css";

import {
  MapPin,
  School,
  Hospital,
  ShoppingBag,
  Train,
  Landmark,
  Navigation,
} from "lucide-react";

export default function PropertyLocation({ property = {} }) {
  // ==================================================
  // PROPERTY DATA
  // ==================================================
  const { location = {}, nearbyPlaces = [] } = property;

  const {
    address = "",
    city = "",
    state = "",
    country = "India",
    coordinates = [],
  } = location;

  // Mongo GeoJSON
  // [longitude, latitude]
  const longitude = coordinates?.[0] || 0;

  const latitude = coordinates?.[1] || 0;

  // ==================================================
  // ICON MAP
  // ==================================================
  const iconMap = {
    school: School,
    hospital: Hospital,
    mall: ShoppingBag,
    station: Train,
    landmark: Landmark,
  };

  // ==================================================
  // MAP URL
  // ==================================================
  const mapUrl =
    latitude && longitude
      ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
      : "";

  const directionUrl =
    latitude && longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
      : "#";

  // ==================================================
  // FULL ADDRESS
  // ==================================================
  const fullAddress = [address, city, state, country]
    .filter(Boolean)
    .join(", ");

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Location</h2>

        <p className={styles.subText}>
          Property address, map view and nearby places.
        </p>
      </div>

      {/* ===================== */}
      {/* Address Card */}
      {/* ===================== */}
      <div className={styles.card}>
        <div className={styles.addressRow}>
          <div className={styles.iconBox}>
            <MapPin size={22} />
          </div>

          <div>
            <h3 className={styles.cardTitle}>Property Address</h3>

            <p className={styles.address}>
              {address || "Address not available"}
            </p>

            <span className={styles.locationText}>
              {fullAddress || "Location not available"}
            </span>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* Map */}
      {/* ===================== */}
      {mapUrl && (
        <div className={styles.mapCard}>
          <div className={styles.mapHeader}>
            <div>
              <h3 className={styles.cardTitle}>Map Location</h3>

              <p className={styles.mapSubText}>Explore property surroundings</p>
            </div>

            <a
              href={directionUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.directionButton}
            >
              <Navigation size={18} />
              Get Direction
            </a>
          </div>

          <div className={styles.mapWrapper}>
            <iframe
              title="Property Location"
              src={mapUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* Nearby Places */}
      {/* ===================== */}
      {nearbyPlaces.length > 0 && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Nearby Places</h3>

          <div className={styles.grid}>
            {nearbyPlaces.map((item, index) => {
              const Icon = iconMap[item?.type] || Landmark;

              return (
                <div key={index} className={styles.placeCard}>
                  <div className={styles.placeIcon}>
                    <Icon size={20} />
                  </div>

                  <div className={styles.placeContent}>
                    <h4 className={styles.placeName}>
                      {item?.name || "Unknown Place"}
                    </h4>

                    <span className={styles.distance}>
                      {item?.distance || "N/A"} away
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
