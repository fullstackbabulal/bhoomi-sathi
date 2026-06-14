// ======================================================
// File: app/page.tsx
// Description: Home Route Entry
// ======================================================

/*import Home from "@/pages/home";
import { fetchProperties } from "@/services/propertyApi";
// ======================================================
// PAGE
// ======================================================
export default async function Page() {
  let properties = [];

  try {
    const response = await fetchProperties();

    properties = response?.properties || [];
  } catch (error) {
    console.error("Failed to fetch properties:", error);
  }

  return <Home properties={properties} />;
}*/

import Hero from "@/components/Landing/Hero/Hero";
import TrustBar from "@/components/Landing/TrustBar/TrustBar";
import PriceList from "@/components/Landing/PriceList/PriceList";
import ProjectOverview from "@/components/Landing/ProjectOverview/ProjectOverview";
import LocationAdvantages from "@/components/Landing/LocationAdvantages/LocationAdvantages";
import MasterPlan from "@/components/Landing/MasterPlan/MasterPlan";
import Amenities from "@/components/Landing/Amenities/Amenities";
import PlotAvailability from "@/components/Landing/PlotAvailability/PlotAvailability";
import InvestmentHighlights from "@/components/Landing/InvestmentHighlights/InvestmentHighlights";
import Gallery from "@/components/Landing/Gallery/Gallery";
import EmiCalculator from "@/components/Landing/EmiCalculator/EmiCalculator";
import SiteVisitForm from "@/components/Landing/SiteVisitForm/SiteVisitForm";
import Testimonials from "@/components/Landing/Testimonials/Testimonials";
import CTASection from "@/components/Landing/CTASection/CTASection";
import StickyMobileCTA from "@/components/Landing/StickyMobileCTA/StickyMobileCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <PriceList />

      <LocationAdvantages />
      <MasterPlan />
      <Amenities />
      <PlotAvailability />
      <InvestmentHighlights />
      <Gallery />
      <EmiCalculator />
      <SiteVisitForm />
      <Testimonials />
      <CTASection />
      <StickyMobileCTA />
      <Footer />
    </>
  );
}
