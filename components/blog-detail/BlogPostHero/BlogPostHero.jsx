"use client";

// ======================================================
// File: components/blog-detail/BlogPostHero/BlogPostHero.jsx
// Description: Blog Post Hero
// UI Match: Bhoomi Sathi Blog Detail Page
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
  // SAFE DATA
  // ====================================================

  const safeTitle = blog?.title?.trim?.() || "Untitled Blog";

  const safeExcerpt =
    blog?.excerpt?.trim?.() ||
    "Read expert real estate insights from Bhoomi Sathi.";

  const safeCategory = blog?.category?.trim?.() || "Real Estate";

  const safeSlug = blog?.slug?.trim?.() || "blog-post";

  const safeImage =
    blog?.featuredImage?.trim?.() ||
    blog?.coverImage?.trim?.() ||
    FALLBACK_IMAGE;

  const safeAuthor = blog?.author?.name?.trim?.() || "Bhoomi Sathi";

  const safeAvatar = blog?.author?.avatar?.trim?.() || FALLBACK_AVATAR;

  const safeRole = blog?.author?.role?.trim?.() || "Founder, Bhoomi Sathi";

  const safeReadTime = blog?.readTime?.trim?.() || "8 min read";

  const safeDate =
    blog?.publishedAt || blog?.createdAt
      ? new Date(blog?.publishedAt || blog?.createdAt).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        )
      : "Recently";

  // ====================================================
  // SHARE URL
  // ====================================================

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${safeSlug}`
      : "";

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

          <FacebookShareButton url={shareUrl}>
            <button className={styles.shareButton}>
              <FaFacebookF size={14} />
            </button>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={safeTitle}>
            <button className={styles.shareButton}>
              <FaXTwitter size={14} />
            </button>
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl}>
            <button className={styles.shareButton}>
              <FaLinkedinIn size={14} />
            </button>
          </LinkedinShareButton>
        </div>
      </div>
    </section>
  );
}
