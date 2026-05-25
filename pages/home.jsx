"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import LatestBlog from "@/components/home/LatestBlog";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/layout/Footer";

const Home = ({ properties }) => {
  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <FeaturedProperties properties={safeProperties} />

        <Gallery />

        <Testimonials />

        <LatestBlog />

        <CallToAction />
      </main>

      <Footer />
    </>
  );
};

export default Home;
