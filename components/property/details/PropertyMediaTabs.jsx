"use client";

// ======================================================
// File: components/property/details/PropertyMediaTabs.jsx
// Description: Property Photos / Videos / Documents Tabs
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useMemo, useState } from "react";
import Image from "next/image";

import { ImageIcon, Video, FileText, PlayCircle } from "lucide-react";

import styles from "./PropertyMediaTabs.module.css";

export default function PropertyMediaTabs({ property = {} }) {
  const [activeTab, setActiveTab] = useState("photos");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // ==========================================
  // Normalize Media URL
  // ==========================================
  const normalizeMediaUrl = (media) => {
    if (!media) {
      return "/images/placeholder-property.jpg";
    }

    const mediaUrl =
      typeof media === "string" ? media : media?.url || media?.src || "";

    if (!mediaUrl) {
      return "/images/placeholder-property.jpg";
    }

    // Already external URL
    if (mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://")) {
      return mediaUrl;
    }

    // Backend upload path
    return `${apiUrl}${mediaUrl}`;
  };

  // ==========================================
  // Photos
  // ==========================================
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

  // ==========================================
  // Videos
  // ==========================================
  const videos = property?.videos || [];

  // ==========================================
  // Documents (future support)
  // ==========================================
  const documents = property?.documents || [];

  // ==========================================
  // Tabs
  // ==========================================
  const tabs = [
    {
      id: "photos",
      label: `Photos (${photos.length})`,
      icon: ImageIcon,
    },
    {
      id: "videos",
      label: `Videos (${videos.length})`,
      icon: Video,
    },
    {
      id: "documents",
      label: `Documents (${documents.length})`,
      icon: FileText,
    },
  ];

  // ==========================================
  // Render Content
  // ==========================================
  const renderContent = () => {
    // =====================
    // Photos
    // =====================
    if (activeTab === "photos") {
      if (!photos.length) {
        return <div className={styles.emptyState}>No photos available</div>;
      }

      return (
        <div className={styles.mediaGrid}>
          {photos.map((image, index) => (
            <div key={index} className={styles.mediaCard}>
              <Image
                src={normalizeMediaUrl(image)}
                alt={`Property Image ${index + 1}`}
                fill
                unoptimized
                className={styles.image}
                sizes="300px"
              />
            </div>
          ))}
        </div>
      );
    }

    // =====================
    // Videos
    // =====================
    if (activeTab === "videos") {
      if (!videos.length) {
        return <div className={styles.emptyState}>No videos available</div>;
      }

      return (
        <div className={styles.mediaGrid}>
          {videos.map((video, index) => (
            <div key={index} className={styles.videoCard}>
              <video controls className={styles.video}>
                <source src={normalizeMediaUrl(video)} />
              </video>

              <div className={styles.videoOverlay}>
                <PlayCircle size={34} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // =====================
    // Documents
    // =====================
    if (activeTab === "documents") {
      if (!documents.length) {
        return <div className={styles.emptyState}>No documents available</div>;
      }

      return (
        <div className={styles.documentsList}>
          {documents.map((document, index) => (
            <a
              key={index}
              href={normalizeMediaUrl(document)}
              target="_blank"
              rel="noreferrer"
              className={styles.documentItem}
            >
              <FileText size={18} />

              <span>{document?.name || `Document ${index + 1}`}</span>
            </a>
          ))}
        </div>
      );
    }
  };

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Photos, Floor Plan & Documents</h2>

        <p className={styles.subText}>
          Browse all media related to this property.
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

              <span>{tab.label}</span>
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
