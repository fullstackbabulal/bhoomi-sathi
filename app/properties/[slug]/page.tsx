// ======================================================
// File: app/properties/[slug]/page.tsx
// Description: Property Details Page
// ======================================================

import PropertyDetailsPage from "@/components/property/details/PropertyDetailsPage";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  try {
    console.log("Slug:", slug);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log("API URL:", apiUrl);

    const response = await fetch(`${apiUrl}/api/properties/slug/${slug}`, {
      cache: "no-store",
    });

    console.log("Response status:", response.status);

    const result = await response.json();

    console.log("Property response:", result);

    const property = result?.data || null;

    return <PropertyDetailsPage property={property} />;
  } catch (error) {
    console.error("Property fetch error:", error);

    return <PropertyDetailsPage property={null} />;
  }
}
