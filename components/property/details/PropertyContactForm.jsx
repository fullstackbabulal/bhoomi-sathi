"use client";

// ======================================================
// File: components/property/details/PropertyContactForm.jsx
// Description: Property Contact / Enquiry Form
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useState } from "react";

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
  const { title = "Luxury 3 BHK Apartment" } = property;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Hi, I am interested in "${title}". Please contact me with more details.`,
    scheduleVisit: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        console.log("Property Enquiry:", formData);
      }
    } catch (error) {
      console.error("Enquiry error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.card}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Interested in this property?</h2>

        <p className={styles.subText}>
          Send your enquiry and connect with the owner or agent instantly.
        </p>
      </div>

      {/* ===================== */}
      {/* Form */}
      {/* ===================== */}
      <form onSubmit={handleSubmit} className={styles.form}>
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
              placeholder="Write your message"
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
          className={styles.submitButton}
          disabled={loading}
        >
          <Send size={18} />

          {loading ? "Submitting..." : "Send Enquiry"}
        </button>
      </form>
    </section>
  );
}
