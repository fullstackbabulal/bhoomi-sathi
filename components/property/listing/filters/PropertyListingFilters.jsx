"use client";

// ======================================================
// File: components/property/listing/filters/PropertyListingFilters.jsx
// Description: Simple Property Search Bar
// ======================================================

import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./PropertyListingFilters.module.css";

export default function PropertyListingFilters() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  // ======================================================
  // LOCAL STATE
  // ======================================================
  const [city, setCity] = useState(searchParams.get("city") || "");

  const [type, setType] = useState(searchParams.get("type") || "");

  // ======================================================
  // SEARCH
  // ======================================================
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (city.trim()) {
      params.set("city", city.trim());
    }

    if (type) {
      params.set("type", type);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // ======================================================
  // RESET
  // ======================================================
  const handleReset = () => {
    setCity("");
    setType("");

    router.push(pathname);
  };

  // ======================================================
  // ENTER KEY SEARCH
  // ======================================================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          {/* LOCATION */}
          <input
            type="text"
            placeholder="Enter city or locality"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />

          {/* PROPERTY TYPE */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.select}
          >
            <option value="">All Types</option>

            <option value="plot">Plot</option>

            <option value="apartment">Apartment</option>

            <option value="house">House</option>

            <option value="villa">Villa</option>

            <option value="commercial">Commercial</option>
          </select>

          {/* SEARCH */}
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleSearch}
          >
            Search
          </button>

          {/* RESET */}
          {(city || type) && (
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
