"use client";

// ======================================================
// File: components/property/details/PropertyBottomCTA.jsx
// Description: Property Bottom Call To Action
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import Link from "next/link";

import styles from "./PropertyBottomCTA.module.css";

import { Phone, MessageCircle, ArrowRight, BadgeCheck } from "lucide-react";

export default function PropertyBottomCTA({
  property = {},
  onCall,
  onWhatsApp,
}) {
  const {
    title = "Luxury 3 BHK Apartment",

    phone = "+91 9876543210",

    verified = true,
  } = property;

  const handleCall = () => {
    if (onCall) {
      onCall(property);
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp(property);
      return;
    }

    const cleanedPhone = phone.replace(/\D/g, "");

    window.open(`https://wa.me/${cleanedPhone}`, "_blank");
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        {/* ===================== */}
        {/* Content */}
        {/* ===================== */}
        <div className={styles.content}>
          <div className={styles.badgeRow}>
            {verified && (
              <span className={styles.verifiedBadge}>
                <BadgeCheck size={16} />
                Verified Property
              </span>
            )}
          </div>

          <h2 className={styles.heading}>Interested in {title}?</h2>

          <p className={styles.description}>
            Connect instantly with the property owner or verified agent to get
            pricing, schedule a visit, or ask questions.
          </p>
        </div>

        {/* ===================== */}
        {/* CTA Buttons */}
        {/* ===================== */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleCall}
            className={styles.callButton}
          >
            <Phone size={18} />
            Call Now
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className={styles.whatsappButton}
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>

          <Link href="/properties" className={styles.exploreButton}>
            Explore More
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
