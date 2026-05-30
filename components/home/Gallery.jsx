"use client";

// ======================================================
// File: components/home/Gallery.jsx
// Description: Property Gallery
// UI Match: Bhoomi Sathi Target Homepage
// ======================================================

import Image from "next/image";
import styles from "./Gallery.module.css";

const FALLBACK_IMAGES = [
  {
    id: 1,
    image: "https://placehold.co/1200x900?text=Luxury+Villa",
    title: "Luxury Villa",
  },
  {
    id: 2,
    image: "https://placehold.co/1200x900?text=Modern+Apartment",
    title: "Modern Apartment",
  },
  {
    id: 3,
    image: "https://placehold.co/1200x900?text=Commercial+Space",
    title: "Commercial Space",
  },
];

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

export default function Gallery({
  images = [],
  title = "Property Gallery",
  description = "Explore beautiful spaces from premium verified properties.",
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
    galleryImages.length > 0 ? galleryImages.slice(0, 6) : FALLBACK_IMAGES;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.badge}>Gallery</span>

          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* GRID */}
        <div className={styles.galleryGrid}>
          {finalImages.map((item, index) => (
            <article
              key={item.id}
              className={`${styles.card} ${
                index % 3 === 0 ? styles.large : ""
              }`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 2}
                  className={styles.image}
                  sizes="
                    (max-width:768px) 100vw,
                    (max-width:1200px) 50vw,
                    33vw
                  "
                  unoptimized
                />

                <div className={styles.overlay} />

                <div className={styles.content}>
                  <span className={styles.caption}>Premium Property</span>

                  <h3 className={styles.imageTitle}>{item.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
