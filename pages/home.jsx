"use client";

// ======================================================
// File: frontend/pages/home.jsx
// Description: Home Page
// ======================================================

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import LatestBlog from "@/components/home/LatestBlog";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/layout/Footer";

// ======================================================
// COMPONENT
// ======================================================
const Home = ({ properties = [] }) => {
  // ==========================================
  // SAFE PROPERTIES
  // ==========================================
  const safeProperties = Array.isArray(properties) ? properties : [];

  // ==========================================
  // GALLERY IMAGES FROM DB
  // ==========================================
  const galleryImages = safeProperties.flatMap((property) => {
    const propertyImages = Array.isArray(property?.images)
      ? property.images
      : [];

    return propertyImages
      .filter((image) => image?.url)
      .map((image, index) => ({
        id: image?._id || `${property._id}-${index}`,

        image: image.url,

        title: property?.title || "Property Image",
      }));
  });

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <FeaturedProperties properties={safeProperties} />

        <Gallery
          images={galleryImages}
          title="Property Gallery"
          description="Explore premium properties directly fetched from our latest listings."
        />

        <Testimonials />

        <LatestBlog />

        <CallToAction />
      </main>

      <Footer />
    </>
  );
};

export default Home;
