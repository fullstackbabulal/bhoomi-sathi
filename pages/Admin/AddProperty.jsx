"use client";

// ======================================================
// File: components/property/add/AddProperty.jsx
// Description: Add Property Page
// ======================================================

import { useMemo, useState } from "react";

import styles from "@/components/property/add/AddProperty.module.css";

import AddPropertyHeader from "@/components/property/add/AddPropertyHeader";
import PropertyFormSection from "@/components/property/add/PropertyFormSection";
import PropertyPreviewSidebar from "@/components/property/add/PropertyPreviewSidebar";
import PropertyProgressCard from "@/components/property/add/PropertyProgressCard";
import PropertyStickyFooter from "@/components/property/add/PropertyStickyFooter";

import { INITIAL_PROPERTY_FORM } from "@/pages/Admin/constants.js";

const AddProperty = () => {
  // ======================================================
  // STATE
  // ======================================================
  const [formData, setFormData] = useState(INITIAL_PROPERTY_FORM);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ======================================================
  // FIELD HELPERS
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

  // ======================================================
  // FORM PROGRESS
  // ======================================================
  const progress = useMemo(() => {
    let completed = 0;
    const total = 10;

    if (formData.title) completed++;
    if (formData.description) completed++;
    if (formData.type) completed++;
    if (formData.price) completed++;

    if (formData.area?.value) completed++;

    if (formData.location?.address) completed++;

    if (formData.location?.city) completed++;

    if (formData.images?.length) completed++;

    if (formData.thumbnail) completed++;

    if (formData.overview) completed++;

    return Math.round((completed / total) * 100);
  }, [formData]);

  // ======================================================
  // SUBMIT PROPERTY
  // ======================================================
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // =====================================
      // FORM DATA
      // =====================================
      const submitData = new FormData();

      // BASIC INFO
      submitData.append("title", formData.title);

      submitData.append("slug", formData.slug);

      submitData.append("overview", formData.overview);

      submitData.append("description", formData.description);

      submitData.append("type", formData.type);

      submitData.append("status", formData.status);

      submitData.append("price", formData.price);

      submitData.append("bedrooms", formData.bedrooms);

      submitData.append("bathrooms", formData.bathrooms);

      // REQUIRED FOR MULTER
      submitData.append("entity", "property");

      // AREA
      submitData.append("area", JSON.stringify(formData.area));

      // LOCATION
      submitData.append("location", JSON.stringify(formData.location));

      // SEO
      submitData.append("seo", JSON.stringify(formData.seo));

      // VIDEOS
      submitData.append("videos", JSON.stringify(formData.videos));

      // AMENITIES
      submitData.append("amenities", JSON.stringify(formData.amenities));

      // FLAGS
      submitData.append("isFeatured", formData.isFeatured);

      submitData.append("isVerified", formData.isVerified);

      // =====================================
      // THUMBNAIL IMAGE
      // =====================================
      if (formData.thumbnail?.file) {
        submitData.append("thumbnail", formData.thumbnail.file);
      }

      // =====================================
      // GALLERY IMAGES
      // =====================================
      formData.images?.forEach((img) => {
        if (img.file) {
          submitData.append("images", img.file);
        }
      });

      console.log("Submitting Property:", formData);

      // =====================================
      // API CALL
      // =====================================
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/property`,
        {
          method: "POST",
          credentials: "include",
          body: submitData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create property");
      }

      console.log("Property Created:", data);

      alert("Property created successfully!");

      // RESET FORM
      setFormData(INITIAL_PROPERTY_FORM);
    } catch (error) {
      console.error("Property Submit Error:", error);

      alert(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full">
      {/* =====================================
          HEADER
      ===================================== */}
      <AddPropertyHeader />

      {/* =====================================
          CONTENT GRID
      ===================================== */}
      <div className={styles.contentGrid}>
        {/* LEFT SIDE */}
        <div className={styles.formSection}>
          <PropertyFormSection
            formData={formData}
            updateField={updateField}
            updateNestedField={updateNestedField}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebar}>
          <PropertyProgressCard progress={progress} />

          <PropertyPreviewSidebar formData={formData} />
        </aside>
      </div>

      {/* =====================================
          FOOTER ACTION BAR
      ===================================== */}
      <PropertyStickyFooter
        isSubmitting={isSubmitting}
        progress={progress}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default AddProperty;
