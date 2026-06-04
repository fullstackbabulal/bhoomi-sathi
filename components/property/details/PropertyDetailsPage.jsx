"use client";

// ======================================================
// File: components/property/details/PropertyDetailsPage.jsx
// Description: Plot in Patna Property Details Page
// ======================================================

import styles from "./PropertyDetailsPage.module.css";

import Navbar from "../../layout/Navbar";

import PropertyHeader from "@/components/property/details/PropertyHeader";
import PropertyGallery from "@/components/property/details/PropertyGallery";
import PropertyTitleCard from "@/components/property/details/PropertyTitleCard";
import PropertyHighlights from "@/components/property/details/PropertyHighlights";
import PropertyOverview from "@/components/property/details/PropertyOverview";
import PropertyAmenities from "@/components/property/details/PropertyAmenities";
import PropertySpecifications from "@/components/property/details/PropertySpecifications";
import PropertyMediaTabs from "@/components/property/details/PropertyMediaTabs";
import PropertyLocation from "@/components/property/details/PropertyLocation";
import PropertyFAQ from "@/components/property/details/PropertyFAQ";
import SimilarProperties from "@/components/property/details/SimilarProperties";

import StickyInquiryCard from "@/components/property/details/StickyInquiryCard";
import PropertyContactForm from "@/components/property/details/PropertyContactForm";
import LoanEligibilityCard from "@/components/property/details/LoanEligibilityCard";
import PropertyAgentCard from "@/components/property/details/PropertyAgentCard";
import PropertyTrustCard from "@/components/property/details/PropertyTrustCard";

import PropertyBottomCTA from "@/components/property/details/PropertyBottomCTA";

const PropertyDetailsPage = ({ property }) => {
  // ======================================================
  // SIMILAR PROPERTIES
  // ======================================================
  const similarProperties = property?.similarProperties || [];

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}
      <PropertyHeader property={property} />

      {/* ====================================== */}
      {/* Main Layout */}
      {/* ====================================== */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* ====================================== */}
          {/* Left Content */}
          {/* ====================================== */}
          <main className={styles.leftContent}>
            <PropertyGallery property={property} />

            <PropertyTitleCard property={property} />

            <PropertyHighlights property={property} />

            <PropertyOverview property={property} />

            <PropertyAmenities property={property} />

            <PropertySpecifications property={property} />

            <PropertyMediaTabs property={property} />

            <PropertyLocation property={property} />

            <PropertyFAQ property={property} />

            <SimilarProperties property={property} />
          </main>

          {/* ====================================== */}
          {/* Right Sidebar */}
          {/* ====================================== */}
          <aside className={styles.sidebar}>
            <StickyInquiryCard property={property} />
            <LoanEligibilityCard property={property} />

            {/* CONTACT FORM */}
            <PropertyContactForm property={property} />

            <PropertyAgentCard property={property} />

            <PropertyTrustCard property={property} />
          </aside>
        </div>
      </div>

      {/* ====================================== */}
      {/* Mobile Sticky Bottom CTA */}
      {/* ====================================== */}
      <PropertyBottomCTA property={property} />
    </div>
  );
};

export default PropertyDetailsPage;
