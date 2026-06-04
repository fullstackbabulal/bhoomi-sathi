"use client";

// ======================================================
// File: admin/blogs/all/BlogActions/BlogActions.jsx
// Description: Blog Table Actions
// ======================================================

import Link from "next/link";

import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

import styles from "./BlogActions.module.css";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogActions({
  blog,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  if (!blog) return null;

  const { _id, slug, status = "draft" } = blog;

  return (
    <div className={styles.actions}>
      {/* ==========================================
          VIEW
      ========================================== */}

      <Link
        href={`/blog/${slug}`}
        target="_blank"
        className={`${styles.actionButton} ${styles.viewButton}`}
        title="View Blog"
      >
        <FiEye size={16} />
      </Link>

      {/* ==========================================
          EDIT
      ========================================== */}

      <Link
        href={`/admin/blogs/edit/${_id}`}
        className={`${styles.actionButton} ${styles.editButton}`}
        title="Edit Blog"
      >
        <FiEdit2 size={16} />
      </Link>

      {/* ==========================================
          PUBLISH / DRAFT
      ========================================== */}

      <button
        type="button"
        onClick={() => onToggleStatus?.(blog)}
        className={`${styles.actionButton} ${
          status === "published" ? styles.unpublishButton : styles.publishButton
        }`}
        title={status === "published" ? "Move to Draft" : "Publish Blog"}
      >
        {status === "published" ? (
          <FiFileText size={16} />
        ) : (
          <FiCheckCircle size={16} />
        )}
      </button>

      {/* ==========================================
          DELETE
      ========================================== */}

      <button
        type="button"
        onClick={() => onDelete?.(blog)}
        className={`${styles.actionButton} ${styles.deleteButton}`}
        title="Delete Blog"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
}
