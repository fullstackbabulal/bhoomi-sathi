"use client";

// ======================================================
// File: components/admin/blogs/BlogEditor/BlogEditor.jsx
// Description: Blog Content Editor Card
// ======================================================

import styles from "./BlogEditor.module.css";
import { FileText } from "lucide-react";

// ======================================================
// IMPORTANT
// Replace this import path with your actual
// RichTextEditor path
// ======================================================

import RichTextEditor from "@/components/editor/RichTextEditor";

export default function BlogEditor({ content = "", onChange }) {
  return (
    <section className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <FileText size={22} />
        </div>

        <div>
          <h2 className={styles.title}>Blog Content</h2>

          <p className={styles.subtitle}>
            Write and format your blog content using the editor
          </p>
        </div>
      </div>

      {/* EDITOR */}
      <div className={styles.editorWrapper}>
        <RichTextEditor
          value={content}
          onChange={onChange}
          placeholder="Start writing your blog content..."
        />
      </div>
    </section>
  );
}
