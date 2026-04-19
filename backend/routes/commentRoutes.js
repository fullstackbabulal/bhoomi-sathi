import express from "express";
import {
  createComment,
  getCommentsByBlog,
  updateCommentStatus,
  deleteComment,
  getAllComments,
  likeComment,
} from "../controllers/commentController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Create comment (guest or logged-in user)
router.post("/", createComment);

// Get comments for a blog (nested tree)
router.get("/blog/:blogId", getCommentsByBlog);

// Like a comment
router.patch("/like/:id", likeComment);

// ==========================================
// ADMIN ROUTES (MODERATION)
// ==========================================

// Get all comments (admin panel with filters)
router.get("/", protect, authorize("admin"), getAllComments);

// Approve / mark spam / pending
router.patch("/:id/status", protect, authorize("admin"), updateCommentStatus);

// Delete comment
router.delete("/:id", protect, authorize("admin"), deleteComment);

export default router;
