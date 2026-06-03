"use client";

// ======================================================
// File: components/blog/BlogCard/BlogCard.jsx
// Description: Blog Card
// UI Match: Plot in Patna Blog Page
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./BlogCard.module.css";

import { CalendarDays, Clock3, Bookmark, ArrowUpRight } from "lucide-react";

// ======================================================
// FALLBACKS
// ======================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

const FALLBACK_AVATAR = "https://i.pravatar.cc/150?img=15";

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

  const safeImage =
    image?.trim?.() || featuredImage?.trim?.() || FALLBACK_IMAGE;

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

        {/* CATEGORY */}
        <span className={styles.category}>{category}</span>

        {/* BOOKMARK */}
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
        {/* META */}
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

        {/* TITLE */}
        <Link href={`/blog/${slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        {/* EXCERPT */}
        <p className={styles.excerpt}>{excerpt}</p>

        {/* FOOTER */}
        <div className={styles.footer}>
          {/* AUTHOR */}
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

          {/* READ MORE */}
          <Link href={`/blog/${slug}`} className={styles.readMore}>
            Read More
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
