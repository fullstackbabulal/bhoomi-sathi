"use client";

// ======================================================
// File: components/property/details/PropertyGallery.jsx
// Description: Dynamic Property Gallery
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useMemo, useState } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

import styles from "./PropertyGallery.module.css";

export default function PropertyGallery({ property = {} }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // ==========================================
  // Normalize Image URL
  // ==========================================
  const normalizeImageUrl = (image) => {
    if (!image) return "/images/placeholder-property.jpg";

    const imageUrl =
      typeof image === "string" ? image : image?.url || image?.src || "";

    if (!imageUrl) {
      return "/images/placeholder-property.jpg";
    }

    // Already external URL
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    // Backend upload path
    return `${apiUrl}${imageUrl}`;
  };

  // ==========================================
  // Gallery Images
  // ==========================================
  const galleryImages = useMemo(() => {
    const propertyImages = property?.images?.length > 0 ? property.images : [];

    const thumbnail = property?.thumbnail ? [property.thumbnail] : [];

    const mergedImages = [...thumbnail, ...propertyImages];

    const uniqueImages = mergedImages.filter((image, index, self) => {
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

    return uniqueImages;
  }, [property]);

  const totalImages = galleryImages.length || 1;

  const currentImage = galleryImages[selectedIndex] || galleryImages[0];

  const visibleThumbnails = galleryImages.slice(0, 5);

  const remainingImages = totalImages - 5;

  // ==========================================
  // Navigation
  // ==========================================
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.gallery}>
      {/* ===================== */}
      {/* Hero Image */}
      {/* ===================== */}
      <div className={styles.heroWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={normalizeImageUrl(currentImage)}
            alt={property?.title || `Property Image ${selectedIndex + 1}`}
            fill
            priority
            unoptimized
            className={styles.heroImage}
            sizes="100vw"
          />

          {/* Photo Count */}
          <div className={styles.photoBadge}>
            <Camera size={16} />

            <span>
              {totalImages} Photo
              {totalImages > 1 ? "s" : ""}
            </span>
          </div>

          {/* Previous */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className={styles.navLeft}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className={styles.navRight}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>

      {/* ===================== */}
      {/* Thumbnail Grid */}
      {/* ===================== */}
      {visibleThumbnails.length > 0 && (
        <div className={styles.thumbnailGrid}>
          {visibleThumbnails.map((image, index) => {
            const isActive = selectedIndex === index;

            const isLast = index === 4 && remainingImages > 0;

            return (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`${styles.thumbnailButton} ${
                  isActive ? styles.active : ""
                }`}
              >
                <Image
                  src={normalizeImageUrl(image)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  unoptimized
                  className={styles.thumbnailImage}
                  sizes="200px"
                />

                {isLast && (
                  <div className={styles.overlay}>+{remainingImages}</div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
