// ======================================================
// File: app/admin/properties/add/page.jsx
// Description: Add Property Page Integration
// ======================================================

import AddProperty from "@/components/property/add/AddProperty";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// ======================================================
// METADATA
// ======================================================

export const metadata = {
  title: "Add Property | Bhoomi Sathi Admin",

  description:
    "Create and publish premium property listings in Bhoomi Sathi admin dashboard.",
};

// ======================================================
// PAGE
// ======================================================

const AddPropertyPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AddProperty />
    </ProtectedRoute>
  );
};

export default AddPropertyPage;
