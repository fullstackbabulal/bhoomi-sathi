"use client";

// ======================================================
// File: components/admin/blogs/BlogPageHeader/BlogPageHeader.jsx
// Description: Add Blog Page Header
// ======================================================

import Link from "next/link";
import styles from "./BlogPageHeader.module.css";

import { ArrowLeft, Save, Send } from "lucide-react";

export default function BlogPageHeader({
  title = "Add New Blog",
  subtitle = "Create and publish engaging blog content",
  backHref = "/admin/blogs",
  onSaveDraft,
  onPublish,
  loading = false,
}) {
  return (
    <div className={styles.wrapper}>
      {/* LEFT */}
      <div className={styles.left}>
        <Link
          href={backHref}
          className={styles.backButton}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </Link>

        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>

          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.draftButton}
          onClick={onSaveDraft}
          disabled={loading}
        >
          <Save size={18} />

          <span>{loading ? "Saving..." : "Save as Draft"}</span>
        </button>

        <button
          type="button"
          className={styles.publishButton}
          onClick={onPublish}
          disabled={loading}
        >
          <Send size={18} />

          <span>{loading ? "Publishing..." : "Publish Blog"}</span>
        </button>
      </div>
    </div>
  );
}
