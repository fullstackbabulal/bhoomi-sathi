"use client";

// ======================================================
// File: components/property/details/PropertyAgentCard.jsx
// Description: Property Agent / Owner Contact Card
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import Image from "next/image";

import styles from "./PropertyAgentCard.module.css";

import {
  BadgeCheck,
  Phone,
  MessageCircle,
  Mail,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function PropertyAgentCard({
  property = {},
  onCall,
  onWhatsApp,
  onEnquiry,
}) {
  const {
    listedBy = "Agent",

    agent = {
      name: "Rahul Sharma",
      role: "Senior Property Consultant",
      company: "Bhoomi Sathi Realty",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=400&q=80",
      phone: "+91 9876543210",
      email: "rahul@bhoomisathi.com",
      verified: true,
      responseTime: "Usually responds in 15 mins",
    },
  } = property;

  const handleCall = () => {
    if (onCall) {
      onCall(agent);
      return;
    }

    window.location.href = `tel:${agent.phone}`;
  };

  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp(agent);
      return;
    }

    const phone = agent.phone?.replace(/\D/g, "") || "";

    window.open(`https://wa.me/${phone}`, "_blank");
  };

  const handleEnquiry = () => {
    if (onEnquiry) {
      onEnquiry(agent);
    }
  };

  return (
    <aside className={styles.card}>
      {/* ===================== */}
      {/* Top */}
      {/* ===================== */}
      <div className={styles.topSection}>
        <span className={styles.listedBadge}>Listed by {listedBy}</span>

        {agent.verified && (
          <div className={styles.verified}>
            <BadgeCheck size={16} />
            Verified Agent
          </div>
        )}
      </div>

      {/* ===================== */}
      {/* Profile */}
      {/* ===================== */}
      <div className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <Image
            src={agent.image}
            alt={agent.name}
            width={90}
            height={90}
            className={styles.avatar}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{agent.name}</h3>

          <p className={styles.role}>{agent.role}</p>

          <p className={styles.company}>{agent.company}</p>
        </div>
      </div>

      {/* ===================== */}
      {/* Response */}
      {/* ===================== */}
      <div className={styles.responseCard}>
        <Clock3 size={18} />

        <span>{agent.responseTime}</span>
      </div>

      {/* ===================== */}
      {/* Buttons */}
      {/* ===================== */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.callButton}
          onClick={handleCall}
        >
          <Phone size={18} />
          Call Now
        </button>

        <button
          type="button"
          className={styles.whatsappButton}
          onClick={handleWhatsApp}
        >
          <MessageCircle size={18} />
          WhatsApp
        </button>

        <button
          type="button"
          className={styles.enquiryButton}
          onClick={handleEnquiry}
        >
          <Mail size={18} />
          Send Enquiry
        </button>
      </div>

      {/* ===================== */}
      {/* Trust */}
      {/* ===================== */}
      <div className={styles.trustCard}>
        <ShieldCheck size={18} />

        <p>
          Verified profile with trusted property support and secure
          communication.
        </p>
      </div>
    </aside>
  );
}
