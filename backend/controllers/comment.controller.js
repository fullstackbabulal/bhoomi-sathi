// ======================================================
// File: backend/controllers/comment.controller.js
// Description: Comment Controller
// Supports:
// GET  /api/comments/:slug/comments
// POST /api/comments/:slug/comments
// ======================================================

const xss = require("xss");

const Comment = require("../models/Comment.model.js");
const BlogPost = require("../models/BlogPost.model.js");

// ======================================================
// CREATE COMMENT
// POST /api/comments/:slug/comments
// ======================================================

const createComment = async (req, res) => {
  try {
    const { slug } = req.params;

    const { content, parent = null, name = "", email = "" } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Blog slug is required.",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required.",
      });
    }

    // ==================================================
    // FIND BLOG
    // ==================================================

    const blog = await BlogPost.findOne({
      slug,
    }).select("_id");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // ==================================================
    // SANITIZE INPUT
    // ==================================================

    const safeContent = xss(content.trim());

    const safeName = name ? xss(name.trim()) : "";

    const safeEmail = email ? xss(email.trim()) : "";

    // ==================================================
    // USER DETAILS
    // ==================================================

    let commentName = safeName;
    let commentEmail = safeEmail;

    if (req.user) {
      commentName = req.user.name || req.user.fullName || safeName;

      commentEmail = req.user.email || safeEmail;
    }

    // ==================================================
    // CREATE COMMENT
    // ==================================================

    const comment = await Comment.create({
      blogPost: blog._id,

      content: safeContent,

      parent,

      user: req.user?._id || null,

      name: commentName,

      email: commentEmail,

      status: "pending",

      ipAddress: req.ip,

      userAgent: req.headers["user-agent"] || "",
    });

    // ==================================================
    // UPDATE COMMENT COUNT
    // ==================================================

    if (!parent) {
      await BlogPost.findByIdAndUpdate(blog._id, {
        $inc: {
          commentsCount: 1,
        },
      });
    }

    // ==================================================
    // POPULATE USER
    // ==================================================

    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name email avatar role")
      .lean();

    return res.status(201).json({
      success: true,
      message: "Comment submitted successfully.",
      data: populatedComment,
    });
  } catch (error) {
    console.error("Create Comment Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create comment.",
    });
  }
};

// ======================================================
// GET COMMENTS BY BLOG
// TREE STRUCTURE
// GET /api/comments/:slug/comments
// ======================================================
const getCommentsByBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    // ==================================================
    // FIND BLOG
    // ==================================================
    const blog = await BlogPost.findOne({
      slug,
    }).select("_id");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // ==================================================
    // GET COMMENTS
    // ==================================================
    const comments = await Comment.find({
      blogPost: blog._id,
      status: "approved",
    })
      .populate("user", "name email avatar role")
      .sort({
        createdAt: -1,
      })
      .lean();

    // ==================================================
    // TREE STRUCTURE
    // ==================================================
    const map = {};
    const roots = [];

    comments.forEach((comment) => {
      map[comment._id] = {
        ...comment,
        replies: [],
      };
    });

    comments.forEach((comment) => {
      if (comment.parent && map[comment.parent]) {
        map[comment.parent].replies.push(map[comment._id]);
      } else {
        roots.push(map[comment._id]);
      }
    });

    return res.status(200).json({
      success: true,
      total: roots.length,
      data: roots,
    });
  } catch (error) {
    console.error("Get Comments Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch comments.",
    });
  }
};

// ======================================================
// UPDATE COMMENT STATUS
// ADMIN ONLY
// ======================================================
const updateCommentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["pending", "approved", "spam"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    comment.status = status;

    await comment.save();

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully.",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE COMMENT
// ======================================================
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (!comment.parent) {
      await BlogPost.findByIdAndUpdate(comment.blogPost, {
        $inc: {
          commentsCount: -1,
        },
      });
    }

    await comment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL COMMENTS
// ADMIN ONLY
// ======================================================
const getAllComments = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    const comments = await Comment.find(query)
      .populate("blogPost", "title slug")
      .populate("user", "name email avatar role")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Comment.countDocuments(query);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// LIKE COMMENT
// ======================================================
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          likes: 1,
        },
      },
      {
        new: true,
      },
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  createComment,
  getCommentsByBlog,
  updateCommentStatus,
  deleteComment,
  getAllComments,
  likeComment,
};
