// ======================================================
// File: app/blog/page.tsx
// Description: Blog Listing Page
// UI Match: Plot in Patna Blog Page
// ======================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import BlogHero from "@/components/blog/BlogHero/BlogHero";
import BlogPageLayout from "@/components/blog/BlogPageLayout/BlogPageLayout";

import { getPublishedBlogs } from "@/services/blog.service";

// ======================================================
// PAGE
// ======================================================

export default async function Page() {
  // ====================================================
  // FETCH BLOGS
  // ====================================================

  let blogs = [];

  let totalPages = 1;

  try {
    const response = await getPublishedBlogs(1, 9);

    blogs = response?.data || [];

    totalPages = response?.pages || 1;
  } catch (error) {
    console.error("Blog Fetch Error:", error);
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* BLOG HERO */}
      <BlogHero
        title="Real Estate Insights."
        highlight="Smarter Decisions."
        description="Discover expert real estate tips, property investment guides, home loan advice, legal insights, and market trends to help you make smarter property decisions."
      />

      {/* BLOG PAGE LAYOUT */}
      <BlogPageLayout blogs={blogs} totalPages={totalPages} />

      {/* FOOTER */}
      <Footer />
    </>
  );
}
