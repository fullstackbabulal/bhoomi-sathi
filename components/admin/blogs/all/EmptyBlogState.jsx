"use client";

// ======================================================
// File: admin/blogs/all/EmptyBlogState.jsx
// Description: Empty Blogs State
// ======================================================

import Link from "next/link";

import { FiFileText, FiPlus } from "react-icons/fi";

import styles from "./EmptyBlogState.module.css";

export default function EmptyBlogState() {
  return (
    <div className={styles.emptyState}>
      {/* ==========================================
          ICON
      ========================================== */}

      <div className={styles.iconWrapper}>
        <FiFileText size={48} />
      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <h3 className={styles.title}>No Blogs Found</h3>

      <p className={styles.description}>
        There are no blog posts available at the moment. Create your first blog
        to start publishing content.
      </p>

      {/* ==========================================
          ACTION
      ========================================== */}

      <Link href="/admin/blogs/add" className={styles.addButton}>
        <FiPlus size={18} />

        <span>Create Blog</span>
      </Link>
    </div>
  );
}
