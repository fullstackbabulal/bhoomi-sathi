"use client";

// ======================================================
// File: components/property/details/PropertyBottomCTA.jsx
// Description: Property Bottom CTA
// UI Match: Target Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import styles from "./PropertyBottomCTA.module.css";

import { Phone, MessageCircle, CalendarDays } from "lucide-react";

export default function PropertyBottomCTA({
  property = {},
  onCall,
  onWhatsApp,
  onBookVisit,
}) {
  // ======================================================
  // AGENT SOURCE
  // ======================================================
  const agent = property?.assignedAgent || property?.postedBy || {};

  // ======================================================
  // SAFE DATA
  // ======================================================
  const propertyTitle = property?.title || "this property";

  const phone = agent?.phone?.trim() || "";

  const verified = property?.isVerified || false;

  // ======================================================
  // HANDLERS
  // ======================================================
  const handleCall = () => {
    if (!phone) return;

    if (onCall) {
      onCall(property);
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    if (!phone) return;

    if (onWhatsApp) {
      onWhatsApp(property);
      return;
    }

    const cleanedPhone = phone.replace(/\D/g, "");

    window.open(
      `https://wa.me/${cleanedPhone}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleBookVisit = () => {
    if (onBookVisit) {
      onBookVisit(property);
      return;
    }

    console.log("Book site visit:", propertyTitle);
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        {/* ===================== */}
        {/* Content */}
        {/* ===================== */}
        <div className={styles.content}>
          <h3 className={styles.heading}>Interested in this Property?</h3>

          <p className={styles.description}>
            Connect with the verified agent or owner to know pricing,
            availability, site visit details, and more.
          </p>
        </div>

        {/* ===================== */}
        {/* Actions */}
        {/* ===================== */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleCall}
            className={styles.callButton}
            disabled={!phone}
          >
            <Phone size={18} />
            Call Now
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className={styles.whatsappButton}
            disabled={!phone}
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>

          <button
            type="button"
            onClick={handleBookVisit}
            className={styles.exploreButton}
          >
            <CalendarDays size={18} />
            Book Site Visit
          </button>
        </div>
      </div>
    </section>
  );
}
