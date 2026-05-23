// ======================================================
// File: backend/routes/comment.route.js
// Description: Comment Routes
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
// ======================================================
const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many comments. Please try again later.",
  },
});

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get comments by blog
router.get("/:blogId", getCommentsByBlog);

// Like comment
router.post("/like/:id", likeComment);

// ======================================================
// AUTHENTICATED USERS
// admin / agent / user
// ======================================================

// Create comment
router.post(
  "/",
  commentLimiter,
  authMiddleware,
  roleMiddleware("admin", "agent", "user"),
  createComment,
);

// ======================================================
// ADMIN ONLY ROUTES
// ======================================================

// Get all comments
router.get("/", authMiddleware, roleMiddleware("admin"), getAllComments);

// Update comment status
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateCommentStatus,
);

// Delete comment
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteComment);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
