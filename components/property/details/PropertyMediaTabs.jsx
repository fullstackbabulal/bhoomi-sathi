"use client";

// ======================================================
// File: components/property/details/PropertyMediaTabs.jsx
// Description: Property Media Tabs
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useState } from "react";

import styles from "./PropertyMediaTabs.module.css";

import { ImageIcon, Video, Map, PlayCircle } from "lucide-react";

export default function PropertyMediaTabs({ property = {} }) {
  const {
    images = [],
    videos = [],
    floorPlan = "/images/floorplan-placeholder.jpg",
    virtualTour = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  } = property;

  const tabs = [
    {
      id: "photos",
      label: "Photos",
      icon: ImageIcon,
    },
    {
      id: "videos",
      label: "Videos",
      icon: Video,
    },
    {
      id: "floorPlan",
      label: "Floor Plan",
      icon: Map,
    },
    {
      id: "virtualTour",
      label: "Virtual Tour",
      icon: PlayCircle,
    },
  ];

  const [activeTab, setActiveTab] = useState("photos");

  const renderContent = () => {
    switch (activeTab) {
      case "photos":
        return (
          <div className={styles.grid}>
            {(images.length
              ? images
              : [
                  "/images/property-placeholder.jpg",
                  "/images/property-placeholder.jpg",
                  "/images/property-placeholder.jpg",
                ]
            ).map((image, index) => (
              <div key={index} className={styles.mediaCard}>
                <img
                  src={image}
                  alt={`Property ${index}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        );

      case "videos":
        return (
          <div className={styles.grid}>
            {(videos.length
              ? videos
              : ["https://www.youtube.com/embed/dQw4w9WgXcQ"]
            ).map((video, index) => (
              <div key={index} className={styles.videoCard}>
                <iframe
                  src={video}
                  title={`Video ${index}`}
                  allowFullScreen
                  className={styles.video}
                />
              </div>
            ))}
          </div>
        );

      case "floorPlan":
        return (
          <div className={styles.singleCard}>
            <img src={floorPlan} alt="Floor Plan" className={styles.image} />
          </div>
        );

      case "virtualTour":
        return (
          <div className={styles.singleCard}>
            <iframe
              src={virtualTour}
              title="Virtual Tour"
              allowFullScreen
              className={styles.video}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Media Gallery</h2>

        <p className={styles.subText}>
          Browse photos, videos, floor plan and virtual tour of this property.
        </p>
      </div>

      {/* ===================== */}
      {/* Tabs */}
      {/* ===================== */}
      <div className={styles.tabs}>
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.active : ""
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ===================== */}
      {/* Content */}
      {/* ===================== */}
      <div className={styles.content}>{renderContent()}</div>
    </section>
  );
}
