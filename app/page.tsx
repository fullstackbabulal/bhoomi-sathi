// ======================================================
// File: app/page.tsx
// Description: Home Route Entry
// ======================================================

import Home from "@/pages/home";
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
}
