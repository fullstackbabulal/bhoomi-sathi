"use client";

// ======================================================
// File: components/property/details/PropertyDetailsPage.jsx
// Description: Plot in Patna Property Details Page
// ======================================================

import styles from "./PropertyDetailsPage.module.css";

import Navbar from "../../layout/Navbar";

import PropertyHeader from "./PropertyHeader";
import PropertyGallery from "./PropertyGallery";
import PropertyTitleCard from "./PropertyTitleCard";
import PropertyHighlights from "./PropertyHighlights";
import PropertyOverview from "./PropertyOverview";
import PropertyAmenities from "./PropertyAmenities";
import PropertySpecifications from "./PropertySpecifications";
import PropertyMediaTabs from "./PropertyMediaTabs";
import PropertyLocation from "./PropertyLocation";
import PropertyFAQ from "./PropertyFAQ";
import SimilarProperties from "./SimilarProperties";

import StickyInquiryCard from "./StickyInquiryCard";
import PropertyContactForm from "./PropertyContactForm";
import LoanEligibilityCard from "./LoanEligibilityCard";
import PropertyAgentCard from "./PropertyAgentCard";
import PropertyTrustCard from "./PropertyTrustCard";

import PropertyBottomCTA from "./PropertyBottomCTA";

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
