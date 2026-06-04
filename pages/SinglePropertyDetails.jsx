"use client";

// ======================================================
// File: frontend/pages/SinglePropertyDetails.jsx
// Description: Single Property Details Page
// ======================================================

import styles from "./SinglePropertyDetails.module.css";

// ======================================================
// Property Details Components
// ======================================================

import PropertyDetailsPage from "../components/property/details/PropertyDetailsPage";
import PropertyGallery from "../components/property/details/PropertyGallery";
import PropertyHeader from "../components/property/details/PropertyHeader";
import PropertyTitleCard from "../components/property/details/PropertyTitleCard";
import PropertyOverview from "../components/property/details/PropertyOverview";
import PropertyHighlights from "../components/property/details/PropertyHighlights";
import PropertyAmenities from "../components/property/details/PropertyAmenities";
import PropertySpecifications from "../components/property/details/PropertySpecifications";
import PropertyMediaTabs from "../components/property/details/PropertyMediaTabs";
import PropertyLocation from "../components/property/details/PropertyLocation";
import SimilarProperties from "../components/property/details/SimilarProperties";
import PropertyFAQ from "../components/property/details/PropertyFAQ";
import PropertyBottomCTA from "../components/property/details/PropertyBottomCTA";
import StickyInquiryCard from "../components/property/details/StickyInquiryCard";
import PropertyAgentCard from "../components/property/details/PropertyAgentCard";
import LoanEligibilityCard from "../components/property/details/LoanEligibilityCard";
import PropertyContactForm from "../components/property/details/PropertyContactForm";
import PropertyTrustCard from "../components/property/details/PropertyTrustCard";

// ======================================================
// Shared Components
// ======================================================

import PropertyAmenityCard from "../components/property/shared/PropertyAmenityCard";
import PropertyBadge from "../components/property/shared/PropertyBadge";
import PropertyFeatureCard from "../components/property/shared/PropertyFeatureCard";
import PropertySectionHeader from "../components/property/shared/PropertySectionHeader";

export default function SinglePropertyDetails() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* =====================================
            Header
        ===================================== */}
        <PropertyHeader />

        {/* =====================================
            Main Layout
        ===================================== */}
        <div className={styles.layout}>
          {/* =====================================
              Left Content
          ===================================== */}
          <section className={styles.left}>
            <PropertyGallery />

            <PropertyTitleCard />

            <PropertyOverview />

            <PropertyHighlights />

            <PropertyAmenities />

            <PropertySpecifications />

            <PropertyMediaTabs />

            <PropertyLocation />

            <SimilarProperties />

            <PropertyFAQ />
          </section>

          {/* =====================================
              Right Sidebar
          ===================================== */}
          <aside className={styles.right}>
            <StickyInquiryCard />

            <LoanEligibilityCard />

            <PropertyAgentCard />

            <PropertyTrustCard />

            <PropertyContactForm />
          </aside>
        </div>

        {/* =====================================
            Shared Components Demo
            (Reusable Components)
        ===================================== */}
        <section className={styles.sharedSection}>
          <PropertySectionHeader
            title="Reusable Components"
            subtitle="Shared UI elements used across property details pages."
          />

          <div className={styles.sharedGrid}>
            <PropertyBadge label="Verified Property" variant="success" />

            <PropertyFeatureCard
              icon="🏠"
              label="Property Type"
              value="Apartment"
            />

            <PropertyAmenityCard />
          </div>
        </section>

        {/* =====================================
            Bottom CTA
        ===================================== */}
        <PropertyBottomCTA />
      </div>
    </main>
  );
}
