"use client";

// ======================================================
// File: components/property/add/PropertyFormSection.jsx
// Description: Property Form Cards Wrapper
// ======================================================

import PropertyInformationCard from "./PropertyInformationCard";
import PropertySpecificationCard from "./PropertySpecificationCard";
import PropertyLocationCard from "./PropertyLocationCard";
import PropertyMediaCard from "./PropertyMediaCard";
import PropertyAmenitiesCard from "./PropertyAmenitiesCard";
import PropertySEOCard from "./PropertySEOCard";
import PropertyStatusCard from "./PropertyStatusCard";

const PropertyFormSection = ({ formData, updateField, updateNestedField }) => {
  return (
    <div className="space-y-6">
      {/* PROPERTY INFORMATION */}
      <PropertyInformationCard formData={formData} updateField={updateField} />

      {/* PROPERTY SPECIFICATION */}
      <PropertySpecificationCard
        formData={formData}
        updateField={updateField}
        updateNestedField={updateNestedField}
      />

      {/* PROPERTY LOCATION */}
      <PropertyLocationCard
        formData={formData}
        updateNestedField={updateNestedField}
      />

      {/* PROPERTY MEDIA */}
      <PropertyMediaCard formData={formData} updateField={updateField} />

      {/* PROPERTY AMENITIES */}
      <PropertyAmenitiesCard formData={formData} updateField={updateField} />

      {/* PROPERTY SEO */}
      <PropertySEOCard
        formData={formData}
        updateNestedField={updateNestedField}
      />

      {/* PROPERTY STATUS */}
      <PropertyStatusCard formData={formData} updateField={updateField} />
    </div>
  );
};

export default PropertyFormSection;
