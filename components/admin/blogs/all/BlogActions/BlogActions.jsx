"use client";

// ======================================================
// File: admin/blogs/all/BlogActions/BlogActions.jsx
// Description: Blog Table Actions
// ======================================================

import Link from "next/link";
import { useCallback } from "react";

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
  blog = {},
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  // ====================================================
  // SAFETY
  // ====================================================

  if (!blog?._id) {
    return null;
  }

  const { _id, slug = "", status = "draft" } = blog;

  // ====================================================
  // HANDLERS
  // ====================================================

  const handleView = useCallback(() => {
    onView?.(blog);
  }, [blog, onView]);

  const handleEdit = useCallback(() => {
    onEdit?.(blog);
  }, [blog, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete?.(blog);
  }, [blog, onDelete]);

  const handleToggleStatus = useCallback(() => {
    onToggleStatus?.(blog);
  }, [blog, onToggleStatus]);

  const isPublished = status === "published";

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className={styles.actions}>
      {/* ==========================================
          VIEW BLOG
      ========================================== */}

      <Link
        href={`/blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.actionButton} ${styles.viewButton}`}
        title="View Blog"
        aria-label="View Blog"
        onClick={handleView}
      >
        <FiEye size={16} />
      </Link>

      {/* ==========================================
          EDIT BLOG
      ========================================== */}

      <Link
        href={`/admin/blogs/edit/${_id}`}
        className={`${styles.actionButton} ${styles.editButton}`}
        title="Edit Blog"
        aria-label="Edit Blog"
        onClick={handleEdit}
      >
        <FiEdit2 size={16} />
      </Link>

      {/* ==========================================
          PUBLISH / DRAFT
      ========================================== */}

      <button
        type="button"
        onClick={handleToggleStatus}
        className={`${styles.actionButton} ${
          isPublished ? styles.unpublishButton : styles.publishButton
        }`}
        title={isPublished ? "Move to Draft" : "Publish Blog"}
        aria-label={isPublished ? "Move Blog To Draft" : "Publish Blog"}
      >
        {isPublished ? <FiFileText size={16} /> : <FiCheckCircle size={16} />}
      </button>

      {/* ==========================================
          DELETE BLOG
      ========================================== */}

      <button
        type="button"
        onClick={handleDelete}
        className={`${styles.actionButton} ${styles.deleteButton}`}
        title="Delete Blog"
        aria-label="Delete Blog"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
}
