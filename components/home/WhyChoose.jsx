"use client";

// ======================================================
// File: components/home/WhyChoose.jsx
// Description: Why Choose Bhoomi Sathi Section
// ======================================================

import Link from "next/link";

import {
  ShieldCheck,
  BadgeCheck,
  Search,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

import styles from "./WhyChoose.module.css";

// ======================================================
// STATIC FEATURES
// ======================================================
const FEATURES = [
  {
    id: "verified-listings",
    title: "Verified Listings",
    description:
      "Browse trusted and verified property listings with transparent information and authentic details.",
    icon: ShieldCheck,
  },

  {
    id: "trusted-agents",
    title: "Trusted Agents",
    description:
      "Connect with reliable agents and owners for faster, safer, and smoother transactions.",
    icon: BadgeCheck,
  },

  {
    id: "smart-search",
    title: "Smart Property Search",
    description:
      "Quickly discover apartments, villas, plots, and commercial properties using smart filters.",
    icon: Search,
  },

  {
    id: "legal-support",
    title: "Legal & RERA Support",
    description:
      "Get access to compliant listings and guidance for safer property decisions.",
    icon: FileCheck2,
  },
];

// ======================================================
// COMPONENT
// ======================================================
export default function WhyChoose() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.content}>
          <span className={styles.badge}>Why Choose Us</span>

          <h2 className={styles.title}>
            Why Choose <span>Bhoomi Sathi</span>
          </h2>

          <p className={styles.description}>
            Discover verified properties, trusted agents, and a seamless buying
            experience built to make your real estate journey smarter, safer,
            and faster.
          </p>

          <Link href="/properties" className={styles.ctaButton}>
            Explore Properties
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* RIGHT */}
        <div className={styles.grid}>
          {FEATURES.map(({ id, title, description, icon: Icon }) => (
            <article key={id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Icon size={26} />
              </div>

              <h3 className={styles.cardTitle}>{title}</h3>

              <p className={styles.cardDescription}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
