// ======================================================
// File: app/admin/blogs/page.tsx
// Description: Admin Blogs Listing Page
// Route: /admin/blogs
// ======================================================

import BlogsPage from "@/components/admin/blogs/all/BlogsPage";

// ======================================================
// SEO
// ======================================================

export const metadata = {
  title: "Blogs | Admin Dashboard",
  description: "Manage, publish, edit, and monitor all blog posts.",
};

// ======================================================
// PAGE
// ======================================================

export default function AdminBlogsPage() {
  return <BlogsPage />;
}
