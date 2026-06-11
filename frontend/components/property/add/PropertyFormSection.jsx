"use client";

// ======================================================
// File: components/property/add/PropertyFormSection.jsx
// Description: Property Form Cards Wrapper
// ======================================================

import styles from "./PropertyFormSection.module.css";

import PropertyInformationCard from "./PropertyInformationCard";
import PropertySpecificationCard from "./PropertySpecificationCard";
import PropertyLocationCard from "./PropertyLocationCard";
import PropertyMediaCard from "./PropertyMediaCard";
import PropertyAmenitiesCard from "./PropertyAmenitiesCard";
import PropertySEOCard from "./PropertySEOCard";
import PropertyStatusCard from "./PropertyStatusCard";

const PropertyFormSection = ({
  formData,
  updateField,
  updateNestedField,
  updateDeepField,
}) => {
  return (
    <section className={styles.formSection}>
      {/* =====================================
          PROPERTY INFORMATION
      ===================================== */}
      <div className={styles.cardWrapper}>
        <PropertyInformationCard
          formData={formData}
          updateField={updateField}
        />
      </div>

      {/* =====================================
          PROPERTY SPECIFICATION
      ===================================== */}
      <div className={styles.cardWrapper}>
        <PropertySpecificationCard
          formData={formData}
          updateField={updateField}
          updateNestedField={updateNestedField}
        />
      </div>

      {/* =====================================
          PROPERTY LOCATION
      ===================================== */}
      <div className={styles.cardWrapper}>
        <PropertyLocationCard
          formData={formData}
          updateNestedField={updateNestedField}
          updateDeepField={updateDeepField}
        />
      </div>

      {/* =====================================
          PROPERTY MEDIA
      ===================================== */}
      <div className={styles.cardWrapper}>
        <PropertyMediaCard formData={formData} updateField={updateField} />
      </div>

      {/* =====================================
          PROPERTY AMENITIES
      ===================================== */}
      <div className={styles.cardWrapper}>
        <PropertyAmenitiesCard formData={formData} updateField={updateField} />
      </div>

      {/* =====================================
          PROPERTY SEO
      ===================================== */}
      <div className={styles.cardWrapper}>
        <PropertySEOCard
          formData={formData}
          updateNestedField={updateNestedField}
        />
      </div>

      {/* =====================================
          PROPERTY STATUS
      ===================================== */}
      <div className={styles.cardWrapper}>
        <PropertyStatusCard formData={formData} updateField={updateField} />
      </div>
    </section>
  );
};

export default PropertyFormSection;
