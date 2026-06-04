"use client";

// ======================================================
// File: admin/blogs/all/BlogTable/BlogTableRow.jsx
// Description: Single Blog Table Row
// ======================================================

import Image from "next/image";
import Link from "next/link";

import BlogActions from "../BlogActions/BlogActions";

import styles from "./BlogTable.module.css";

// ======================================================
// HELPERS
// ======================================================

const formatDate = (date) => {
  if (!date) return "-";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "-";
  }
};

const getStatusClass = (status = "") => {
  switch (status.toLowerCase()) {
    case "published":
      return styles.statusPublished;

    case "draft":
      return styles.statusDraft;

    case "archived":
      return styles.statusArchived;

    default:
      return styles.statusDefault;
  }
};

// ======================================================
// COMPONENT
// ======================================================

export default function BlogTableRow({ blog, onRefresh }) {
  if (!blog) return null;

  const {
    _id,
    title,
    slug,
    category,
    status,
    views = 0,
    featuredImage,
    publishedAt,
    createdAt,
    author,
  } = blog;

  const imageUrl =
    featuredImage || "/images/placeholders/blog-placeholder.webp";

  const authorName = author?.name || author || "Admin";

  const displayDate = publishedAt || createdAt;

  return (
    <tr className={styles.row}>
      {/* ==========================================
          THUMBNAIL
      ========================================== */}

      <td>
        <div className={styles.thumbnailWrapper}>
          <Image
            src={imageUrl}
            alt={title || "Blog"}
            width={72}
            height={52}
            className={styles.thumbnail}
            onError={() => {
              console.error("Failed Blog Image:", imageUrl);
            }}
          />
        </div>
      </td>

      {/* ==========================================
          TITLE
      ========================================== */}

      <td>
        <div className={styles.blogInfo}>
          <h4 className={styles.blogTitle}>{title || "Untitled Blog"}</h4>

          {slug && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className={styles.blogSlug}
            >
              /blog/{slug}
            </Link>
          )}
        </div>
      </td>

      {/* ==========================================
          CATEGORY
      ========================================== */}

      <td>
        <span className={styles.categoryBadge}>{category || "General"}</span>
      </td>

      {/* ==========================================
          AUTHOR
      ========================================== */}

      <td>
        <span className={styles.author}>{authorName}</span>
      </td>

      {/* ==========================================
          STATUS
      ========================================== */}

      <td>
        <span className={`${styles.statusBadge} ${getStatusClass(status)}`}>
          {status || "draft"}
        </span>
      </td>

      {/* ==========================================
          VIEWS
      ========================================== */}

      <td>
        <span className={styles.views}>{views.toLocaleString()}</span>
      </td>

      {/* ==========================================
          DATE
      ========================================== */}

      <td>
        <span className={styles.date}>{formatDate(displayDate)}</span>
      </td>

      {/* ==========================================
          ACTIONS
      ========================================== */}

      <td>
        <BlogActions blog={blog} onRefresh={onRefresh} />
      </td>
    </tr>
  );
}
