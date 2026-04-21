import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import { getProperties } from "@/lib/api";

export default async function HomePage() {
  let properties: any[] = [];

try {
  const res = await getProperties();

  console.log("API RESPONSE:", res);

  // 🔥 FORCE ARRAY EXTRACTION
  const data = res?.data;

  if (Array.isArray(data)) {
    properties = data;
  } else if (Array.isArray(data?.data)) {
    properties = data.data;
  } else if (Array.isArray(data?.properties)) {
    properties = data.properties;
  } else {
    properties = [];
  }
} catch (err) {
  console.error(err);
}

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProperties properties={properties} />
      <Gallery />
      <Testimonials />
    </>
  );
}