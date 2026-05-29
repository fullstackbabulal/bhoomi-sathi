"use client";

// ======================================================
// File: components/property/add/PropertyAmenityCard.jsx
// Description: Property Amenities Selection Card
// ======================================================

import styles from "./PropertyAmenityCard.module.css";

const DEFAULT_AMENITIES = [
  "Parking",
  "Lift",
  "Security",
  "Power Backup",
  "Swimming Pool",
  "Gym",
  "Garden",
  "Club House",
  "CCTV",
  "Internet / WiFi",
  "Water Supply",
  "Play Area",
  "Balcony",
  "Air Conditioning",
  "Furnished",
  "Pet Friendly",
];

export default function PropertyAmenityCard({
  formData = {},
  setFormData = () => {},
  amenities = DEFAULT_AMENITIES,
}) {
  const selectedAmenities = formData?.amenities || [];

  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity)
      : [...selectedAmenities, amenity];

    setFormData((prev) => ({
      ...prev,
      amenities: updatedAmenities,
    }));
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Property Amenities</h3>

          <p className={styles.subtitle}>
            Select the amenities available in this property
          </p>
        </div>
      </div>

      <div className={styles.amenityGrid}>
        {amenities.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity);

          return (
            <button
              key={amenity}
              type="button"
              className={`${styles.amenityButton} ${
                isSelected ? styles.active : ""
              }`}
              onClick={() => handleAmenityToggle(amenity)}
            >
              <span className={styles.checkIcon}>{isSelected ? "✓" : "+"}</span>

              <span className={styles.amenityText}>{amenity}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
