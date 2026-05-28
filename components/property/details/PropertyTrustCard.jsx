"use client";

// ======================================================
// File: components/property/details/PropertyTrustCard.jsx
// Description: Property Trust & Safety Card
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import styles from "./PropertyTrustCard.module.css";

import {
  ShieldCheck,
  BadgeCheck,
  CircleDollarSign,
  FileCheck,
  Lock,
  PhoneCall,
} from "lucide-react";

export default function PropertyTrustCard({ property = {} }) {
  const {
    trustInfo = {
      verifiedProperty: true,
      verifiedOwner: true,
      legalDocumentsChecked: true,
      safePaymentSupport: true,
      secureCommunication: true,
      assistedSupport: true,
    },
  } = property;

  const trustItems = [
    {
      title: "Verified Property",
      description: "This property has been reviewed and verified.",
      icon: BadgeCheck,
      enabled: trustInfo.verifiedProperty,
    },
    {
      title: "Verified Owner",
      description: "Owner or agent identity has been verified.",
      icon: ShieldCheck,
      enabled: trustInfo.verifiedOwner,
    },
    {
      title: "Legal Documents",
      description: "Documents have been checked for authenticity.",
      icon: FileCheck,
      enabled: trustInfo.legalDocumentsChecked,
    },
    {
      title: "Safe Payment",
      description: "Guided and secure transaction assistance.",
      icon: CircleDollarSign,
      enabled: trustInfo.safePaymentSupport,
    },
    {
      title: "Secure Contact",
      description: "Protected communication and privacy.",
      icon: Lock,
      enabled: trustInfo.secureCommunication,
    },
    {
      title: "Support Assistance",
      description: "Dedicated Bhoomi Sathi property support.",
      icon: PhoneCall,
      enabled: trustInfo.assistedSupport,
    },
  ];

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Trust & Safety</h2>

        <p className={styles.subText}>
          Verified information and secure property assistance for buyers.
        </p>
      </div>

      {/* ===================== */}
      {/* Trust Grid */}
      {/* ===================== */}
      <div className={styles.grid}>
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`${styles.card} ${
                item.enabled ? styles.active : styles.disabled
              }`}
            >
              <div className={styles.iconBox}>
                <Icon size={22} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>

                <p className={styles.description}>{item.description}</p>

                <span className={styles.status}>
                  {item.enabled ? "Verified" : "Unavailable"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
