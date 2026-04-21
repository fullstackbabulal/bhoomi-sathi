const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  createComment,
  getCommentsByBlog,
  updateCommentStatus,
  deleteComment,
  getAllComments,
  likeComment,
} = require("../controllers/commentController");

const router = express.Router();

// ✅ Rate Limiter (Anti-Spam)
const commentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 comments per minute per IP
  message: {
    success: false,
    message: "Too many comments. Please try again later.",
  },
});

// =============================
// PUBLIC ROUTES
// =============================
router.post("/", commentLimiter, createComment);
router.get("/:blogId", getCommentsByBlog);
router.post("/like/:id", likeComment);

// =============================
// ADMIN ROUTES
// =============================
router.patch("/:id/status", updateCommentStatus);
router.delete("/:id", deleteComment);
router.get("/", getAllComments);

module.exports = router;
