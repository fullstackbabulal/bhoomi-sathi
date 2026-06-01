// ======================================================
// File: frontend/services/blog.service.js
// Description: Blog API Service
// ======================================================

import axios from "axios";

// ======================================================
// API BASE URL
// ======================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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
    console.error("❌ Create Blog Error:", error.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// UPDATE BLOG
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
    throw error?.response?.data || error;
  }
};

// ======================================================
// GET BLOGS
// ======================================================

export const getBlogs = async (params = {}) => {
  try {
    const response = await blogApi.get("/", {
      params,
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// ======================================================
// GET BLOG BY ID
// ======================================================

export const getBlogById = async (id) => {
  try {
    const response = await blogApi.get(`/${id}`);

    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// ======================================================
// GET BLOG BY SLUG
// ======================================================

export const getBlogBySlug = async (slug) => {
  try {
    const response = await blogApi.get(`/slug/${slug}`);

    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// ======================================================
// DELETE BLOG
// ======================================================

export const deleteBlog = async (id) => {
  try {
    const response = await blogApi.delete(`/${id}`);

    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
