"use client";

// ======================================================
// File: components/admin/blogs/all/BlogsPage.jsx
// Description: Blogs Management Page
// ======================================================

import { useEffect, useState } from "react";

import BlogHeader from "./BlogHeader/BlogHeader";
import BlogStats from "./BlogStats/BlogStats";
import BlogFilters from "./BlogFilters/BlogFilters";
import BlogTable from "./BlogTable/BlogTable";
import BlogPagination from "./BlogPagination/BlogPagination";

import EmptyBlogState from "./EmptyBlogState";
import LoadingBlogSkeleton from "./LoadingBlogSkeleton";

import { getBlogs } from "@/services/blog.service";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogsPage() {
  // ====================================================
  // STATE
  // ====================================================

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
  });

  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    category: "",
    author: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // ====================================================
  // FETCH BLOGS
  // ====================================================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await getBlogs({
        page: pagination.page,
        limit: pagination.limit,
        keyword: filters.keyword,
        status: filters.status,
        category: filters.category,
        author: filters.author,
      });

      const blogsData = response?.blogs || response?.data || [];

      setBlogs(Array.isArray(blogsData) ? blogsData : []);

      setPagination((prev) => ({
        ...prev,
        total: response?.total || blogsData.length || 0,

        totalPages: response?.totalPages || 1,
      }));

      setStats({
        total: response?.stats?.total || blogsData.length || 0,

        published: response?.stats?.published || 0,

        draft: response?.stats?.draft || 0,

        archived: response?.stats?.archived || 0,
      });
    } catch (error) {
      console.error("Failed to fetch blogs:", error);

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // EFFECT
  // ====================================================

  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, pagination.limit, filters]);

  // ====================================================
  // FILTERS
  // ====================================================

  const handleFilterChange = (field, value) => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: "",
      status: "",
      category: "",
      author: "",
    });

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // ====================================================
  // PAGINATION
  // ====================================================

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return <LoadingBlogSkeleton />;
  }

  // ====================================================
  // UI
  // ====================================================

  return (
    <>
      <BlogHeader />

      <BlogStats stats={stats} />

      <BlogFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {blogs.length === 0 ? (
        <EmptyBlogState />
      ) : (
        <>
          <BlogTable blogs={blogs} onRefresh={fetchBlogs} />

          <BlogPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
