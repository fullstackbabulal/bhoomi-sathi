"use client";

// ======================================================
// File: components/property/details/PropertyAgentCard.jsx
// Description: Dynamic Property Agent / Owner Card
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
  // ======================================================
  // AGENT SOURCE
  // Priority:
  // assignedAgent -> postedBy
  // ======================================================
  const agent = property?.assignedAgent || property?.postedBy || {};

  // ======================================================
  // SAFE DATA
  // ======================================================
  const agentName = agent?.name || "Property Consultant";

  const agentPhone = agent?.phone || "";

  const agentEmail = agent?.email || "";

  const agentAvatar =
    agent?.avatar?.trim() ||
    "https://ui-avatars.com/api/?name=Agent&background=15803d&color=fff";

  const agentRole =
    agent?.role === "admin"
      ? "Property Administrator"
      : agent?.role === "agent"
        ? "Property Consultant"
        : "Property Owner";

  const isVerified = property?.isVerified || agent?.isVerified || false;

  const listedBy =
    agent?.role === "admin"
      ? "Administrator"
      : agent?.role === "agent"
        ? "Agent"
        : "Owner";

  // ======================================================
  // HANDLERS
  // ======================================================
  const handleCall = () => {
    if (!agentPhone) return;

    if (onCall) {
      onCall(agent);
      return;
    }

    window.location.href = `tel:${agentPhone}`;
  };

  const handleWhatsApp = () => {
    if (!agentPhone) return;

    if (onWhatsApp) {
      onWhatsApp(agent);
      return;
    }

    const cleanedPhone = agentPhone.replace(/\D/g, "");

    window.open(
      `https://wa.me/${cleanedPhone}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleEnquiry = () => {
    if (onEnquiry) {
      onEnquiry({
        propertyId: property?._id,
        property,
        agent,
      });
    }
  };

  return (
    <aside className={styles.card}>
      {/* ===================== */}
      {/* Top */}
      {/* ===================== */}
      <div className={styles.topSection}>
        <span className={styles.listedBadge}>Listed by {listedBy}</span>

        {isVerified && (
          <div className={styles.verified}>
            <BadgeCheck size={16} />
            Verified
          </div>
        )}
      </div>

      {/* ===================== */}
      {/* Profile */}
      {/* ===================== */}
      <div className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <Image
            src={agentAvatar}
            alt={agentName}
            width={90}
            height={90}
            className={styles.avatar}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{agentName}</h3>

          <p className={styles.role}>{agentRole}</p>

          {agentEmail && <p className={styles.company}>{agentEmail}</p>}
        </div>
      </div>

      {/* ===================== */}
      {/* Response */}
      {/* ===================== */}
      <div className={styles.responseCard}>
        <Clock3 size={18} />

        <span>Usually responds quickly to enquiries</span>
      </div>

      {/* ===================== */}
      {/* Actions */}
      {/* ===================== */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.callButton}
          onClick={handleCall}
          disabled={!agentPhone}
        >
          <Phone size={18} />
          {agentPhone ? "Call Now" : "Phone Not Available"}
        </button>

        <button
          type="button"
          className={styles.whatsappButton}
          onClick={handleWhatsApp}
          disabled={!agentPhone}
        >
          <MessageCircle size={18} />
          {agentPhone ? "WhatsApp" : "WhatsApp Unavailable"}
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
          Verified profile with trusted property assistance and secure
          communication.
        </p>
      </div>
    </aside>
  );
}
