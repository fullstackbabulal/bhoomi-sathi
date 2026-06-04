"use client";

// ======================================================
// File: components/property/add/PropertyAmenitiesCard.jsx
// Description: Premium Property Amenities Section
// ======================================================

import { Sparkles, Plus, X } from "lucide-react";

import { DEFAULT_AMENITIES } from "./constants";

import styles from "./PropertyAmenitiesCard.module.css";

const PropertyAmenitiesCard = ({ formData, updateField }) => {
  // ======================================================
  // TOGGLE AMENITY
  // ======================================================
  const toggleAmenity = (amenity) => {
    const exists = formData.amenities.includes(amenity);

    if (exists) {
      updateField(
        "amenities",
        formData.amenities.filter((item) => item !== amenity),
      );
    } else {
      updateField("amenities", [...formData.amenities, amenity]);
    }
  };

  // ======================================================
  // CUSTOM AMENITY
  // ======================================================
  const addCustomAmenity = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value.trim();

    if (!value) return;

    const exists = formData.amenities.includes(value);

    if (exists) {
      e.target.value = "";
      return;
    }

    updateField("amenities", [...formData.amenities, value]);

    e.target.value = "";
  };

  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <Sparkles size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 05</span>

              <span className={styles.infoBadge}>Amenities</span>
            </div>

            <h2 className={styles.title}>Property Amenities</h2>

            <p className={styles.subtitle}>
              Select amenities that improve buyer confidence, property appeal
              and listing visibility.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* DEFAULT AMENITIES */}
        <div>
          <label className={styles.label}>Select Amenities</label>

          <div className={styles.amenitiesGrid}>
            {DEFAULT_AMENITIES.map((item, index) => {
              const Icon = item.icon;

              const active = formData.amenities.includes(item.label);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleAmenity(item.label)}
                  className={`${styles.amenityCard} ${
                    active ? styles.activeAmenity : ""
                  }`}
                >
                  <div
                    className={`${styles.iconBox} ${
                      active ? styles.activeIconBox : ""
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className={styles.amenityTitle}>{item.label}</p>

                    <p className={styles.amenitySubtitle}>Add to listing</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CUSTOM AMENITY */}
        <div>
          <label className={styles.label}>
            <Plus size={16} />
            Add Custom Amenity
          </label>

          <input
            type="text"
            placeholder="Press Enter to add custom amenity"
            onKeyDown={addCustomAmenity}
            className={styles.input}
          />

          <p className={styles.helperText}>
            Example: Rooftop Garden, Kids Play Area, EV Charging
          </p>
        </div>

        {/* SELECTED AMENITIES */}
        <div>
          <div className={styles.selectedHeader}>
            <h3 className={styles.selectedTitle}>Selected Amenities</h3>

            <span className={styles.selectedCount}>
              {formData.amenities.length} Selected
            </span>
          </div>

          {formData.amenities.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No amenities selected</p>
            </div>
          ) : (
            <div className={styles.selectedList}>
              {formData.amenities.map((amenity, index) => (
                <div key={index} className={styles.selectedItem}>
                  <span>{amenity}</span>

                  <button
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={styles.removeButton}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyAmenitiesCard;
