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

const uploadMulter = require("../middleware/uploadMulter");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get all blogs
router.get("/", getBlogPosts);

// Related blogs
router.get("/related/:id", getRelatedBlogs);

// SEO slug route
router.get("/slug/:slug", getBlogBySlug);

// ======================================================
// PROTECTED ROUTES
// ======================================================

// CREATE BLOG
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  uploadMulter.single("featuredImage"),
  createBlogPost,
);

// UPDATE BLOG
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  uploadMulter.single("featuredImage"),
  updateBlogPost,
);

// DELETE BLOG
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  deleteBlogPost,
);

// ======================================================
// KEEP DYNAMIC ROUTE LAST
// ======================================================
router.get("/:id", getBlogById);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
