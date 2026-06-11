"use client";

// ======================================================
// File: components/Landing/SiteVisitForm/SiteVisitForm.jsx
// Description: Lead Generation Section
// ======================================================

import { useState } from "react";
import { CalendarDays, Phone, MessageCircle, MapPinned } from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";

import { createEnquiry } from "@/services/enquiryService";

import styles from "./SiteVisitForm.module.css";

export default function SiteVisitForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    visitDate: "",
  });

  // ======================================================
  // HANDLERS
  // ======================================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,

        message: `
Site Visit Request

Budget Range: ${formData.budget}
Preferred Visit Date: ${formData.visitDate}
        `,

        source: "website",
      });

      alert("Site visit request submitted successfully.");

      setFormData({
        name: "",
        phone: "",
        email: "",
        budget: "",
        visitDate: "",
      });
    } catch (error) {
      alert(error?.message || "Failed to submit site visit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="site-visit" className={styles.section}>
      <Container>
        <SectionTitle
          badge="Book Site Visit"
          title="Schedule Your Free Site Visit"
          subtitle="Visit the project location, inspect available plots and get complete project details from our experts."
        />

        <div className={styles.layout}>
          {/* ==================================
              LEFT CONTENT
          ================================== */}

          <Card variant="elevated" padding="xl" hover={false}>
            <h3 className={styles.heading}>Why Schedule A Visit?</h3>

            <div className={styles.features}>
              <div className={styles.feature}>
                <MapPinned size={22} />

                <span>Physical Site Inspection</span>
              </div>

              <div className={styles.feature}>
                <CalendarDays size={22} />

                <span>Flexible Visit Timing</span>
              </div>

              <div className={styles.feature}>
                <Phone size={22} />

                <span>Expert Investment Guidance</span>
              </div>

              <div className={styles.feature}>
                <MessageCircle size={22} />

                <span>Complete Project Information</span>
              </div>
            </div>

            <div className={styles.contactBox}>
              <h4>Need Immediate Assistance?</h4>

              <p>
                Call or WhatsApp our property advisor for real-time
                availability.
              </p>

              <div className={styles.contactActions}>
                <Button
                  type="button"
                  onClick={() => window.open("tel:+919661655534")}
                >
                  <Phone size={18} />
                  Call +91 9661655534
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    window.open("https://wa.me/919661655534", "_blank")
                  }
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </Button>
              </div>
            </div>
          </Card>

          {/* ==================================
              FORM
          ================================== */}

          <Card variant="outline" padding="xl" hover={false}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label>Budget Range</label>

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Budget</option>

                  <option value="₹10L - ₹20L">₹10L - ₹20L</option>

                  <option value="₹20L - ₹40L">₹20L - ₹40L</option>

                  <option value="₹40L - ₹60L">₹40L - ₹60L</option>

                  <option value="₹60L+">₹60L+</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Preferred Visit Date</label>

                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" size="lg" fullWidth disabled={loading}>
                {loading ? "Submitting..." : "Book Free Site Visit"}
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
