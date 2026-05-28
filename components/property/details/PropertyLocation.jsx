"use client";

// ======================================================
// File: components/property/details/PropertyLocation.jsx
// Description: Property Location Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
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
  const {
    address = "Sevoke Road, Siliguri, West Bengal 734001",

    city = "Siliguri",
    state = "West Bengal",
    country = "India",

    coordinates = {
      lat: 26.7271,
      lng: 88.3953,
    },

    nearbyPlaces = [
      {
        name: "Delhi Public School",
        type: "school",
        distance: "1.5 km",
      },
      {
        name: "Neotia Hospital",
        type: "hospital",
        distance: "2 km",
      },
      {
        name: "City Centre Mall",
        type: "mall",
        distance: "2.8 km",
      },
      {
        name: "Siliguri Junction",
        type: "station",
        distance: "4 km",
      },
      {
        name: "Main Market",
        type: "landmark",
        distance: "1 km",
      },
    ],
  } = property;

  const iconMap = {
    school: School,
    hospital: Hospital,
    mall: ShoppingBag,
    station: Train,
    landmark: Landmark,
  };

  const mapUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`;

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

            <p className={styles.address}>{address}</p>

            <span className={styles.locationText}>
              {city}, {state}, {country}
            </span>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* Map */}
      {/* ===================== */}
      <div className={styles.mapCard}>
        <div className={styles.mapHeader}>
          <div>
            <h3 className={styles.cardTitle}>Map Location</h3>

            <p className={styles.mapSubText}>Explore property surroundings</p>
          </div>

          <button type="button" className={styles.directionButton}>
            <Navigation size={18} />
            Get Direction
          </button>
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

      {/* ===================== */}
      {/* Nearby Places */}
      {/* ===================== */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Nearby Places</h3>

        <div className={styles.grid}>
          {nearbyPlaces.map((item, index) => {
            const Icon = iconMap[item.type] || Landmark;

            return (
              <div key={index} className={styles.placeCard}>
                <div className={styles.placeIcon}>
                  <Icon size={20} />
                </div>

                <div className={styles.placeContent}>
                  <h4 className={styles.placeName}>{item.name}</h4>

                  <span className={styles.distance}>{item.distance} away</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
