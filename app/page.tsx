// ======================================================
// File: app/page.tsx
// Description: Home Route Entry
// Public landing page
// ======================================================

import Home from "@/pages/home";

import { fetchProperties } from "@/services/propertyApi";

// ======================================================
// PAGE
// ======================================================
export default async function Page() {
  let properties: unknown[] = [];

  try {
    const res = await fetchProperties();

    const data = res?.data;

    // ==============================================
    // API RESPONSE NORMALIZATION
    // ==============================================
    if (Array.isArray(data)) {
      properties = data;
    } else if (Array.isArray(data?.data)) {
      properties = data.data;
    } else if (Array.isArray(data?.properties)) {
      properties = data.properties;
    }
  } catch (error) {
    console.error("Failed to fetch properties:", error);
  }

  // ==============================================
  // PUBLIC HOME PAGE
  // ==============================================
  return <Home properties={properties} />;
}
