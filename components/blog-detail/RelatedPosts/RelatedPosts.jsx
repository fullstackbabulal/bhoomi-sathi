"use client";

// ======================================================
// File: components/blog-detail/RelatedPosts/RelatedPosts.jsx
// Description: Related Posts Section
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import styles from "./RelatedPosts.module.css";

import BlogCard from "@/components/blog/BlogCard/BlogCard";

// ======================================================
// COMPONENT
// ======================================================

export default function RelatedPosts({
  title = "Related Articles",

  description = "Discover more real estate insights, investment ideas and expert property advice.",

  posts = [],
}) {
  // ====================================================
  // SAFE POSTS
  // ====================================================

  const safePosts = Array.isArray(posts) ? posts.filter(Boolean) : [];

  // ====================================================
  // EMPTY STATE
  // ====================================================

  if (!safePosts.length) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>More to Read</span>

          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>
        </div>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {safePosts.map((post, index) => {
          const normalizedPost = {
            _id: post?._id || post?.id || `${index}`,

            slug: post?.slug || "",

            title: post?.title || "Untitled Blog",

            excerpt: post?.excerpt || "",

            featuredImage: post?.featuredImage || post?.coverImage || "",

            category: post?.category || "General",

            publishedAt: post?.publishedAt || post?.createdAt || "",

            readTime: post?.readTime || "5 min read",
          };

          return <BlogCard key={normalizedPost._id} {...normalizedPost} />;
        })}
      </div>
    </section>
  );
}
