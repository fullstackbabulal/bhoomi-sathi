"use client";

// ======================================================
// File: components/property/details/PropertyContactForm.jsx
// Description: Property Contact / Enquiry Form
// UI Match: Bhoomi Sathi Property Details Design
// API: POST /api/enquiries
// ======================================================

import { useEffect, useState } from "react";

import styles from "./PropertyContactForm.module.css";

import {
  User,
  Phone,
  Mail,
  MessageSquare,
  CalendarDays,
  Send,
} from "lucide-react";

export default function PropertyContactForm({ property = {}, onSubmit }) {
  // ======================================================
  // PROPERTY DATA
  // ======================================================
  const { _id, title = "Luxury Property" } = property;

  // ======================================================
  // FORM START TIME
  // Bot timing protection
  // ======================================================
  const [formLoadedAt, setFormLoadedAt] = useState(Date.now());

  // ======================================================
  // LOADING
  // ======================================================
  const [loading, setLoading] = useState(false);

  // ======================================================
  // FORM STATE
  // ======================================================
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Hi, I am interested in "${title}". Please contact me with more details.`,
    scheduleVisit: false,

    // Honeypot
    website: "",
  });

  // ======================================================
  // RESET TIMER
  // ======================================================
  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  // ======================================================
  // AUTO CHECK SITE VISIT
  // ======================================================
  useEffect(() => {
    const handleBookVisit = () => {
      setFormData((prev) => ({
        ...prev,
        scheduleVisit: true,
      }));
    };

    window.addEventListener("book-site-visit", handleBookVisit);

    return () => {
      window.removeEventListener("book-site-visit", handleBookVisit);
    };
  }, []);

  // ======================================================
  // INPUT CHANGE
  // ======================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ======================================================
  // SUBMIT
  // ======================================================
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

      if (timeTaken < 3000) {
        alert("Please wait a moment before submitting.");
        return;
      }

      // Parent override
      if (onSubmit) {
        await onSubmit(formData);
        return;
      }

      // ==========================
      // API REQUEST
      // ==========================
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

          source: formData.scheduleVisit ? "site-visit" : "website",

          scheduleVisit: formData.scheduleVisit,
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
        phone: "",
        email: "",
        message: `Hi, I am interested in "${title}". Please contact me with more details.`,
        scheduleVisit: false,
        website: "",
      });

      // Reset timer
      setFormLoadedAt(Date.now());
    } catch (error) {
      console.error("Enquiry error:", error);

      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="property-contact-form" className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Interested in this property?</h2>

        <p className={styles.subText}>
          Send your enquiry and connect with the owner or agent instantly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          value={formData.website}
          onChange={handleChange}
          style={{
            display: "none",
          }}
        />

        {/* Name */}
        <div className={styles.field}>
          <label className={styles.label}>Full Name</label>

          <div className={styles.inputWrapper}>
            <User size={18} />

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <label className={styles.label}>Phone Number</label>

          <div className={styles.inputWrapper}>
            <Phone size={18} />

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label}>Email Address</label>

          <div className={styles.inputWrapper}>
            <Mail size={18} />

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        {/* Message */}
        <div className={styles.field}>
          <label className={styles.label}>Message</label>

          <div className={styles.textareaWrapper}>
            <MessageSquare size={18} />

            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>
        </div>

        {/* Schedule Visit */}
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            name="scheduleVisit"
            checked={formData.scheduleVisit}
            onChange={handleChange}
          />

          <span>
            <CalendarDays size={16} />
            Schedule a site visit
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          <Send size={18} />

          {loading ? "Submitting..." : "Send Enquiry"}
        </button>
      </form>
    </section>
  );
}
