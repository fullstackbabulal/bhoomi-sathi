// ======================================================
// File: components/Landing/StickyMobileCTA/StickyMobileCTA.jsx
// Description: Mobile Sticky Action Bar
// ======================================================

"use client";

import { Phone, MessageCircle, CalendarDays } from "lucide-react";

import styles from "./StickyMobileCTA.module.css";

export default function StickyMobileCTA() {
  const handleCall = () => {
    window.location.href = "tel:+919661655534";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919661655534", "_blank", "noopener,noreferrer");
  };

  const handleSiteVisit = () => {
    const section = document.getElementById("site-visit");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* ==================================
CALL
================================== */}
      ```
      <button
        type="button"
        className={styles.call}
        onClick={handleCall}
        aria-label="Call Now"
      >
        <Phone size={18} />

        <span>Call</span>
      </button>
      {/* ==================================
      WHATSAPP
  ================================== */}
      <button
        type="button"
        className={styles.whatsapp}
        onClick={handleWhatsApp}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={18} />

        <span>WhatsApp</span>
      </button>
      {/* ==================================
      SITE VISIT
  ================================== */}
      <button
        type="button"
        className={styles.visit}
        onClick={handleSiteVisit}
        aria-label="Book Site Visit"
      >
        <CalendarDays size={18} />

        <span>Site Visit</span>
      </button>
    </div>
  );
}
