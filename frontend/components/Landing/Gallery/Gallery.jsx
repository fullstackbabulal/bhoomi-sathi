// ======================================================
// File: components/Landing/Gallery/Gallery.jsx
// Description: Project Gallery Section
// ======================================================

"use client";

import Image from "next/image";
import { Camera, Maximize2 } from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Button from "@/components/ui/Button/Button";

import styles from "./Gallery.module.css";

// ======================================================
// GALLERY DATA
// ======================================================

const GALLERY_IMAGES = [
  {
    id: 1,
    title: "Main Entrance",
    image: "/images/project/hero.png",
  },
  {
    id: 2,
    title: "40 Ft Roads",
    image: "/images/project/Plot-in-patna-2.jpeg",
  },
  {
    id: 3,
    title: "Residential Zone",
    image: "/images/project/Residential-Zone.png",
  },
  {
    id: 4,
    title: "Park Area",
    image: "/images/project/Park-Area.png",
  },
  {
    id: 5,
    title: "Drone View",
    image: "/images/project/Drone-View.png",
    large: true,
  },
  {
    id: 6,
    title: "Commercial Area",
    image: "/images/project/Commercial-Area.png",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function Gallery() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Gallery"
          title="Explore The Township"
          subtitle="Take a closer look at the project layout, roads, green areas and development progress."
        />

        <div className={styles.masonryGrid}>
          {GALLERY_IMAGES.map((item) => (
            <div
              key={item.id}
              className={`${styles.card} ${item.large ? styles.large : ""}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                quality={90}
                className={styles.image}
                sizes={
                  item.large
                    ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />

              <div className={styles.overlay}>
                <div>
                  <h3>{item.title}</h3>
                </div>

                <button
                  type="button"
                  className={styles.zoomBtn}
                  aria-label={`View ${item.title}`}
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button size="lg" type="button">
            <Camera size={18} />
            View Complete Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
