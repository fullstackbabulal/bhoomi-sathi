"use client";

// ======================================================
// File: components/property/add/PropertyNearbyPlacesCard.jsx
// Description: Premium Property Nearby Places Card
// ======================================================

import { MapPinned, Plus, Trash2, Building2, Map, Route } from "lucide-react";

import styles from "./PropertySpecificationCard.module.css";

const PLACE_TYPES = [
  { label: "School", value: "school" },
  { label: "Hospital", value: "hospital" },
  { label: "Market", value: "market" },
  { label: "Mall", value: "mall" },
  {
    label: "Railway Station",
    value: "railway_station",
  },
  { label: "Airport", value: "airport" },
  { label: "Metro", value: "metro" },
  { label: "Bus Stop", value: "bus_stop" },
  { label: "Park", value: "park" },
  { label: "Other", value: "other" },
];

const DISTANCE_UNITS = [
  {
    label: "Kilometer (km)",
    value: "km",
  },
  {
    label: "Meter (m)",
    value: "m",
  },
];

const PropertyNearbyPlacesCard = ({ formData, updateField }) => {
  // ======================================================
  // DATA
  // ======================================================
  const nearbyPlaces = formData?.nearbyPlaces || [];

  // ======================================================
  // ADD PLACE
  // ======================================================
  const addNearbyPlace = () => {
    updateField("nearbyPlaces", [
      ...nearbyPlaces,
      {
        name: "",
        type: "other",
        distance: 0,
        unit: "km",
      },
    ]);
  };

  // ======================================================
  // REMOVE PLACE
  // ======================================================
  const removeNearbyPlace = (index) => {
    updateField(
      "nearbyPlaces",
      nearbyPlaces.filter((_, i) => i !== index),
    );
  };

  // ======================================================
  // UPDATE PLACE
  // ======================================================
  const updateNearbyPlace = (index, key, value) => {
    const updated = [...nearbyPlaces];

    updated[index] = {
      ...updated[index],
      [key]: value,
    };

    updateField("nearbyPlaces", updated);
  };

  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <MapPinned size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 05</span>

              <span className={styles.infoBadge}>Nearby Places</span>
            </div>

            <h2 className={styles.title}>Nearby Places</h2>

            <p className={styles.subtitle}>
              Add schools, hospitals, metro stations, parks, malls and nearby
              facilities around the property.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* EMPTY */}
        {!nearbyPlaces.length && (
          <div className={styles.formSection}>
            <p className={styles.helperText}>
              No nearby places added yet. Add nearby schools, hospitals, metro,
              market, airport and other important landmarks to improve listing
              quality.
            </p>
          </div>
        )}

        {/* LIST */}
        {nearbyPlaces.map((place, index) => (
          <div key={index} className={styles.formSection}>
            {/* HEADER */}
            <div className={styles.placeHeader}>
              <div>
                <h3 className={styles.sectionHeading}>Place #{index + 1}</h3>

                <p className={styles.sectionDescription}>
                  Add nearby facility information and distance from property.
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeNearbyPlace(index)}
                className={styles.removeButton}
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>

            {/* GRID */}
            <div className={styles.grid}>
              {/* PLACE NAME */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <Building2 size={16} className={styles.labelIcon} />
                  Place Name
                </label>

                <input
                  type="text"
                  placeholder="Apollo Hospital"
                  value={place.name || ""}
                  onChange={(e) =>
                    updateNearbyPlace(index, "name", e.target.value)
                  }
                  className={styles.input}
                />
              </div>

              {/* TYPE */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <Map size={16} className={styles.labelIcon} />
                  Place Type
                </label>

                <select
                  value={place.type || "other"}
                  onChange={(e) =>
                    updateNearbyPlace(index, "type", e.target.value)
                  }
                  className={styles.select}
                >
                  {PLACE_TYPES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* DISTANCE */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <Route size={16} className={styles.labelIcon} />
                  Distance
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="3"
                  value={place.distance ?? 0}
                  onChange={(e) =>
                    updateNearbyPlace(index, "distance", Number(e.target.value))
                  }
                  className={styles.input}
                />
              </div>

              {/* UNIT */}
              <div className={styles.field}>
                <label className={styles.label}>Unit</label>

                <select
                  value={place.unit || "km"}
                  onChange={(e) =>
                    updateNearbyPlace(index, "unit", e.target.value)
                  }
                  className={styles.select}
                >
                  {DISTANCE_UNITS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={addNearbyPlace}
          className={styles.enquiryButton}
        >
          <Plus size={18} />
          Add Nearby Place
        </button>
      </div>
    </section>
  );
};

export default PropertyNearbyPlacesCard;
