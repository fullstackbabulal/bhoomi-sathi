"use client";

// ======================================================
// File: components/home/Gallery.jsx
// Description: Dynamic Property Gallery
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./Gallery.module.css";

// ======================================================
// CONFIG
// ======================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ======================================================
// HELPERS
// ======================================================

const getImageUrl = (value = "") => {
  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/uploads")) {
    return `${API_BASE_URL}${value}`;
  }

  return value;
};

const normalizeImages = (images = []) => {
  if (!Array.isArray(images)) {
    return [];
  }

  return images
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          id: index,
          image: getImageUrl(item),
          title: `Property View ${index + 1}`,
        };
      }

      return {
        id: item?._id || item?.id || index,
        image: getImageUrl(item?.url || item?.image || item?.thumbnail || ""),
        title: item?.title || item?.caption || `Property View ${index + 1}`,
      };
    })
    .filter((item) => item.image);
};

// ======================================================
// COMPONENT
// ======================================================

export default function Gallery({
  images = [],
  title = "Property Showcase",
  description = "Discover premium properties from verified listings across top locations.",
}) {
  const galleryImages = normalizeImages(images);

  if (!galleryImages.length) {
    return null;
  }

  const heroImage = galleryImages[0];

  const sideImages = galleryImages.slice(1, 5);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}

        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* GALLERY */}

        <div className={styles.galleryLayout}>
          {/* HERO */}

          <article className={styles.heroCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={heroImage.image}
                alt={heroImage.title}
                fill
                priority
                unoptimized
                className={styles.image}
              />
            </div>
          </article>

          {/* GRID */}

          <div className={styles.rightGrid}>
            {sideImages.map((item, index) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className={styles.image}
                  />

                  {index === 3 && (
                    <Link href="/properties" className={styles.ctaOverlay}>
                      <span className={styles.ctaText}>View More Photos</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
