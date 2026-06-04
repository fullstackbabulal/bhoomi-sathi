"use client";

// ======================================================
// File: admin/blogs/all/BlogHeader/BlogHeader.jsx
// Description: Blogs Page Header
// ======================================================

import Link from "next/link";
import { FiPlus } from "react-icons/fi";

import styles from "./BlogHeader.module.css";

export default function BlogHeader() {
  return (
    <div className={styles.header}>
      {/* ==========================================
          LEFT
      ========================================== */}

      <div className={styles.content}>
        <h1 className={styles.title}>Blogs</h1>

        <p className={styles.subtitle}>
          Manage, publish, and monitor all blog posts from one place.
        </p>
      </div>

      {/* ==========================================
          RIGHT
      ========================================== */}

      <Link href="/admin/blogs/add" className={styles.addButton}>
        <FiPlus size={18} />

        <span>Add Blog</span>
      </Link>
    </div>
  );
}
