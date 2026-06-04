"use client";

// ======================================================
// File: frontend/components/admin/property/PropertiesPage.jsx
// Description: Admin Properties Dashboard Page
// ======================================================

import { useEffect, useMemo, useState } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";

import styles from "./PropertiesPage.module.css";

import {
  getAdminProperties,
  deleteProperty as deletePropertyApi,
} from "@/services/propertyApi";

import PropertiesHeader from "./PropertiesHeader";
import PropertyStats from "./PropertyStats";
import PropertyFilters from "./PropertyFilters";
import PropertyTable from "./PropertyTable";
import PropertyPagination from "./PropertyPagination";
import EmptyPropertyState from "./EmptyPropertyState";
import LoadingPropertySkeleton from "./LoadingPropertySkeleton";

export default function PropertiesPage() {
  // ======================================================
  // STATE
  // ======================================================

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [propertyType, setPropertyType] = useState("all");

  const [location, setLocation] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  // ======================================================
  // FETCH PROPERTIES
  // ======================================================

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const result = await getAdminProperties();

      console.log("ADMIN PROPERTY RESPONSE:", result);

      const propertyList = Array.isArray(result?.properties)
        ? result.properties
        : [];

      setProperties(propertyList);
    } catch (error) {
      console.error("Failed to fetch properties:", error);

      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // DELETE PROPERTY
  // ======================================================

  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      await deletePropertyApi(propertyId);

      setProperties((prev) => prev.filter((item) => item._id !== propertyId));
    } catch (error) {
      console.error("Delete error:", error);

      alert(error?.message || "Failed to delete property");
    }
  };

  // ======================================================
  // STATUS TOGGLE
  // ======================================================

  const handleStatusToggle = async () => {
    alert("Status toggle API not implemented yet");
  };

  // ======================================================
  // RESET PAGINATION
  // ======================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, propertyType, location]);

  // ======================================================
  // FILTERED PROPERTIES
  // ======================================================

  const filteredProperties = useMemo(() => {
    if (!Array.isArray(properties)) {
      return [];
    }

    return properties.filter((property) => {
      const title = property?.title || "";

      const city = property?.location?.city || "";

      const type = property?.type || "";

      const propertyStatus = property?.status || "";

      const matchesSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        city.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" || propertyStatus === status;

      const matchesType = propertyType === "all" || type === propertyType;

      const matchesLocation = location === "all" || city === location;

      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
  }, [properties, search, status, propertyType, location]);

  // ======================================================
  // PAGINATION
  // ======================================================

  const totalPages = Math.ceil(filteredProperties.length / rowsPerPage) || 1;

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // ======================================================
  // STATS
  // ======================================================

  const stats = {
    total: properties.length,

    published: properties.filter((item) => item.status === "available").length,

    draft: properties.filter((item) => item.status === "pending").length,

    archived: properties.filter((item) => item.status === "sold").length,
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className={styles.layout}>
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <main className={styles.content}>
        <section className={styles.page}>
          {/* HEADER */}
          <PropertiesHeader />

          {/* KPI STATS */}
          <PropertyStats stats={stats} />

          {/* DASHBOARD CARD */}
          <section className={styles.card}>
            {/* FILTERS */}
            <PropertyFilters
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              location={location}
              setLocation={setLocation}
            />

            {/* CONTENT */}
            {loading ? (
              <LoadingPropertySkeleton />
            ) : filteredProperties.length === 0 ? (
              <EmptyPropertyState />
            ) : (
              <>
                <PropertyTable
                  properties={paginatedProperties}
                  onDelete={handleDelete}
                  onToggleStatus={handleStatusToggle}
                />

                <PropertyPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  totalItems={filteredProperties.length}
                  rowsPerPage={rowsPerPage}
                />
              </>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
