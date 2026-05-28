"use client";

// ======================================================
// File: components/property/details/PropertyGallery.jsx
// Description: Property Details Gallery
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import { useMemo, useState } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

import styles from "./PropertyGallery.module.css";

export default function PropertyGallery({ images = [] }) {
  const fallbackImages = useMemo(
    () => [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db55?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    [],
  );

  const galleryImages = images?.length > 0 ? images : fallbackImages;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentImage = galleryImages[selectedIndex];

  const totalImages = galleryImages.length;

  const visibleThumbnails = galleryImages.slice(0, 5);

  const remainingImages = totalImages - 5;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.gallery}>
      {/* ===================== */}
      {/* Main Image */}
      {/* ===================== */}
      <div className={styles.heroWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={currentImage}
            alt={`Property Image ${selectedIndex + 1}`}
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />

          {/* Photo Count */}
          <div className={styles.photoBadge}>
            <Camera size={16} />

            <span>{totalImages} Photos</span>
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={handlePrev}
            className={styles.navLeft}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            className={styles.navRight}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* ===================== */}
      {/* Thumbnails */}
      {/* ===================== */}
      <div className={styles.thumbnailGrid}>
        {visibleThumbnails.map((image, index) => {
          const isActive = selectedIndex === index;

          const isLast = index === 4 && remainingImages > 0;

          return (
            <button
              key={index}
              type="button"
              className={`${styles.thumbnailButton} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
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
    </section>
  );
}
