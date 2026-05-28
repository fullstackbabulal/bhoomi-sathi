"use client";

import Image from "next/image";
import styles from "./Gallery.module.css";

// ======================================================
// FALLBACK IMAGES
// ======================================================
const FALLBACK_IMAGES = [
  {
    id: 1,
    image: "https://placehold.co/1200x800?text=Luxury+Living+Room",
    title: "Luxury Living Room",
  },
];

// ======================================================
// HELPERS
// ======================================================
const isValidImageUrl = (value) => {
  if (!value || typeof value !== "string") {
    return false;
  }

  // local uploads path
  if (value.startsWith("/")) {
    return true;
  }

  // external URL
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
  description = "Explore premium property visuals and discover beautiful living spaces.",
}) {
  // ====================================================
  // SAFE IMAGES
  // ====================================================
  const galleryImages = Array.isArray(images)
    ? images
        .map((item, index) => {
          const imageUrl =
            typeof item === "string" ? item : item?.image || item?.url || "";

          const imageTitle = item?.title || `Property View ${index + 1}`;

          return {
            id: item?.id || index,

            image: imageUrl,

            title: imageTitle,
          };
        })
        .filter((item) => isValidImageUrl(item.image))
    : [];

  const finalImages =
    galleryImages.length > 0 ? galleryImages : FALLBACK_IMAGES;

  // ====================================================
  // RENDER
  // ====================================================
  return (
    <section className={styles.gallerySection}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Gallery</span>

          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* Gallery */}
        <div className={styles.galleryGrid}>
          {finalImages.map((item, index) => (
            <article key={item.id} className={styles.card}>
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

                <div className={styles.overlayContent}>
                  <h4 className={styles.overlayTitle}>{item.title}</h4>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
