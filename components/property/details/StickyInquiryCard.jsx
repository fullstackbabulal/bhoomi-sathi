"use client";

// ======================================================
// File: components/property/details/StickyInquiryCard.jsx
// Description: Sticky Inquiry / Contact Sidebar Card
// UI Match: Plot in Patna Property Details Design
// API: POST /api/enquiries
// Anti Spam:
// - Honeypot
// - Submit Timing
// ======================================================

import { useEffect, useState } from "react";

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
}) {
  // ==================================================
  // PROPERTY DATA
  // ==================================================
  const {
    _id,
    title = "",
    price = 0,
    isVerified = false,
    postedBy = {},
  } = property;

  const { name: agentName = "Property Owner", phone = "" } = postedBy;

  // ==================================================
  // FORM START TIME
  // Bot timing protection
  // ==================================================
  const [formLoadedAt, setFormLoadedAt] = useState(Date.now());

  // ==================================================
  // LOADING
  // ==================================================
  const [loading, setLoading] = useState(false);

  // ==================================================
  // FORM STATE
  // ==================================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I am interested in "${
      title || "this property"
    }". Please contact me.`,

    // Honeypot
    website: "",
  });

  // Reset timing when page loads
  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  // ==================================================
  // FORMAT PRICE
  // ==================================================
  const formattedPrice = Number(price || 0).toLocaleString("en-IN");

  // ==================================================
  // INPUT CHANGE
  // ==================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==================================================
  // CALL
  // ==================================================
  const handleCall = () => {
    if (onCall) {
      onCall(property);
      return;
    }

    if (!phone) return;

    window.location.href = `tel:${phone}`;
  };

  // ==================================================
  // WHATSAPP
  // ==================================================
  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp(property);
      return;
    }

    if (!phone) return;

    const cleanedPhone = phone.replace(/\D/g, "");

    const text = encodeURIComponent(
      `Hi, I am interested in "${title}". Please share more details.`,
    );

    window.open(`https://wa.me/${cleanedPhone}?text=${text}`, "_blank");
  };

  // ==================================================
  // SUBMIT ENQUIRY
  // ==================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ==========================
      // HONEYPOT CHECK
      // ==========================
      if (formData.website?.trim()) {
        console.warn("Bot detected (honeypot)");

        return;
      }

      // ==========================
      // BOT TIMING CHECK
      // ==========================
      const timeTaken = Date.now() - formLoadedAt;

      // Under 3 sec = suspicious
      if (timeTaken < 3000) {
        alert("Please wait a moment before submitting.");

        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      const response = await fetch(`${apiUrl}/api/enquiries`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),

          email: formData.email.trim(),

          phone: formData.phone.trim(),

          message: formData.message.trim(),

          property: _id || null,

          source: "website",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit enquiry");
      }

      alert(data?.message || "Enquiry submitted successfully");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `Hi, I am interested in "${
          title || "this property"
        }". Please contact me.`,

        website: "",
      });

      // Reset timer
      setFormLoadedAt(Date.now());
    } catch (error) {
      console.error("Enquiry submit error:", error);

      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badgeRow}>
          {isVerified && (
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

      {/* CTA Buttons */}
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
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          style={{
            display: "none",
          }}
        />

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
          <Phone size={18} />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
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

      {/* Trust */}
      <div className={styles.trust}>
        <ShieldCheck size={18} />

        <p>Safe and secure communication with verified property assistance.</p>
      </div>
    </aside>
  );
}
