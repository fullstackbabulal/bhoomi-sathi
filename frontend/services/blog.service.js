// ======================================================
// File: frontend/services/blog.service.js
// Description: Blog API Service
// ======================================================

import axios from "axios";

// ======================================================
// API BASE URL
// ======================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ======================================================
// AXIOS INSTANCE
// ======================================================

const blogApi = axios.create({
  baseURL: `${API_BASE_URL}/api/blogs`,
  withCredentials: true,
});

// ======================================================
// CREATE BLOG
// POST /api/blogs/add
// ======================================================

export const createBlog = async (payload) => {
  try {
    console.log("🚀 POST /api/blogs/add");

    const response = await blogApi.post("/add", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Blog Create Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Create Blog Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// UPDATE BLOG
// PUT /api/blogs/:id
// ======================================================

export const updateBlog = async (id, payload) => {
  try {
    const response = await blogApi.put(`/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Update Blog Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// GET BLOGS
// GET /api/blogs
// ======================================================

export const getBlogs = async (params = {}) => {
  try {
    const response = await blogApi.get("/", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Get Blogs Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// GET BLOG BY ID
// GET /api/blogs/:id
// ======================================================

export const getBlogById = async (id) => {
  try {
    const response = await blogApi.get(`/${id}`);

    return response.data;
  } catch (error) {
    console.error("❌ Get Blog By ID Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// GET BLOG BY SLUG
// GET /api/blogs/slug/:slug
// ======================================================

export const getBlogBySlug = async (slug) => {
  try {
    if (!slug?.trim()) {
      throw new Error("Blog slug is required.");
    }

    console.log(`🚀 GET /api/blogs/slug/${slug}`);

    const response = await blogApi.get(`/slug/${slug}`);

    console.log("✅ Get Blog By Slug Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Get Blog By Slug Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// DELETE BLOG
// DELETE /api/blogs/:id
// ======================================================

export const deleteBlog = async (id) => {
  try {
    const response = await blogApi.delete(`/${id}`);

    return response.data;
  } catch (error) {
    console.error("❌ Delete Blog Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// GET PUBLISHED BLOGS
// GET /api/blogs?status=published
// ======================================================

export const getPublishedBlogs = async (
  page = 1,
  limit = 9,
  category = "",
  keyword = "",
) => {
  try {
    const response = await blogApi.get("/", {
      params: {
        page,
        limit,
        status: "published",
        category: category || undefined,
        keyword: keyword || undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Published Blogs Error:",
      error?.response?.data || error,
    );

    throw error?.response?.data || error;
  }
};

// ======================================================
// GET RELATED BLOGS
// GET /api/blogs/related/:id
// ======================================================

export const getRelatedBlogs = async (id) => {
  try {
    if (!id) {
      return [];
    }

    const response = await blogApi.get(`/related/${id}`);

    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Related Blogs Error:",
      error?.response?.data || error,
    );

    throw error?.response?.data || error;
  }
};

export const updateBlogStatus = async (id, status) => {
  const response = await blogApi.patch(`/${id}/status`, { status });

  return response.data;
};

// ======================================================
// EXPORT API INSTANCE
// ======================================================

export default blogApi;
