// ======================================================
// File: app/properties/page.tsx
// Description: Property Listing Page
// ======================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  PropertyListingHero,
  PropertyListingFilters,
  PropertyListingCategories,
  PropertyListingSection,
  PropertyHighlights,
} from "@/components/property/listing";

import { fetchProperties } from "@/services/propertyApi";

export default async function PropertiesPage() {
  let properties: any[] = [];

  try {
    const response = await fetchProperties();

    // ==================================================
    // SAFE PROPERTY ACCESS
    // ==================================================
    properties =
      response?.properties ||
      response?.data?.properties ||
      response?.data?.data ||
      [];
  } catch (error) {
    console.error("Property fetch error:", error);
  }

  // ====================================================
  // GROUP BY PROPERTY TYPE
  // ====================================================
  const plotProperties =
    properties.filter((item: any) => item?.type?.toLowerCase() === "plot") ||
    [];

  const apartmentProperties =
    properties.filter(
      (item: any) => item?.type?.toLowerCase() === "apartment",
    ) || [];

  const houseProperties =
    properties.filter((item: any) => item?.type?.toLowerCase() === "house") ||
    [];

  const villaProperties =
    properties.filter((item: any) => item?.type?.toLowerCase() === "villa") ||
    [];

  const commercialProperties =
    properties.filter(
      (item: any) => item?.type?.toLowerCase() === "commercial",
    ) || [];

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main>
        {/* HERO */}
        <PropertyListingHero />

        {/* FILTERS */}
        <PropertyListingFilters />

        {/* CATEGORIES */}
        <PropertyListingCategories />

        {/* PLOT */}
        <PropertyListingSection
          title="Plot Properties"
          subtitle="Explore verified residential and commercial plots for investment and development."
          properties={plotProperties}
          type="plot"
        />

        {/* APARTMENT */}
        <PropertyListingSection
          title="Apartment Properties"
          subtitle="Discover premium apartments designed for modern and comfortable living."
          properties={apartmentProperties}
          type="apartment"
        />

        {/* HOUSE */}
        <PropertyListingSection
          title="House Properties"
          subtitle="Browse independent houses and family homes in prime locations."
          properties={houseProperties}
          type="house"
        />

        {/* VILLA */}
        <PropertyListingSection
          title="Villa Properties"
          subtitle="Luxury villas with premium amenities and spacious living."
          properties={villaProperties}
          type="villa"
        />

        {/* COMMERCIAL */}
        <PropertyListingSection
          title="Commercial Properties"
          subtitle="Explore shops, office spaces, and business-ready commercial properties."
          properties={commercialProperties}
          type="commercial"
        />

        {/* HIGHLIGHTS */}
        <PropertyHighlights />
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
