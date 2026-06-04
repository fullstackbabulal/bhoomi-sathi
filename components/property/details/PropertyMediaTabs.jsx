"use client";

// ======================================================
// File: components/property/details/PropertyMediaTabs.jsx
// Description: Property Media Tabs
// UI Target: Compact Media Strip Layout
// ======================================================

import { useMemo, useState } from "react";
import Image from "next/image";

import { ImageIcon, Video, FileText, Map } from "lucide-react";

import styles from "./PropertyMediaTabs.module.css";

export default function PropertyMediaTabs({ property = {} }) {
  const [activeTab, setActiveTab] = useState("photos");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // =====================================================
  // Normalize Media URL
  // =====================================================
  const normalizeMediaUrl = (media) => {
    if (!media) {
      return "/images/placeholder-property.jpg";
    }

    const mediaUrl =
      typeof media === "string" ? media : media?.url || media?.src || "";

    if (!mediaUrl) {
      return "/images/placeholder-property.jpg";
    }

    if (mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://")) {
      return mediaUrl;
    }

    return `${apiUrl}${mediaUrl}`;
  };

  // =====================================================
  // Photos
  // =====================================================
  const photos = useMemo(() => {
    const propertyImages = property?.images || [];

    const thumbnail = property?.thumbnail ? [property.thumbnail] : [];

    const mergedPhotos = [...thumbnail, ...propertyImages];

    return mergedPhotos.filter((image, index, self) => {
      const current = typeof image === "string" ? image : image?.url;

      return (
        current &&
        index ===
          self.findIndex((item) => {
            const compare = typeof item === "string" ? item : item?.url;

            return compare === current;
          })
      );
    });
  }, [property]);

  // =====================================================
  // Floor Plan
  // =====================================================
  const floorPlans = property?.floorPlans || property?.floorPlan || [];

  // =====================================================
  // Videos
  // =====================================================
  const videos = property?.videos || [];

  // =====================================================
  // Documents
  // =====================================================
  const documents = property?.documents || [];

  // =====================================================
  // Tabs
  // =====================================================
  const tabs = [
    {
      id: "photos",
      label: "Photos",
      icon: ImageIcon,
      data: photos,
    },
    {
      id: "floorPlan",
      label: "Floor Plan",
      icon: Map,
      data: floorPlans,
    },
    {
      id: "videos",
      label: "Video Tour",
      icon: Video,
      data: videos,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      data: documents,
    },
  ];

  // =====================================================
  // Active Media
  // =====================================================
  const activeMedia = tabs.find((tab) => tab.id === activeTab)?.data || [];

  const previewMedia = activeMedia.slice(0, 4);

  // =====================================================
  // Empty State
  // =====================================================
  const renderEmptyState = () => (
    <div className={styles.emptyState}>No media available</div>
  );

  // =====================================================
  // Render Media Strip
  // =====================================================
  const renderMedia = () => {
    if (!activeMedia.length) {
      return renderEmptyState();
    }

    return (
      <div className={styles.mediaRow}>
        {previewMedia.map((item, index) => (
          <div key={index} className={styles.mediaCard}>
            <Image
              fill
              unoptimized
              priority={index === 0}
              sizes="300px"
              className={styles.image}
              src={normalizeMediaUrl(item)}
              alt={`Property media ${index + 1}`}
            />
          </div>
        ))}

        <button type="button" className={styles.viewAllCard}>
          <span className={styles.viewAllTitle}>View All</span>

          <span className={styles.viewAllCount}>
            {activeMedia.length}{" "}
            {activeTab === "photos"
              ? "Photos"
              : activeTab === "floorPlan"
                ? "Floor Plans"
                : activeTab === "videos"
                  ? "Videos"
                  : "Documents"}
          </span>
        </button>
      </div>
    );
  };

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Photos, Floor Plan & Documents</h2>

        <p className={styles.subText}>
          Browse all media related to this property.
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
            >
              <Icon size={16} />

              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className={styles.content}>{renderMedia()}</div>
    </section>
  );
}
