"use client";

// ======================================================
// File: components/property/details/PropertySpecifications.jsx
// Description: Property Specifications Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useState } from "react";

import styles from "./PropertySpecifications.module.css";

import {
  Home,
  Building2,
  Ruler,
  Compass,
  CalendarDays,
  Layers3,
} from "lucide-react";

export default function PropertySpecifications({ property = {} }) {
  const {
    specifications = {
      basicDetails: {
        propertyType: "Apartment",
        ownershipType: "Freehold",
        propertyStatus: "Ready to Move",
        constructionYear: "2020",
        superBuiltupArea: "1650 Sq. Ft.",
        carpetArea: "1250 Sq. Ft.",
        floor: "5th Floor out of 8",
        totalFloors: "8",
        facing: "East",
        possession: "Immediate",
      },

      interiorDetails: {
        furnishing: "Semi Furnished",
        flooring: "Vitrified Tiles",
        modularKitchen: "Available",
        wardrobes: "Built-in",
      },

      utilities: {
        electricity: "24 Hours",
        waterSupply: "24 Hours",
        internet: "Fiber Ready",
      },

      legalInformation: {
        reraApproved: "Yes",
        loanApproved: "Yes",
        propertyTax: "Paid",
      },
    },
  } = property;

  const tabs = [
    {
      id: "basicDetails",
      label: "Basic Details",
    },
    {
      id: "interiorDetails",
      label: "Interior Details",
    },
    {
      id: "utilities",
      label: "Utilities",
    },
    {
      id: "legalInformation",
      label: "Legal Information",
    },
  ];

  const [activeTab, setActiveTab] = useState("basicDetails");

  const currentData = specifications[activeTab] || {};

  const iconMap = {
    propertyType: Home,
    ownershipType: Building2,
    superBuiltupArea: Ruler,
    carpetArea: Ruler,
    facing: Compass,
    constructionYear: CalendarDays,
    floor: Layers3,
    totalFloors: Layers3,
  };

  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Property Specifications</h2>

        <p className={styles.subText}>
          Detailed information and specifications of this property.
        </p>
      </div>

      {/* ===================== */}
      {/* Specification Card */}
      {/* ===================== */}
      <div className={styles.card}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.active : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.grid}>
          {Object.entries(currentData).map(([key, value]) => {
            const Icon = iconMap[key];

            return (
              <div key={key} className={styles.item}>
                <div className={styles.left}>
                  {Icon && (
                    <div className={styles.iconBox}>
                      <Icon size={18} />
                    </div>
                  )}

                  <div>
                    <p className={styles.label}>{formatLabel(key)}</p>

                    <h4 className={styles.value}>{value}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
