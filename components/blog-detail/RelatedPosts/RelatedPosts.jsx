"use client";

// ======================================================
// File: components/blog-detail/RelatedPosts/RelatedPosts.jsx
// Description: Related Posts Section
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import styles from "./RelatedPosts.module.css";

import BlogCard from "@/components/blog/BlogCard/BlogCard";

// ======================================================
// FALLBACK DATA
// ======================================================

const FALLBACK_POSTS = [
  {
    _id: "1",

    slug: "why-real-estate-is-a-smart-investment",

    title: "Why Real Estate is a Smart Long-Term Investment",

    excerpt:
      "Learn how strategic property investment creates long-term financial growth and passive income opportunities.",

    featuredImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",

    category: "Investment",

    publishedAt: "2026-06-01",

    readTime: "6 min read",
  },

  {
    _id: "2",

    slug: "top-things-to-check-before-buying-property",

    title: "Top Things to Check Before Buying Property",

    excerpt:
      "Avoid costly mistakes by understanding legal documents, approvals and hidden expenses.",

    featuredImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0?q=80&w=1200&auto=format&fit=crop",

    category: "Buying Guide",

    publishedAt: "2026-05-28",

    readTime: "8 min read",
  },

  {
    _id: "3",

    slug: "real-estate-market-trends-india",

    title: "Real Estate Market Trends in India 2026",

    excerpt:
      "Understand market opportunities, future growth zones and investment hotspots.",

    featuredImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",

    category: "Market Trends",

    publishedAt: "2026-05-24",

    readTime: "5 min read",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function RelatedPosts({
  title = "Related Articles",

  description = "Discover more real estate insights, investment ideas and expert property advice.",

  posts = FALLBACK_POSTS,
}) {
  // ====================================================
  // SAFE POSTS
  // ====================================================

  const safePosts =
    Array.isArray(posts) && posts.length ? posts : FALLBACK_POSTS;

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
        {safePosts.map((post, index) => (
          <BlogCard
            key={post?._id || post?.id || post?.slug || index}
            {...post}
          />
        ))}
      </div>
    </section>
  );
}
