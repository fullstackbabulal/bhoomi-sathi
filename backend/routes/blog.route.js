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
  uploadBlogFeaturedImage,
  getBlogPosts,
  getBlogBySlug,
  getBlogById,
  updateBlogPost,
  deleteBlogPost,
  getRelatedBlogs,
  updateBlogStatus,
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

// GET ALL BLOGS
router.get("/", getBlogPosts);

// RELATED BLOGS
router.get("/related/:id", getRelatedBlogs);

// SEO SLUG ROUTE
router.get("/slug/:slug", getBlogBySlug);

// ======================================================
// PROTECTED ROUTES
// ======================================================
router.patch(
  "/:id/status",

  authMiddleware,

  roleMiddleware("admin", "agent"),

  updateBlogStatus,
);
// ======================================================
// BLOG IMAGE UPLOAD
// POST /api/blogs/upload-image
// ======================================================
router.post(
  "/upload-image",

  authMiddleware,

  roleMiddleware("admin", "agent"),

  uploadMulter.single("featuredImage"),

  uploadBlogFeaturedImage,
);

// ======================================================
// CREATE BLOG
// POST /api/blogs/add
// ======================================================
router.post(
  "/add",

  authMiddleware,

  roleMiddleware("admin", "agent"),

  uploadMulter.single("featuredImage"),

  createBlogPost,
);

// ======================================================
// UPDATE BLOG
// PUT /api/blogs/:id
// ======================================================
router.put(
  "/:id",

  authMiddleware,

  roleMiddleware("admin", "agent"),

  uploadMulter.single("featuredImage"),

  updateBlogPost,
);

// ======================================================
// DELETE BLOG
// DELETE /api/blogs/:id
// ======================================================
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
