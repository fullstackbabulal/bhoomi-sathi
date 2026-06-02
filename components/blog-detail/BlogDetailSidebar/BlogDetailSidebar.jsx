"use client";

// ======================================================
// File: components/blog-detail/BlogDetailSidebar/BlogDetailSidebar.jsx
// Description: Blog Detail Sidebar
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import styles from "./BlogDetailSidebar.module.css";

import TableOfContents from "../TableOfContents/TableOfContents";

import PopularPostsCard from "@/components/blog/PopularPostsCard/PopularPostsCard";
import BlogCategoriesCard from "@/components/blog/BlogCategoriesCard/BlogCategoriesCard";
import BlogNewsletter from "@/components/blog/BlogNewsletter/BlogNewsletter";

// ======================================================
// SAMPLE DATA
// ======================================================

const DEFAULT_CATEGORIES = [
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

export default function BlogDetailSidebar({
  content = "",

  popularPosts = [],

  categories = DEFAULT_CATEGORIES,

  activeCategory = "",

  onCategoryClick = () => {},

  onSubscribe = () => {},
}) {
  // ====================================================
  // RENDER
  // ====================================================

  return (
    <aside className={styles.sidebar}>
      {/* TABLE OF CONTENTS */}
      <TableOfContents content={content} />

      {/* POPULAR POSTS */}
      <PopularPostsCard posts={popularPosts} />

      {/* CATEGORIES */}
      <BlogCategoriesCard
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />

      {/* NEWSLETTER */}
      <BlogNewsletter onSubscribe={onSubscribe} />
    </aside>
  );
}
