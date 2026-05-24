/* frontend/components/home/Gallery.jsx */

"use client";

import Image from "next/image";
import styles from "./Gallery.module.css";

const FALLBACK_IMAGES = [
  {
    id: 1,
    image: "https://placehold.co/1200x800?text=Luxury+Living+Room",
  },
  {
    id: 2,
    image: "https://placehold.co/1200x800?text=Modern+Villa",
  },
  {
    id: 3,
    image: "https://placehold.co/1200x800?text=Premium+Interior",
  },
];

export default function Gallery({
  images = [],
  title = "Property Gallery",
  description = "Explore premium property visuals and discover beautiful living spaces.",
}) {
  const galleryImages =
    Array.isArray(images) && images.length > 0
      ? images.filter(Boolean)
      : FALLBACK_IMAGES;

  const hasImages = galleryImages.length > 0;

  return (
    <section
      className={styles.gallerySection}
      aria-labelledby="gallery-heading"
    >
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Gallery</span>

          <h2 id="gallery-heading" className={styles.title}>
            {title}
          </h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* Empty State */}
        {!hasImages ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🖼️</div>

            <h3 className={styles.emptyTitle}>No Images Available</h3>

            <p className={styles.emptyDescription}>
              Gallery images will appear here once property photos are uploaded.
            </p>
          </div>
        ) : (
          <div className={styles.galleryGrid}>
            {galleryImages.map((item, index) => {
              const imageUrl = typeof item === "string" ? item : item?.image;

              const imageTitle = typeof item === "object" ? item?.title : null;

              return (
                <article
                  key={item?.id || imageUrl || index}
                  className={styles.card}
                >
                  {/* Image */}
                  <div className={styles.imageWrapper}>
                    <Image
                      src={imageUrl || FALLBACK_IMAGES[0].image}
                      alt={imageTitle || `Property gallery image ${index + 1}`}
                      fill
                      priority={index < 2}
                      className={styles.image}
                      sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw
                      "
                      unoptimized
                    />

                    {/* Overlay */}
                    <div className={styles.overlay} />

                    <div className={styles.overlayContent}>
                      <h4 className={styles.overlayTitle}>
                        {imageTitle || `Property View ${index + 1}`}
                      </h4>

                      <p className={styles.overlayText}>
                        Explore premium property visuals
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className={styles.cardFooter}>
                    <span className={styles.imageLabel}>
                      {imageTitle || `Image ${index + 1}`}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
