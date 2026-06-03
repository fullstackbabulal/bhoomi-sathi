"use client";

// ======================================================
// File: components/home/Gallery.jsx
// Description: Property Gallery
// UI Match: Plot in Patna Target Homepage
// ======================================================

import Image from "next/image";
import styles from "./Gallery.module.css";
import Link from "next/link";

// ======================================================
// FALLBACK IMAGES
// ======================================================

const FALLBACK_IMAGES = [
  {
    id: 1,
    image: "https://placehold.co/1200x900?text=Luxury+Living+Room",
    title: "Luxury Living Room",
  },
  {
    id: 2,
    image: "https://placehold.co/1200x900?text=Modern+Villa",
    title: "Modern Villa",
  },
  {
    id: 3,
    image: "https://placehold.co/1200x900?text=Premium+Bedroom",
    title: "Premium Bedroom",
  },
  {
    id: 4,
    image: "https://placehold.co/1200x900?text=Dining+Area",
    title: "Dining Area",
  },
  {
    id: 5,
    image: "https://placehold.co/1200x900?text=Luxury+Interior",
    title: "Luxury Interior",
  },
];

// ======================================================
// HELPERS
// ======================================================

const isValidImageUrl = (value) => {
  if (!value || typeof value !== "string") {
    return false;
  }

  if (value.startsWith("/")) {
    return true;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// ======================================================
// COMPONENT
// ======================================================

export default function Gallery({
  images = [],
  title = "Property Gallery",
  description = "Discover premium properties from verified listings across top locations.",
}) {
  const galleryImages = Array.isArray(images)
    ? images
        .map((item, index) => {
          const image =
            typeof item === "string" ? item : item?.image || item?.url || "";

          return {
            id: item?.id || index,
            image,
            title: item?.title || `Property View ${index + 1}`,
          };
        })
        .filter((item) => isValidImageUrl(item.image))
    : [];

  const finalImages =
    galleryImages.length >= 5 ? galleryImages.slice(0, 5) : FALLBACK_IMAGES;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* SHOWCASE GRID */}
        <div className={styles.galleryLayout}>
          {/* LEFT LARGE IMAGE */}
          <article className={styles.heroCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={finalImages[0].image}
                alt={finalImages[0].title}
                fill
                priority
                className={styles.image}
                unoptimized
              />
            </div>
          </article>

          {/* RIGHT GRID */}
          <div className={styles.rightGrid}>
            {finalImages.slice(1, 5).map((item, index) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                    unoptimized
                  />
                  {/* CTA LAST CARD */}
                  {index === 3 && (
                    <Link
                      href="/properties"
                      className={styles.ctaOverlay}
                      aria-label="View more property photos"
                    >
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
