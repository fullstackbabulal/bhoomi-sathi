"use client";

// ======================================================
// File: components/blog-detail/BlogPostHero/BlogPostHero.jsx
// Description: Blog Post Hero
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./BlogPostHero.module.css";

import {
  CalendarDays,
  Clock3,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
} from "lucide-react";

// ======================================================
// FALLBACKS
// ======================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop";

const FALLBACK_AVATAR = "https://i.pravatar.cc/150?img=15";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogPostHero({
  category = "Real Estate",

  title = "Why Real Estate is the Smartest Long-Term Investment",

  excerpt = "Discover expert-backed strategies, market trends and investment insights to make better property decisions.",

  featuredImage = FALLBACK_IMAGE,

  publishedAt = "2026-06-01",

  readTime = "8 min read",

  author = {},

  slug = "blog-post",
}) {
  // ====================================================
  // SAFE DATA
  // ====================================================

  const safeImage = featuredImage?.trim?.() || FALLBACK_IMAGE;

  const safeAvatar = author?.avatar?.trim?.() || FALLBACK_AVATAR;

  const safeAuthor = author?.name?.trim?.() || "Bhoomi Sathi";

  const safeDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Recently";

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>

          <ChevronRight size={16} />

          <Link href="/blog">Blog</Link>

          <ChevronRight size={16} />

          <span>{slug}</span>
        </div>

        {/* CATEGORY */}
        <div className={styles.badge}>{category}</div>

        {/* TITLE */}
        <h1 className={styles.title}>{title}</h1>

        {/* EXCERPT */}
        <p className={styles.excerpt}>{excerpt}</p>

        {/* META */}
        <div className={styles.metaRow}>
          {/* AUTHOR */}
          <div className={styles.author}>
            <div className={styles.avatarWrapper}>
              <Image
                src={safeAvatar}
                alt={safeAuthor}
                fill
                className={styles.avatar}
                unoptimized
              />
            </div>

            <div>
              <span className={styles.authorLabel}>Written by</span>

              <h4 className={styles.authorName}>{safeAuthor}</h4>
            </div>
          </div>

          {/* DATE */}
          <div className={styles.meta}>
            <CalendarDays size={18} />

            <span>{safeDate}</span>
          </div>

          {/* READ TIME */}
          <div className={styles.meta}>
            <Clock3 size={18} />

            <span>{readTime}</span>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className={styles.imageWrapper}>
          <Image
            src={safeImage}
            alt={title}
            fill
            priority
            className={styles.image}
            unoptimized
          />
        </div>

        {/* SHARE */}
        <div className={styles.shareRow}>
          <span className={styles.shareLabel}>
            <Share2 size={18} />
            Share:
          </span>

          <button className={styles.shareButton}>
            <Facebook size={18} />
          </button>

          <button className={styles.shareButton}>
            <Twitter size={18} />
          </button>

          <button className={styles.shareButton}>
            <Linkedin size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
