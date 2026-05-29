"use client";

// ======================================================
// File: components/property/add/AddProperty.jsx
// ======================================================

import { useMemo, useState } from "react";

import styles from "./AddProperty.module.css";

// ======================================================
// ADMIN
// ======================================================
import AdminSidebar from "@/components/admin/AdminSidebar";

// ======================================================
// PROPERTY COMPONENTS
// ======================================================
import AddPropertyHeader from "./AddPropertyHeader";
import PropertyInformationCard from "./PropertyInformationCard";
import PropertySpecificationCard from "./PropertySpecificationCard";
import PropertyLocationCard from "./PropertyLocationCard";
import PropertyNearbyPlacesCard from "./PropertyNearbyPlacesCard";
import PropertyMediaCard from "./PropertyMediaCard";
import PropertyAmenitiesCard from "./PropertyAmenitiesCard";
import PropertySEOCard from "./PropertySEOCard";
import PropertyStatusCard from "./PropertyStatusCard";
import PropertyPreviewSidebar from "./PropertyPreviewSidebar";
import PropertyProgressCard from "./PropertyProgressCard";
import PropertyStickyFooter from "./PropertyStickyFooter";

// ======================================================
// INITIAL STATE
// ======================================================
const initialFormData = {
  // BASIC
  title: "",
  slug: "",
  overview: "",
  description: "",

  // PROPERTY DETAILS
  type: "plot",
  status: "available",

  listingType: "sale",
  facing: "North",

  price: "",
  emi: "",

  bedrooms: 0,
  bathrooms: 0,

  parking: 0,
  floor: 0,
  totalFloors: 0,

  ownershipType: "freehold",
  constructionYear: "",
  possession: "",

  carpetArea: "",
  superBuiltUpArea: "",

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
  thumbnail: null,
  images: [],
  videos: [],

  // FEATURES
  amenities: [],
  nearbyPlaces: [],
  faq: [],

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
};

const AddProperty = () => {
  // ======================================================
  // STATE
  // ======================================================
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

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
      formData.location.address,
      formData.location.city,
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

      console.log("STEP 1: submitting property", formData);

      const submitData = new FormData();

      // ==============================================
      // BASIC
      // ==============================================
      submitData.append("title", formData.title);

      submitData.append("slug", formData.slug);

      submitData.append("overview", formData.overview);

      submitData.append("description", formData.description);

      // ==============================================
      // SPECIFICATION
      // ==============================================
      // ==============================================
      // SPECIFICATION
      // ==============================================
      submitData.append("type", formData.type);

      submitData.append("status", formData.status);

      submitData.append("listingType", formData.listingType || "sale");

      submitData.append("facing", formData.facing || "North");

      submitData.append("price", String(formData.price));

      submitData.append("emi", String(formData.emi || ""));

      submitData.append("bedrooms", String(formData.bedrooms));

      submitData.append("bathrooms", String(formData.bathrooms));

      submitData.append("parking", String(formData.parking || 0));

      submitData.append("floor", String(formData.floor || 0));

      submitData.append("totalFloors", String(formData.totalFloors || 0));

      submitData.append("ownershipType", formData.ownershipType || "freehold");

      submitData.append(
        "constructionYear",
        String(formData.constructionYear || ""),
      );

      submitData.append("possession", formData.possession || "");

      submitData.append("carpetArea", String(formData.carpetArea || ""));

      submitData.append(
        "superBuiltUpArea",
        String(formData.superBuiltUpArea || ""),
      );

      // ==============================================
      // JSON DATA
      // ==============================================
      submitData.append("area", JSON.stringify(formData.area));

      submitData.append("location", JSON.stringify(formData.location));

      submitData.append("amenities", JSON.stringify(formData.amenities));

      submitData.append("nearbyPlaces", JSON.stringify(formData.nearbyPlaces));

      submitData.append("faq", JSON.stringify(formData.faq));

      submitData.append("seo", JSON.stringify(formData.seo));

      // ==============================================
      // FLAGS
      // ==============================================
      submitData.append("isFeatured", String(formData.isFeatured));

      submitData.append("isVerified", String(formData.isVerified));

      // ==============================================
      // THUMBNAIL
      // ==============================================
      if (formData.thumbnail?.file) {
        console.log("Uploading thumbnail:", formData.thumbnail.file.name);

        submitData.append("thumbnail", formData.thumbnail.file);
      }

      // ==============================================
      // IMAGES
      // ==============================================
      if (formData.images?.length > 0) {
        formData.images.forEach((image) => {
          const file = image?.file || image;

          if (file instanceof File) {
            console.log("Uploading image:", file.name);

            submitData.append("images", file);
          }
        });
      }

      console.log("STEP 2: sending request");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
        {
          method: "POST",
          credentials: "include",
          body: submitData,
        },
      );

      console.log("STEP 3: response status", response.status);

      const data = await response.json();

      console.log("STEP 4: api response", data);

      // ==============================================
      // SUCCESS
      // ==============================================
      if (response.ok && data.success) {
        alert(data.message || "Property created successfully");

        console.log("SUCCESS: property created");

        setFormData(initialFormData);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        alert(data.message || "Failed to create property");

        console.error("FAILED RESPONSE:", data);
      }
    } catch (error) {
      console.error("SUBMIT ERROR:", error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <div className={styles.dashboardWrapper}>
      <AdminSidebar />

      <div className={styles.mainContent}>
        <div className={styles.pageWrapper}>
          <AddPropertyHeader loading={loading} onSubmit={handleSubmit} />

          <main className={styles.pageBody}>
            <div className={styles.pageContainer}>
              <div className={styles.contentGrid}>
                <section className={styles.formSection}>
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

                  <PropertyNearbyPlacesCard
                    formData={formData}
                    updateField={updateField}
                  />

                  <PropertyMediaCard
                    formData={formData}
                    updateField={updateField}
                  />

                  <PropertyAmenitiesCard
                    formData={formData}
                    updateField={updateField}
                  />

                  <PropertySEOCard
                    formData={formData}
                    updateNestedField={updateNestedField}
                  />

                  <PropertyStatusCard
                    formData={formData}
                    updateField={updateField}
                  />
                </section>

                <aside className={styles.sidebarSection}>
                  <div className={styles.sidebarSticky}>
                    <PropertyPreviewSidebar formData={formData} />

                    <PropertyProgressCard progress={progress} />
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>

        <PropertyStickyFooter
          loading={loading}
          progress={progress}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddProperty;
