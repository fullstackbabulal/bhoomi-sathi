"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import AboutHero from "../../components/about/AboutHero";
import WhoWeAre from "../../components/about/WhoWeAre";
import MissionVision from "../../components/about/MissionVision";
import WhyChooseUs from "../../components/about/WhyChooseUs";
import HowItWorks from "../../components/about/HowItWorks";
import StatsSection from "../../components/about/StatsSection";
import LeadershipSection from "../../components/about/LeadershipSection";
import TestimonialsSection from "../../components/about/TestimonialsSection";
import AboutCTA from "../../components/about/AboutCTA";
import Footer from "@/components/layout/Footer";

import {
  getAboutPageData,
  getAboutStructuredData,
} from "../../services/aboutService";

import aboutFallbackData from "../../data/aboutFallbackData";

/**
 * About Page
 * ----------------------------------------
 * Production-ready
 * API-driven
 * SEO-ready
 * Backward compatible
 * Accessible
 * Performance optimized
 *
 * Rule:
 * UI never breaks if API fails
 */

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(aboutFallbackData);

  const [loading, setLoading] = useState(true);

  /**
   * Fetch page content
   */
  useEffect(() => {
    const loadAboutPage = async () => {
      try {
        const data = await getAboutPageData();

        setAboutData(data || aboutFallbackData);
      } catch (error) {
        console.error("Failed to load about page:", error);

        setAboutData(aboutFallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadAboutPage();
  }, []);

  /**
   * Inject JSON-LD
   * SEO Structured Data
   */
  useEffect(() => {
    const injectStructuredData = async () => {
      try {
        const structuredData = await getAboutStructuredData();

        const existingScript = document.getElementById("about-json-ld");

        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement("script");

        script.id = "about-json-ld";

        script.type = "application/ld+json";

        script.innerHTML = JSON.stringify(structuredData?.organization || {});

        document.head.appendChild(script);
      } catch (error) {
        console.error("Failed to inject structured data:", error);
      }
    };

    injectStructuredData();

    return () => {
      const script = document.getElementById("about-json-ld");

      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="about-page" aria-label="About Bhoomi Sathi Page">
        <AboutHero data={aboutData.hero} loading={loading} />

        <WhoWeAre data={aboutData.whoWeAre} loading={loading} />

        <MissionVision data={aboutData.missionVision} loading={loading} />

        <WhyChooseUs data={aboutData.whyChooseUs} loading={loading} />

        <HowItWorks data={aboutData.process} loading={loading} />

        <StatsSection data={aboutData.stats} loading={loading} />

        <LeadershipSection data={aboutData.leadership} loading={loading} />

        <TestimonialsSection data={aboutData.testimonials} loading={loading} />

        <AboutCTA data={aboutData.cta} loading={loading} />
      </main>
      <Footer />
    </>
  );
}
