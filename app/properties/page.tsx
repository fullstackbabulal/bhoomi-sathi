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

type SearchParams = {
  city?: string;
  type?: string;
  keyword?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  let properties: any[] = [];

  try {
    // ==========================================
    // BACKEND FILTERS
    // ==========================================
    const response = await fetchProperties({
      city: params?.city || "",

      type: params?.type || "",

      keyword: params?.keyword || "",

      minPrice: params?.minPrice || "",

      maxPrice: params?.maxPrice || "",

      sort: params?.sort || "",
    });

    properties =
      response?.properties ||
      response?.data?.properties ||
      response?.data?.data ||
      [];
  } catch (error) {
    console.error("Property fetch error:", error);
  }

  // ==========================================
  // CATEGORY GROUPING
  // Only when no type filter
  // ==========================================
  const groupedProperties = {
    plot:
      properties.filter((item: any) => item?.type?.toLowerCase() === "plot") ||
      [],

    apartment:
      properties.filter(
        (item: any) => item?.type?.toLowerCase() === "apartment",
      ) || [],

    house:
      properties.filter((item: any) => item?.type?.toLowerCase() === "house") ||
      [],

    villa:
      properties.filter((item: any) => item?.type?.toLowerCase() === "villa") ||
      [],

    commercial:
      properties.filter(
        (item: any) => item?.type?.toLowerCase() === "commercial",
      ) || [],
  };

  const selectedType = params?.type?.toLowerCase();

  const isFiltered = Boolean(
    params?.city ||
    params?.keyword ||
    params?.minPrice ||
    params?.maxPrice ||
    params?.type,
  );

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main>
        {/* HERO */}
        <PropertyListingHero />

        {/* FILTERS */}
        <PropertyListingFilters />

        {/* CATEGORY NAV */}
        {!isFiltered && <PropertyListingCategories />}

        {/* ===================================== */}
        {/* FILTERED RESULT */}
        {/* ===================================== */}
        {isFiltered ? (
          <PropertyListingSection
            title="Search Results"
            subtitle={`${properties.length} properties found`}
            properties={properties}
            type={selectedType || "all"}
          />
        ) : (
          <>
            {/* PLOT */}
            <PropertyListingSection
              title="Plot Properties"
              subtitle="Explore verified residential and commercial plots for investment and development."
              properties={groupedProperties.plot}
              type="plot"
            />

            {/* APARTMENT */}
            <PropertyListingSection
              title="Apartment Properties"
              subtitle="Discover premium apartments designed for modern and comfortable living."
              properties={groupedProperties.apartment}
              type="apartment"
            />

            {/* HOUSE */}
            <PropertyListingSection
              title="House Properties"
              subtitle="Browse independent houses and family homes in prime locations."
              properties={groupedProperties.house}
              type="house"
            />

            {/* VILLA */}
            <PropertyListingSection
              title="Villa Properties"
              subtitle="Luxury villas with premium amenities and spacious living."
              properties={groupedProperties.villa}
              type="villa"
            />

            {/* COMMERCIAL */}
            <PropertyListingSection
              title="Commercial Properties"
              subtitle="Explore shops, office spaces, and business-ready commercial properties."
              properties={groupedProperties.commercial}
              type="commercial"
            />
          </>
        )}

        {/* HIGHLIGHTS */}
        <PropertyHighlights />
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
