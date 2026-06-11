"use client";

import { useState } from "react";
import styles from "./ContactFormSection.module.css";
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";

const ContactFormSection = ({ data = {} }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const sectionTitle = data?.title || "Send Us a Message";

  const sectionDescription =
    data?.description ||
    "Fill out the form and our team will get back to you shortly.";

  const mapEmbedUrl =
    data?.mapEmbedUrl ||
    "https://www.google.com/maps?q=Patna,Bihar&output=embed";

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit form");
      }

      alert(result?.message || "Message sent successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* FORM CARD */}
        <div className={styles.formCard}>
          <div className={styles.header}>
            <h2>{sectionTitle}</h2>
            <p>{sectionDescription}</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGrid}>
              {/* FULL NAME */}
              <div className={styles.inputWrapper}>
                <User size={18} />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className={styles.inputWrapper}>
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}
              <div className={styles.inputWrapper}>
                <Phone size={18} />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* SUBJECT */}
              <div className={styles.inputWrapper}>
                <FileText size={18} />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className={styles.textareaWrapper}>
              <MessageSquare size={18} />

              <textarea
                rows="7"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.bottomRow}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                <Send size={18} />

                {loading ? "Sending..." : "Send Message"}
              </button>

              <div className={styles.securityBadge}>
                <ShieldCheck size={18} />
                <span>100% Secure & Confidential</span>
              </div>
            </div>
          </form>
        </div>

        {/* MAP CARD */}
        <div className={styles.mapCard}>
          <iframe
            title="Office Location"
            src={mapEmbedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.map}
          />

          <div className={styles.directionBar}>
            <button className={styles.directionBtn}>Get Directions</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
