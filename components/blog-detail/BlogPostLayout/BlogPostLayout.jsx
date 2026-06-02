"use client";

// ======================================================
// File: components/blog-detail/BlogPostLayout/BlogPostLayout.jsx
// Description: Blog Post Layout
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import styles from "./BlogPostLayout.module.css";

import BlogPostContent from "../BlogPostContent/BlogPostContent";
import BlogTags from "../BlogTags/BlogTags";
import BlogAuthorCard from "../BlogAuthorCard/BlogAuthorCard";
import BlogShareSection from "../BlogShareSection/BlogShareSection";
import RelatedPosts from "../RelatedPosts/RelatedPosts";
import BlogDetailSidebar from "../BlogDetailSidebar/BlogDetailSidebar";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogPostLayout({
  blog = {},

  relatedPosts = [],

  popularPosts = [],

  categories = [],

  activeCategory = "",

  onCategoryClick = () => {},

  onSubscribe = () => {},
}) {
  // ====================================================
  // SAFE BLOG DATA
  // ====================================================

  const safeBlog = blog || {};

  const content =
    safeBlog.content || safeBlog.description || safeBlog.body || "";

  const tags = Array.isArray(safeBlog.tags) ? safeBlog.tags : [];

  const author = safeBlog.author || {};

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* LEFT */}
          <div className={styles.left}>
            {/* CONTENT */}
            <BlogPostContent content={content} />

            {/* TAGS */}
            <BlogTags tags={tags} />

            {/* AUTHOR */}
            <BlogAuthorCard author={author} />

            {/* SHARE */}
            <BlogShareSection
              title={safeBlog.title}
              slug={safeBlog.slug}
              excerpt={safeBlog.excerpt}
            />

            {/* RELATED POSTS */}
            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
            <BlogDetailSidebar
              content={content}
              popularPosts={popularPosts}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryClick={onCategoryClick}
              onSubscribe={onSubscribe}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
