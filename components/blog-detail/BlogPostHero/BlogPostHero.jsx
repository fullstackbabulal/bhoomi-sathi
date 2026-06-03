"use client";

// ======================================================
// File: components/blog-detail/BlogPostHero/BlogPostHero.jsx
// Description: Blog Post Hero
// UI Match: Bhoomi Sathi Blog Detail Page
// Fixed:
// - Hydration mismatch issues
// - Nested button errors
// - SSR-safe share URLs
// - Backend image URLs
// - Stable date formatting
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./BlogPostHero.module.css";

import { CalendarDays, Clock3, ChevronRight } from "lucide-react";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

// ======================================================
// FALLBACKS
// ======================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop";

const FALLBACK_AVATAR = "https://i.pravatar.cc/150?img=15";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogPostHero({ blog = {} }) {
  // ====================================================
  // ENV
  // ====================================================

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  // ====================================================
  // SAFE DATA
  // ====================================================

  const safeTitle = blog?.title?.trim?.() || "Untitled Blog";

  const safeExcerpt =
    blog?.excerpt?.trim?.() ||
    "Read expert real estate insights from Bhoomi Sathi.";

  const safeCategory = blog?.category?.trim?.() || "Real Estate";

  const safeSlug = blog?.slug?.trim?.() || "blog-post";

  // ====================================================
  // IMAGE
  // ====================================================

  const rawImage =
    blog?.featuredImage?.trim?.() || blog?.coverImage?.trim?.() || "";

  const safeImage = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${API_URL}${rawImage}`
    : FALLBACK_IMAGE;

  // ====================================================
  // AUTHOR
  // ====================================================

  const safeAuthor = blog?.author?.name?.trim?.() || "Bhoomi Sathi";

  const safeAvatar = blog?.author?.avatar?.trim?.() || FALLBACK_AVATAR;

  const safeRole = blog?.author?.role?.trim?.() || "Founder, Bhoomi Sathi";

  // ====================================================
  // READ TIME
  // ====================================================

  const safeReadTime = blog?.readTime?.trim?.() || "8 min read";

  // ====================================================
  // DATE (SSR SAFE)
  // ====================================================

  const safeDate =
    blog?.publishedAt || blog?.createdAt
      ? new Intl.DateTimeFormat("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(blog?.publishedAt || blog?.createdAt))
      : "Recently";

  // ====================================================
  // SHARE URL (SSR SAFE)
  // ====================================================

  const shareUrl = `${SITE_URL}/blog/${safeSlug}`;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* HERO CARD */}

        <div className={styles.heroCard}>
          {/* IMAGE */}

          <div className={styles.imageWrapper}>
            <Image
              src={safeImage}
              alt={safeTitle}
              fill
              priority
              className={styles.image}
              unoptimized
            />

            {/* OVERLAY */}

            <div className={styles.overlay} />

            {/* CONTENT */}

            <div className={styles.content}>
              {/* BREADCRUMB */}

              <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>

                <ChevronRight size={14} />

                <Link href="/blog">Blog</Link>

                <ChevronRight size={14} />

                <span>{safeCategory}</span>
              </div>

              {/* CATEGORY */}

              <span className={styles.badge}>{safeCategory}</span>

              {/* TITLE */}

              <h1 className={styles.title}>{safeTitle}</h1>

              {/* EXCERPT */}

              <p className={styles.excerpt}>{safeExcerpt}</p>
            </div>
          </div>
        </div>

        {/* META BAR */}

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
              <h4 className={styles.authorName}>{safeAuthor}</h4>

              <span className={styles.authorRole}>{safeRole}</span>
            </div>
          </div>

          {/* DATE */}

          <div className={styles.meta}>
            <CalendarDays size={16} />
            <span>{safeDate}</span>
          </div>

          {/* READ TIME */}

          <div className={styles.meta}>
            <Clock3 size={16} />
            <span>{safeReadTime}</span>
          </div>

          {/* CATEGORY */}

          <span className={styles.metaBadge}>{safeCategory}</span>
        </div>

        {/* SHARE */}

        <div className={styles.shareRow}>
          <span className={styles.shareLabel}>Share:</span>

          {/* FACEBOOK */}

          <FacebookShareButton url={shareUrl} className={styles.shareButton}>
            <FaFacebookF size={14} />
          </FacebookShareButton>

          {/* X */}

          <TwitterShareButton
            url={shareUrl}
            title={safeTitle}
            className={styles.shareButton}
          >
            <FaXTwitter size={14} />
          </TwitterShareButton>

          {/* LINKEDIN */}

          <LinkedinShareButton url={shareUrl} className={styles.shareButton}>
            <FaLinkedinIn size={14} />
          </LinkedinShareButton>
        </div>
      </div>
    </section>
  );
}
