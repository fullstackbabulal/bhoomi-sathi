"use client";

// ======================================================
// File: components/property/add/PropertyLocationCard.jsx
// Description: Premium Property Location Section
// ======================================================

import {
  MapPin,
  Navigation,
  Building2,
  Landmark,
  Globe,
  Hash,
  LocateFixed,
} from "lucide-react";

import styles from "./PropertyLocationCard.module.css";

const PropertyLocationCard = ({
  formData,
  updateNestedField,
  updateDeepField,
}) => {
  const location = formData?.location || {};

  const coordinates = location?.coordinates || {};

  const coordinateValues = coordinates?.coordinates || [0, 0];

  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <MapPin size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 03</span>

              <span className={styles.infoBadge}>Location</span>
            </div>

            <h2 className={styles.title}>Property Location</h2>

            <p className={styles.subtitle}>
              Add precise property address, city, pincode and map coordinates.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* ADDRESS */}
        <div className={styles.field}>
          <label className={styles.label}>
            <Navigation size={16} className={styles.labelIcon} />
            Full Address
            <span className={styles.required}>*</span>
          </label>

          <textarea
            rows={4}
            value={location.address}
            placeholder="Street address, landmark, locality"
            onChange={(e) =>
              updateNestedField("location", "address", e.target.value)
            }
            className={styles.textarea}
          />

          <p className={styles.helperText}>
            Add full address for better listing visibility.
          </p>
        </div>

        {/* CITY + STATE */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>
              <Building2 size={16} className={styles.labelIcon} />
              City
              <span className={styles.required}>*</span>
            </label>

            <input
              type="text"
              value={location.city}
              placeholder="Patna"
              onChange={(e) =>
                updateNestedField("location", "city", e.target.value)
              }
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Landmark size={16} className={styles.labelIcon} />
              State
            </label>

            <input
              type="text"
              value={location.state}
              placeholder="Bihar"
              onChange={(e) =>
                updateNestedField("location", "state", e.target.value)
              }
              className={styles.input}
            />
          </div>
        </div>

        {/* COUNTRY + PINCODE */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>
              <Globe size={16} className={styles.labelIcon} />
              Country
            </label>

            <input
              type="text"
              value={location.country}
              placeholder="India"
              onChange={(e) =>
                updateNestedField("location", "country", e.target.value)
              }
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Hash size={16} className={styles.labelIcon} />
              Pincode
            </label>

            <input
              type="text"
              value={location.pincode}
              placeholder="800001"
              onChange={(e) =>
                updateNestedField("location", "pincode", e.target.value)
              }
              className={styles.input}
            />
          </div>
        </div>

        {/* COORDINATES */}
        <div className={styles.coordinateBox}>
          <div className={styles.coordinateHeader}>
            <LocateFixed size={18} />

            <h3 className={styles.coordinateTitle}>Map Coordinates</h3>
          </div>

          <div className={styles.grid}>
            {/* LATITUDE */}
            <div className={styles.field}>
              <label className={styles.label}>Latitude</label>

              <input
                type="number"
                step="any"
                placeholder="25.5941"
                value={coordinateValues[1]}
                onChange={(e) =>
                  updateDeepField("location", "coordinates", "coordinates", [
                    coordinateValues[0],
                    Number(e.target.value),
                  ])
                }
                className={styles.input}
              />
            </div>

            {/* LONGITUDE */}
            <div className={styles.field}>
              <label className={styles.label}>Longitude</label>

              <input
                type="number"
                step="any"
                placeholder="85.1376"
                value={coordinateValues[0]}
                onChange={(e) =>
                  updateDeepField("location", "coordinates", "coordinates", [
                    Number(e.target.value),
                    coordinateValues[1],
                  ])
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyLocationCard;
