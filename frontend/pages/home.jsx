"use client";

// ======================================================
// File: frontend/pages/home.jsx
// Description: Home Page
// ======================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Category from "@/components/home/Category";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import LatestBlog from "@/components/home/LatestBlog";
import CallToAction from "@/components/home/CallToAction";
import WhyChoose from "@/components/home/WhyChoose";

import styles from "./Home.module.css";

// ======================================================
// COMPONENT
// ======================================================

const Home = ({ properties = [] }) => {
  // ==========================================
  // SAFE PROPERTIES
  // ==========================================
  const safeProperties = Array.isArray(properties) ? properties : [];

  // ==========================================
  // GALLERY IMAGES
  // LIMIT TO PREVENT HEAVY PAGE
  // ==========================================
  const galleryImages = safeProperties
    .flatMap((property) => {
      const images = Array.isArray(property?.images) ? property.images : [];

      return images
        .filter((image) => image?.url)
        .map((image, index) => ({
          id: image?._id || `${property?._id}-${index}`,

          image: image.url,
          title: property?.title || "Property Image",
        }));
    })
    .slice(0, 8);

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <Navbar />

      <main className={styles.main}>
        {/* HERO */}
        <Hero />

        {/* FEATURED PROPERTIES */}
        <section className={styles.spacingLg}>
          <FeaturedProperties properties={safeProperties} />
        </section>

        {/* CATEGORY + GALLERY */}
        <section className={`${styles.splitSection} ${styles.spacingLg}`}>
          <Category />

          <Gallery
            images={galleryImages}
            title="Property Showcase"
            description="Discover premium properties from verified listings across top locations."
          />
        </section>

        {/* WHY CHOOSE */}
        <section className={styles.spacingLg}>
          <WhyChoose />
        </section>

        {/* TESTIMONIALS + BLOG */}
        <section className={`${styles.equalSplit} ${styles.spacingLg}`}>
          <Testimonials />
          <LatestBlog />
        </section>

        {/* CTA */}
        <section className={styles.spacingLg}>
          <CallToAction />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
