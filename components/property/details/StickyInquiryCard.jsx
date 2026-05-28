"use client";

// ======================================================
// File: components/property/details/StickyInquiryCard.jsx
// Description: Sticky Inquiry / Contact Sidebar Card
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useState } from "react";

import styles from "./StickyInquiryCard.module.css";

import {
  Phone,
  MessageCircle,
  Send,
  ShieldCheck,
  BadgeCheck,
  User,
  Mail,
} from "lucide-react";

export default function StickyInquiryCard({
  property = {},
  onCall,
  onWhatsApp,
  onSubmit,
}) {
  const {
    title = "Luxury 3 BHK Apartment",

    price = 8500000,

    phone = "+91 9876543210",

    agentName = "Rahul Sharma",

    verified = true,
  } = property;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: `Hi, I am interested in "${title}". Please contact me.`,
  });

  const [loading, setLoading] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-IN").format(price);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        console.log("Inquiry submitted:", formData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    <aside className={styles.card}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <div className={styles.badgeRow}>
          {verified && (
            <span className={styles.badge}>
              <BadgeCheck size={14} />
              Verified
            </span>
          )}
        </div>

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{formattedPrice}</span>

          <span className={styles.agent}>by {agentName}</span>
        </div>
      </div>

      {/* ===================== */}
      {/* Quick CTA */}
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
      </div>

      {/* ===================== */}
      {/* Form */}
      {/* ===================== */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputBox}>
          <User size={18} />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputBox}>
          <Mail size={18} />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={styles.textarea}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          <Send size={18} />

          {loading ? "Sending..." : "Send Inquiry"}
        </button>
      </form>

      {/* ===================== */}
      {/* Trust */}
      {/* ===================== */}
      <div className={styles.trust}>
        <ShieldCheck size={18} />

        <p>Safe and secure communication with verified property assistance.</p>
      </div>
    </aside>
  );
}
