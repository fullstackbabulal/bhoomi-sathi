"use client";

// ======================================================
// File: components/blog-detail/BlogPostContent/BlogPostContent.jsx
// Description: Blog Post Content
// ======================================================

import styles from "./BlogPostContent.module.css";

// ======================================================
// FALLBACK CONTENT
// ======================================================

const FALLBACK_CONTENT = `
<h2>Blog Content Not Available</h2>
<p>
The content for this blog post is currently unavailable.
Please try again later.
</p>
`;

// ======================================================
// COMPONENT
// ======================================================

export default function BlogPostContent({
  content = "",
  blog = {},
  className = "",
}) {
  // ====================================================
  // CONTENT SOURCE
  // ====================================================

  const rawContent =
    content?.trim?.() ||
    blog?.content?.trim?.() ||
    blog?.data?.content?.trim?.() ||
    "";

  // ====================================================
  // FINAL CONTENT
  // ====================================================

  const finalContent = rawContent || FALLBACK_CONTENT;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <article className={`${styles.article} ${className}`}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: finalContent,
        }}
      />
    </article>
  );
}
