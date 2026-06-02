"use client";

// ======================================================
// File: components/blog-detail/BlogPostContent/BlogPostContent.jsx
// Description: Blog Post Content
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import styles from "./BlogPostContent.module.css";

// ======================================================
// FALLBACK CONTENT
// ======================================================

const FALLBACK_CONTENT = `
<h2>Why Real Estate is a Smart Investment</h2>

<p>
Real estate remains one of the most reliable long-term investments because it provides appreciation, passive income opportunities and portfolio diversification.
</p>

<p>
Whether you are buying residential, commercial or land property, understanding market timing and legal due diligence is essential.
</p>

<blockquote>
Real estate investment is not about timing the market — it is about time in the market.
</blockquote>

<h3>Key Benefits of Property Investment</h3>

<ul>
<li>Stable long-term growth</li>
<li>Passive rental income</li>
<li>Portfolio diversification</li>
<li>Inflation protection</li>
</ul>

<p>
Always perform property verification, title checks and market analysis before making a purchase decision.
</p>
`;

// ======================================================
// COMPONENT
// ======================================================

export default function BlogPostContent({
  content = "",

  className = "",
}) {
  // ====================================================
  // SAFE CONTENT
  // ====================================================

  const safeContent = content?.trim?.() || FALLBACK_CONTENT;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <article className={`${styles.article} ${className}`}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: safeContent,
        }}
      />
    </article>
  );
}
