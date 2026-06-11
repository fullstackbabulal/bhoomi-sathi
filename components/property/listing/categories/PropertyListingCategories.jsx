"use client";

// ======================================================
// File: components/property/listing/categories/
// PropertyListingCategories.jsx
// Description: Property Listing Categories Section
// ======================================================

import { useDispatch, useSelector } from "react-redux";

import { setFilters } from "@/store/filterSlice";

import CategoryCard from "./CategoryCard";

import styles from "./PropertyListingCategories.module.css";

const categories = [
  {
    id: 1,
    title: "Plot",
    type: "plot",
    icon: "📍",
    count: "120+",
  },
  {
    id: 2,
    title: "Apartment",
    type: "apartment",
    icon: "🏢",
    count: "340+",
  },
  {
    id: 3,
    title: "House",
    type: "house",
    icon: "🏠",
    count: "180+",
  },
  {
    id: 4,
    title: "Villa",
    type: "villa",
    icon: "🏡",
    count: "95+",
  },
  {
    id: 5,
    title: "Commercial",
    type: "commercial",
    icon: "🏬",
    count: "210+",
  },
];

export default function PropertyListingCategories() {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);

  // ======================================================
  // HANDLE CATEGORY CLICK
  // ======================================================
  const handleSelectCategory = (type) => {
    dispatch(
      setFilters({
        type: filters?.type === type ? "" : type,
      }),
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.badge}>Explore Categories</span>

          <h2 className={styles.title}>Browse Properties By Type</h2>

          <p className={styles.subtitle}>
            Explore verified plots, apartments, houses, villas, and commercial
            properties tailored to your needs.
          </p>
        </div>

        {/* CATEGORY LIST */}
        <div className={styles.categoryWrapper}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              count={category.count}
              active={filters?.type === category.type}
              onClick={() => handleSelectCategory(category.type)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
