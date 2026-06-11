"use client";

import styles from "./PropertyExperts.module.css";
import { Phone, Mail, ArrowUpRight } from "lucide-react";

const PropertyExperts = ({ data = {} }) => {
  const title = data?.title || "Meet Our Property Experts";

  const subtitle =
    data?.subtitle ||
    "Our experienced team is here to guide you through every step of your property journey.";

  const experts = data?.experts || [
    {
      _id: "1",
      name: "Amit Sharma",
      role: "Senior Property Consultant",
      image: "/images/contact/expert-1.webp",
      phone: "+91 9661655534",
      email: "amit@bhoomisathi.com",
    },
    {
      _id: "2",
      name: "Priya Verma",
      role: "Real Estate Advisor",
      image: "/images/contact/expert-2.webp",
      phone: "+91 9876543211",
      email: "priya@bhoomisathi.com",
    },
    {
      _id: "3",
      name: "Rahul Kumar",
      role: "Investment Specialist",
      image: "/images/contact/expert-3.webp",
      phone: "+91 9876543212",
      email: "rahul@bhoomisathi.com",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Expert Guidance</span>

          <h2>{title}</h2>

          <p>{subtitle}</p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {experts.map((expert, index) => (
            <div key={expert?._id || index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    expert?.image || "/images/contact/expert-placeholder.webp"
                  }
                  alt={expert?.name}
                  className={styles.image}
                />

                <div className={styles.overlayBtn}>
                  <ArrowUpRight size={20} />
                </div>
              </div>

              <div className={styles.content}>
                <h3>{expert?.name}</h3>

                <span className={styles.role}>{expert?.role}</span>

                <div className={styles.contactInfo}>
                  <a
                    href={`tel:${expert?.phone}`}
                    className={styles.contactItem}
                  >
                    <Phone size={16} />
                    <span>{expert?.phone}</span>
                  </a>

                  <a
                    href={`mailto:${expert?.email}`}
                    className={styles.contactItem}
                  >
                    <Mail size={16} />
                    <span>{expert?.email}</span>
                  </a>
                </div>

                <button className={styles.ctaBtn} type="button">
                  Contact Expert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyExperts;
