"use client";

// ======================================================
// File: components/property/details/PropertySpecifications.jsx
// Description: Property Specifications Section
// UI Match: Bhoomi Sathi Property Details Design
// Data Source: getPropertyBySlug()
// ======================================================

import { useState } from "react";

import styles from "./PropertySpecifications.module.css";

import {
  Home,
  Building2,
  Ruler,
  BedDouble,
  Bath,
  MapPin,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

export default function PropertySpecifications({ property }) {
  // ==================================================
  // SAFE PROPERTY
  // ==================================================
  const safeProperty = property || {};

  // ==================================================
  // PROPERTY DATA
  // Matches getPropertyBySlug()
  // ==================================================
  const {
    propertyId,
    listingType,
    type,
    status,
    price,
    emi,
    bedrooms,
    bathrooms,
    area,
    location,
    createdAt,
  } = safeProperty;

  // ==================================================
  // SPECIFICATIONS
  // EXACT MATCH TO API
  // ==================================================
  const specifications = {
    basicDetails: {
      propertyId: propertyId || "N/A",

      listingType:
        listingType?.replace(/\b\w/g, (char) => char.toUpperCase()) || "N/A",

      propertyType:
        type?.replace(/\b\w/g, (char) => char.toUpperCase()) || "N/A",

      propertyStatus:
        status
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()) || "N/A",

      price: price > 0 ? `₹${Number(price).toLocaleString("en-IN")}` : "N/A",

      emi: emi > 0 ? `₹${Number(emi).toLocaleString("en-IN")}/month` : "N/A",

      bedrooms: bedrooms || 0,

      bathrooms: bathrooms || 0,

      area: area?.value ? `${area.value} ${area.unit || "sqft"}` : "N/A",

      city: location?.city || "N/A",

      state: location?.state || "N/A",

      createdAt: createdAt
        ? new Date(createdAt).toLocaleDateString("en-IN")
        : "N/A",
    },
  };

  // ==================================================
  // TABS
  // ==================================================
  const tabs = [
    {
      id: "basicDetails",
      label: "Basic Details",
    },
  ];

  const [activeTab, setActiveTab] = useState("basicDetails");

  const currentData = specifications[activeTab] || {};

  // ==================================================
  // ICON MAP
  // ==================================================
  const iconMap = {
    propertyId: Building2,

    listingType: Home,

    propertyType: Home,

    propertyStatus: Building2,

    price: IndianRupee,

    emi: IndianRupee,

    bedrooms: BedDouble,

    bathrooms: Bath,

    area: Ruler,

    city: MapPin,

    state: MapPin,

    createdAt: CalendarDays,
  };

  // ==================================================
  // FORMAT LABEL
  // ==================================================
  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  // ==================================================
  // RENDER
  // ==================================================
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Property Specifications</h2>

        <p className={styles.subText}>
          Detailed information and specifications of this property.
        </p>
      </div>

      {/* Card */}
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
