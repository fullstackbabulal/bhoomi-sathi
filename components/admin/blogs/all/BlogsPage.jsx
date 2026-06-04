"use client";

// ======================================================
// File: components/admin/blogs/all/BlogsPage.jsx
// Description: Admin Blogs Dashboard Page
// ======================================================

import { useEffect, useState } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";

import styles from "./BlogsPage.module.css";

import { getBlogs } from "@/services/blog.service";

import BlogHeader from "./BlogHeader/BlogHeader";
import BlogStats from "./BlogStats/BlogStats";
import BlogFilters from "./BlogFilters/BlogFilters";
import BlogTable from "./BlogTable/BlogTable";
import BlogPagination from "./BlogPagination/BlogPagination";
import EmptyBlogState from "./EmptyBlogState";
import LoadingBlogSkeleton from "./LoadingBlogSkeleton";

export default function BlogsPage() {
  // ======================================================
  // STATE
  // ======================================================

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [category, setCategory] = useState("all");

  const [author, setAuthor] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  // ======================================================
  // FETCH BLOGS
  // ======================================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const result = await getBlogs();

      console.log("ADMIN BLOG RESPONSE:", result);

      const blogList = Array.isArray(result?.blogs)
        ? result.blogs
        : Array.isArray(result?.data?.blogs)
          ? result.data.blogs
          : Array.isArray(result?.data)
            ? result.data
            : [];

      setBlogs(blogList);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RESET PAGINATION
  // ======================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, category, author]);

  // ======================================================
  // FILTERED BLOGS
  // ======================================================

  const filteredBlogs = blogs.filter((blog) => {
    const title = blog?.title || "";

    const blogCategory = blog?.category?.name || blog?.category || "";

    const blogAuthor = blog?.author?.name || blog?.author || "";

    const blogStatus = blog?.status || "";

    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "all" || blogStatus === status;

    const matchesCategory = category === "all" || blogCategory === category;

    const matchesAuthor =
      !author || blogAuthor.toLowerCase().includes(author.toLowerCase());

    return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
  });

  // ======================================================
  // PAGINATION
  // ======================================================

  const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage) || 1;

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // ======================================================
  // STATS
  // ======================================================

  const stats = {
    total: blogs.length,

    published: blogs.filter((item) => item?.status === "published").length,

    draft: blogs.filter((item) => item?.status === "draft").length,

    archived: blogs.filter((item) => item?.status === "archived").length,
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className={styles.layout}>
      {/* SIDEBAR */}

      <AdminSidebar />

      {/* CONTENT */}

      <main className={styles.content}>
        <section className={styles.page}>
          {/* HEADER */}

          <BlogHeader />

          {/* STATS */}

          <BlogStats stats={stats} />

          {/* CARD */}

          <section className={styles.card}>
            {/* FILTERS */}

            <BlogFilters
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              category={category}
              setCategory={setCategory}
              author={author}
              setAuthor={setAuthor}
            />

            {/* CONTENT */}

            {loading ? (
              <LoadingBlogSkeleton />
            ) : filteredBlogs.length === 0 ? (
              <EmptyBlogState />
            ) : (
              <>
                <BlogTable blogs={paginatedBlogs} onRefresh={fetchBlogs} />

                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  totalItems={filteredBlogs.length}
                  rowsPerPage={rowsPerPage}
                />
              </>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
