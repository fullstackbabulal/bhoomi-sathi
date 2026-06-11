// ======================================================
// File: frontend/services/comment.service.js
// Description: Comment API Service
// ======================================================

import axios from "axios";

// ======================================================
// API BASE URL
// ======================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ======================================================
// AXIOS INSTANCE
// ======================================================

const commentApi = axios.create({
  baseURL: `${API_BASE_URL}/api/comments`,

  withCredentials: true,
});

// ======================================================
// GET COMMENTS BY BLOG SLUG
// GET /api/comments/:slug/comments
// ======================================================

export const getCommentsBySlug = async (slug) => {
  try {
    if (!slug) {
      throw new Error("Blog slug is required.");
    }

    console.log(`🚀 GET /api/comments/${slug}/comments`);

    const response = await commentApi.get(`/${slug}/comments`);

    console.log("✅ Get Comments Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Get Comments Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// CREATE COMMENT
// POST /api/comments/:slug/comments
// ======================================================

export const createComment = async (slug, payload) => {
  try {
    if (!slug) {
      throw new Error("Blog slug is required.");
    }

    if (!payload?.content?.trim()) {
      throw new Error("Comment content is required.");
    }

    console.log(`🚀 POST /api/comments/${slug}/comments`);

    const response = await commentApi.post(`/${slug}/comments`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Create Comment Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Create Comment Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// LIKE COMMENT
// POST /api/comments/like/:id
// ======================================================

export const likeComment = async (commentId) => {
  try {
    if (!commentId) {
      throw new Error("Comment ID is required.");
    }

    console.log(`🚀 POST /api/comments/like/${commentId}`);

    const response = await commentApi.post(`/like/${commentId}`);

    console.log("✅ Like Comment Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Like Comment Error:", error?.response?.data || error);

    throw error?.response?.data || error;
  }
};

// ======================================================
// EXPORT API INSTANCE
// ======================================================

export default commentApi;
