"use client";

// ======================================================
// File: components/property/add/AddProperty.jsx
// Description: Premium Add Property Layout Shell
// ======================================================

import { useMemo, useState } from "react";

import AddPropertyHeader from "./AddPropertyHeader";
import PropertyInformationCard from "./PropertyInformationCard";
import PropertySpecificationCard from "./PropertySpecificationCard";
import PropertyLocationCard from "./PropertyLocationCard";
import PropertyMediaCard from "./PropertyMediaCard";
import PropertyAmenitiesCard from "./PropertyAmenitiesCard";
import PropertySEOCard from "./PropertySEOCard";
import PropertyStatusCard from "./PropertyStatusCard";
import PropertyPreviewSidebar from "./PropertyPreviewSidebar";
import PropertyProgressCard from "./PropertyProgressCard";
import PropertyStickyFooter from "./PropertyStickyFooter";

const AddProperty = () => {
  // ======================================================
  // FORM STATE
  // ======================================================
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // BASIC INFO
    title: "",
    slug: "",
    overview: "",
    description: "",

    // PROPERTY DETAILS
    type: "plot",
    status: "available",
    price: "",
    bedrooms: 0,
    bathrooms: 0,

    area: {
      value: "",
      unit: "sqft",
    },

    // LOCATION
    location: {
      address: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      coordinates: {
        type: "Point",
        coordinates: [0, 0],
      },
    },

    // MEDIA
    thumbnail: "",
    images: [],
    videos: [],

    // FEATURES
    amenities: [],

    // SEO
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      canonicalUrl: "",
      ogImage: "",
    },

    // FLAGS
    isFeatured: false,
    isVerified: false,
  });

  // ======================================================
  // HELPERS
  // ======================================================
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedField = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const updateDeepField = (parent, child, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...prev[parent][child],
          [field]: value,
        },
      },
    }));
  };

  // ======================================================
  // PROGRESS
  // ======================================================
  const progress = useMemo(() => {
    const checks = [
      formData.title,
      formData.overview,
      formData.description,
      formData.price,
      formData.location.city,
      formData.location.address,
      formData.thumbnail,
      formData.seo.metaTitle,
      formData.seo.metaDescription,
    ];

    const completed = checks.filter(Boolean).length;

    return Math.round((completed / checks.length) * 100);
  }, [formData]);

  // ======================================================
  // SUBMIT
  // ======================================================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log("Submitting Property", formData);

      // TODO:
      // API.post("/properties", formData)

      // router.push("/admin/properties");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ============================================
          HEADER
      ============================================ */}
      <AddPropertyHeader loading={loading} onSubmit={handleSubmit} />

      {/* ============================================
          BODY
      ============================================ */}
      <div className="mx-auto max-w-[1700px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          {/* ======================================
              LEFT FORM
          ====================================== */}
          <div className="space-y-6 xl:col-span-8">
            <PropertyInformationCard
              formData={formData}
              updateField={updateField}
            />

            <PropertySpecificationCard
              formData={formData}
              updateField={updateField}
              updateNestedField={updateNestedField}
            />

            <PropertyLocationCard
              formData={formData}
              updateNestedField={updateNestedField}
              updateDeepField={updateDeepField}
            />

            <PropertyMediaCard formData={formData} updateField={updateField} />

            <PropertyAmenitiesCard
              formData={formData}
              updateField={updateField}
            />

            <PropertySEOCard
              formData={formData}
              updateNestedField={updateNestedField}
            />

            <PropertyStatusCard formData={formData} updateField={updateField} />
          </div>

          {/* ======================================
              RIGHT SIDEBAR
          ====================================== */}
          <div className="space-y-6 xl:col-span-4">
            <div className="sticky top-6 space-y-6">
              <PropertyProgressCard progress={progress} />

              <PropertyPreviewSidebar formData={formData} />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          FOOTER ACTION BAR
      ============================================ */}
      <PropertyStickyFooter
        loading={loading}
        progress={progress}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProperty;
