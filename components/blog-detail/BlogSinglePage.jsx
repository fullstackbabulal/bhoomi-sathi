// ======================================================
// File: components/blog-detail/BlogSinglePage.jsx
// Description: Blog Single Page Component
// ======================================================

import BlogPostHero from "./BlogPostHero/BlogPostHero";
import BlogMetaBar from "./BlogMetaBar/BlogMetaBar";
import BlogPostLayout from "./BlogPostLayout/BlogPostLayout";
import BlogCommentSection from "./BlogCommetSection/BlogCommentSection";
import NewsletterCTA from "./NewsletterCTA/NewsletterCTA";

export default function BlogSinglePage({
  blog = {},
  relatedPosts = [],
  comments = [],
}) {
  // ====================================================
  // NORMALIZE BLOG DATA
  // ====================================================

  const blogData =
    blog?.data && typeof blog.data === "object" ? blog.data : blog || {};

  // ====================================================
  // SAFETY
  // ====================================================

  if (!Object.keys(blogData).length) {
    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "60px auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>Blog Not Found</h2>

        <p>The requested blog could not be loaded.</p>
      </div>
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* HERO */}
      <BlogPostHero blog={blogData} />

      {/* META */}
      <BlogMetaBar blog={blogData} />

      {/* CONTENT + RELATED POSTS */}
      <BlogPostLayout blog={blogData} relatedPosts={relatedPosts} />

      {/* COMMENTS */}
      <BlogCommentSection blog={blogData} comments={comments} />

      {/* NEWSLETTER */}
      <NewsletterCTA />
    </>
  );
}
