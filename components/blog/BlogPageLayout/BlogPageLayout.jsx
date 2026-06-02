"use client";

// ======================================================
// File: components/blog/BlogPageLayout/BlogPageLayout.jsx
// Description: Blog Page Layout
// UI Match: Bhoomi Sathi Blog Page
// ======================================================

import { useState } from "react";

import styles from "./BlogPageLayout.module.css";

import BlogCategoryTabs from "../BlogCategoryTabs/BlogCategoryTabs";
import BlogGrid from "../BlogGrid/BlogGrid";
import BlogSidebar from "../BlogSidebar/BlogSidebar";
import BlogPagination from "../BlogPagination/BlogPagination";

// ======================================================
// SAMPLE DATA
// ======================================================

const CATEGORY_TABS = [
  "All",
  "Investment",
  "Buying Guide",
  "Home Loan",
  "Market Trends",
  "Luxury Homes",
];

const SIDEBAR_CATEGORIES = [
  {
    name: "Investment",
    count: 18,
  },

  {
    name: "Buying Guide",
    count: 12,
  },

  {
    name: "Home Loan",
    count: 9,
  },

  {
    name: "Market Trends",
    count: 15,
  },

  {
    name: "Luxury Homes",
    count: 7,
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function BlogPageLayout({
  blogs = [],

  categories = CATEGORY_TABS,

  sidebarCategories = SIDEBAR_CATEGORIES,

  popularPosts = [],

  totalPages = 8,
}) {
  // ====================================================
  // STATE
  // ====================================================

  const [activeCategory, setActiveCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  // ====================================================
  // FILTER BLOGS
  // ====================================================

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  // ====================================================
  // HANDLERS
  // ====================================================

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (email) => {
    console.log("Newsletter:", email);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* LEFT */}
          <div className={styles.left}>
            {/* CATEGORY TABS */}
            <BlogCategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onChange={handleCategoryChange}
            />

            {/* BLOG GRID */}
            <BlogGrid blogs={filteredBlogs.length ? filteredBlogs : blogs} />

            {/* PAGINATION */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
            <BlogSidebar
              categories={sidebarCategories}
              popularPosts={popularPosts}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryChange}
              onSubscribe={handleSubscribe}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
