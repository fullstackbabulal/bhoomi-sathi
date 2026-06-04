"use client";

// ======================================================
// File: components/blog-detail/BlogTags/BlogTags.jsx
// Description: Blog Tags
// UI Match: Plot in Patna Blog Detail Page
// ======================================================

import Link from "next/link";

import styles from "./BlogTags.module.css";

import { Tag } from "lucide-react";

// ======================================================
// FALLBACK TAGS
// ======================================================

const FALLBACK_TAGS = [
  "Real Estate",
  "Investment",
  "Property Buying",
  "Luxury Homes",
];

// ======================================================
// COMPONENT
// ======================================================

export default function BlogTags({
  tags = FALLBACK_TAGS,

  title = "Tags",
}) {
  // ====================================================
  // SAFE TAGS
  // ====================================================

  const safeTags = Array.isArray(tags) && tags.length ? tags : FALLBACK_TAGS;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Tag size={20} />
        </div>

        <h3 className={styles.title}>{title}</h3>
      </div>

      {/* TAGS */}
      <div className={styles.tags}>
        {safeTags.map((tag, index) => (
          <Link
            key={`${tag}-${index}`}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={styles.tag}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
