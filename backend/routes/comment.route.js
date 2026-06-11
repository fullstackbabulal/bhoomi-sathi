// ======================================================
// File: backend/routes/comment.route.js
// Description: Comment Routes
//
// Base Route:
// /api/comments
//
// Final Endpoints:
// GET    /api/comments/:slug/comments
// POST   /api/comments/:slug/comments
// POST   /api/comments/like/:id
// GET    /api/comments
// PATCH  /api/comments/:id/status
// DELETE /api/comments/:id
// ======================================================

const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// ======================================================
// CONTROLLERS
// ======================================================
const {
  createComment,
  getCommentsByBlog,
  updateCommentStatus,
  deleteComment,
  getAllComments,
  likeComment,
} = require("../controllers/comment.controller");

// ======================================================
// MIDDLEWARE
// ======================================================
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// ======================================================
// RATE LIMITER
// Prevent comment spam
// ======================================================
const commentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,

  message: {
    success: false,
    message: "Too many comments. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

// ======================================================
// PUBLIC ROUTES
// ======================================================

// ======================================================
// GET COMMENTS BY BLOG SLUG
// GET /api/comments/:slug/comments
// ======================================================
router.get("/:slug/comments", getCommentsByBlog);

// ======================================================
// LIKE COMMENT
// POST /api/comments/like/:id
// ======================================================
router.post("/like/:id", likeComment);

// ======================================================
// AUTHENTICATED USER ROUTES
// admin / agent / user
// ======================================================

// ======================================================
// CREATE COMMENT
// POST /api/comments/:slug/comments
// ======================================================
router.post(
  "/:slug/comments",
  commentLimiter,
  authMiddleware,
  roleMiddleware("admin", "agent", "user"),
  createComment,
);

// ======================================================
// ADMIN ONLY ROUTES
// ======================================================

// ======================================================
// GET ALL COMMENTS
// GET /api/comments
// ======================================================
router.get("/", authMiddleware, roleMiddleware("admin"), getAllComments);

// ======================================================
// UPDATE COMMENT STATUS
// PATCH /api/comments/:id/status
// ======================================================
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateCommentStatus,
);

// ======================================================
// DELETE COMMENT
// DELETE /api/comments/:id
// ======================================================
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteComment);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
