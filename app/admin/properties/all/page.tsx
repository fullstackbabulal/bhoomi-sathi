"use client";

// ======================================================
// File: frontend/app/admin/properties/all/page.tsx
// Description: Admin All Properties Page
// ======================================================

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PropertiesPage from "@/components/admin/property/PropertiesPage";

// ======================================================
// PAGE
// ======================================================

export default function AllPropertiesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <PropertiesPage />
    </ProtectedRoute>
  );
}
