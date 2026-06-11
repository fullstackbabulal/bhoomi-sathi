"use client";

// ======================================================
// File: components/home/LatestBlog.jsx
// Description: Dynamic Latest Blog Section
// ======================================================

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./LatestBlog.module.css";

import { getPublishedBlogs } from "@/services/blog.service";

// ======================================================
// CONFIG
// ======================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ======================================================
// HELPERS
// ======================================================

const getImageUrl = (image = "") => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/uploads")) {
    return `${API_BASE_URL}${image}`;
  }

  return image;
};

const formatDate = (date) => {
  if (!date) return "";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

// ======================================================
// COMPONENT
// ======================================================

export default function LatestBlog() {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  // ====================================================
  // FETCH BLOGS
  // ====================================================

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getPublishedBlogs(1, 3);

        const blogData =
          response?.blogs || response?.data || response?.results || [];

        setBlogs(Array.isArray(blogData) ? blogData.slice(0, 3) : []);
      } catch (error) {
        console.error("Latest Blog Error:", error);

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return null;
  }

  // ====================================================
  // EMPTY STATE
  // ====================================================

  if (!blogs.length) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Latest from Our Blog</h2>

          <p className={styles.subtitle}>
            Explore real estate insights, property tips, and investment
            strategies.
          </p>
        </div>

        <Link href="/blog" className={styles.viewAll}>
          View All Blogs
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className={styles.grid}>
        {blogs.map((blog) => {
          const image = getImageUrl(blog?.featuredImage || blog?.image || "");

          const slug = blog?.slug || blog?._id;

          return (
            <article key={blog?._id || slug} className={styles.card}>
              <Link href={`/blog/${slug}`} className={styles.imageWrapper}>
                <Image
                  src={image || "/images/blog-placeholder.jpg"}
                  alt={blog?.title || "Blog"}
                  fill
                  unoptimized
                  className={styles.image}
                />
              </Link>

              <div className={styles.content}>
                <span className={styles.date}>
                  {formatDate(blog?.publishedAt || blog?.createdAt)}
                </span>

                <Link href={`/blog/${slug}`} className={styles.blogTitleLink}>
                  <h3 className={styles.blogTitle}>{blog?.title}</h3>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
