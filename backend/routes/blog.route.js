// ======================================================
// File: backend/routes/blog.route.js
// Description: Blog Routes
// ======================================================

const express = require("express");

const router = express.Router();

// ======================================================
// CONTROLLERS
// ======================================================
const {
  createBlogPost,
  getBlogPosts,
  getBlogBySlug,
  getBlogById,
  updateBlogPost,
  deleteBlogPost,
  getRelatedBlogs,
} = require("../controllers/blog.controller");

// ======================================================
// MIDDLEWARE
// ======================================================
const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get all blogs
router.get("/", getBlogPosts);

// Related blogs
router.get("/related/:id", getRelatedBlogs);

// SEO slug route
router.get("/slug/:slug", getBlogBySlug);

// Get blog by ID
router.get("/:id", getBlogById);

// ======================================================
// PROTECTED ROUTES
// Admin + Agent
// ======================================================

// Create blog
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  createBlogPost,
);

// Update blog
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  updateBlogPost,
);

// Delete blog
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  deleteBlogPost,
);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
