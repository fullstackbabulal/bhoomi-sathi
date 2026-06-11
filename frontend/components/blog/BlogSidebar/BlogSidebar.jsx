"use client";

// ======================================================
// File: components/blog/BlogSidebar/BlogSidebar.jsx
// Description: Blog Sidebar
// UI Match: Plot in Patna Blog Page
// ======================================================

import styles from "./BlogSidebar.module.css";

import BlogCategoriesCard from "../BlogCategoriesCard/BlogCategoriesCard";
import PopularPostsCard from "../PopularPostsCard/PopularPostsCard";
import BlogNewsletter from "../BlogNewsletter/BlogNewsletter";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogSidebar({
  categories = [],

  popularPosts = [],

  activeCategory = "",

  onCategoryClick = () => {},

  onSubscribe = () => {},
}) {
  return (
    <aside className={styles.sidebar}>
      {/* CATEGORIES */}
      <BlogCategoriesCard
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />

      {/* POPULAR POSTS */}
      <PopularPostsCard posts={popularPosts} />

      {/* NEWSLETTER */}
      <BlogNewsletter onSubscribe={onSubscribe} />
    </aside>
  );
}
