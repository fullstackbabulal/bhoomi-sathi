"use client";

// ======================================================
// File: components/blog/BlogCard/BlogCard.jsx
// Description: Blog Card
// ======================================================

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock3, Bookmark, ArrowUpRight } from "lucide-react";

import styles from "./BlogCard.module.css";

// ======================================================
// CONFIG
// ======================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ======================================================
// FALLBACKS
// ======================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

const FALLBACK_AVATAR = "https://i.pravatar.cc/150?img=15";

// ======================================================
// HELPERS
// ======================================================

const getImageUrl = (imagePath = "") => {
  if (!imagePath?.trim()) {
    return FALLBACK_IMAGE;
  }

  // External URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Backend uploads
  if (imagePath.startsWith("/uploads")) {
    return `${API_BASE_URL}${imagePath}`;
  }

  return imagePath;
};

// ======================================================
// COMPONENT
// ======================================================

export default function BlogCard(props) {
  const {
    slug = "blog-post",

    title = "Real Estate Blog",

    excerpt = "Real estate insights and property updates.",

    image,

    featuredImage,

    category = "Real Estate",

    date,

    publishedAt,

    readTime = "5 min read",

    author = {},
  } = props;

  // ====================================================
  // SAFE DATA
  // ====================================================

  const safeImage = getImageUrl(image || featuredImage);

  const safeAvatar = author?.avatar?.trim?.() || FALLBACK_AVATAR;

  const safeAuthorName = author?.name?.trim?.() || "Plot in Patna";

  const safeDate =
    date ||
    (publishedAt
      ? new Date(publishedAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Recently");

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <article className={styles.card}>
      {/* IMAGE */}

      <div className={styles.imageWrapper}>
        <Image
          src={safeImage}
          alt={title}
          fill
          className={styles.image}
          unoptimized
        />

        <span className={styles.category}>{category}</span>

        <button
          type="button"
          className={styles.bookmarkButton}
          aria-label="Save article"
        >
          <Bookmark size={18} />
        </button>
      </div>

      {/* CONTENT */}

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <CalendarDays size={16} />
            {safeDate}
          </span>

          <span className={styles.dot} />

          <span className={styles.metaItem}>
            <Clock3 size={16} />
            {readTime}
          </span>
        </div>

        <Link href={`/blog/${slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.footer}>
          <div className={styles.author}>
            <div className={styles.avatarWrapper}>
              <Image
                src={safeAvatar}
                alt={safeAuthorName}
                fill
                className={styles.avatar}
                unoptimized
              />
            </div>

            <div>
              <span className={styles.authorLabel}>Written by</span>

              <h4 className={styles.authorName}>{safeAuthorName}</h4>
            </div>
          </div>

          <Link href={`/blog/${slug}`} className={styles.readMore}>
            Read More
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
