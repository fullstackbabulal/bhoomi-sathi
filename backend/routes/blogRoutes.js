import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  getBlogBySlug,
  getBlogById,
  updateBlogPost,
  deleteBlogPost,
  getRelatedBlogs,
} from "../controllers/blogController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC ROUTES (SEO + USERS)
// ==========================================

// Get all blog posts (filters, pagination)
router.get("/", getBlogPosts);

// Get related blogs (SEO internal linking)
router.get("/related/:id", getRelatedBlogs);

// SEO-friendly slug route (IMPORTANT)
router.get("/slug/:slug", getBlogBySlug);

// Get blog by ID (admin/internal use)
router.get("/:id", getBlogById);

// ==========================================
// PROTECTED ROUTES (ADMIN / AUTHOR)
// ==========================================

// Create blog
router.post(
  "/",
  protect,
  authorize("admin", "agent"), // agent can act as author
  createBlogPost,
);

// Update blog
router.put("/:id", protect, authorize("admin", "agent"), updateBlogPost);

// Delete blog
router.delete("/:id", protect, authorize("admin", "agent"), deleteBlogPost);

export default router;
