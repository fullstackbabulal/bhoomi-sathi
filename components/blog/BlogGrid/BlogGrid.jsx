"use client";

// ======================================================
// File: components/blog/BlogGrid/BlogGrid.jsx
// Description: Blog Grid
// UI Match: Plot in Patna Blog Page
// ======================================================

import styles from "./BlogGrid.module.css";

import BlogCard from "../BlogCard/BlogCard";

// ======================================================
// SAMPLE DATA (FALLBACK)
// ======================================================

const SAMPLE_BLOGS = [
  {
    _id: "1",

    slug: "why-real-estate-is-a-smart-investment",

    title: "Why Real Estate is a Smart Long-Term Investment",

    excerpt:
      "Learn how strategic property investment creates long-term financial growth and passive income opportunities.",

    featuredImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",

    category: "Investment",

    publishedAt: "2026-05-30",

    readTime: "6 min read",

    author: {
      name: "Plot in Patna",

      avatar: "https://i.pravatar.cc/100?img=15",
    },
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

    publishedAt: "2026-05-26",

    readTime: "8 min read",

    author: {
      name: "Plot in Patna",

      avatar: "https://i.pravatar.cc/100?img=22",
    },
  },

  {
    _id: "3",

    slug: "real-estate-market-trends-india",

    title: "Real Estate Market Trends in India 2026",

    excerpt:
      "Understand emerging market opportunities, price movement and future investment hotspots.",

    featuredImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",

    category: "Market Trends",

    publishedAt: "2026-05-20",

    readTime: "7 min read",

    author: {
      name: "Plot in Patna",

      avatar: "https://i.pravatar.cc/100?img=25",
    },
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function BlogGrid({ blogs = SAMPLE_BLOGS }) {
  // ====================================================
  // SAFE BLOGS
  // ====================================================

  const safeBlogs = Array.isArray(blogs) && blogs.length ? blogs : SAMPLE_BLOGS;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {safeBlogs.map((blog, index) => (
          <BlogCard
            key={blog?._id || blog?.id || blog?.slug || index}
            {...blog}
          />
        ))}
      </div>
    </section>
  );
}
