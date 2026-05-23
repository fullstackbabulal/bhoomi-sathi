// ======================================================
// File: controllers/commentController.js
// Description: Comment Controller
// ======================================================

const xss = require("xss");

const Comment = require("../models/Comment.model.js");
const BlogPost = require("../models/BlogPost.model.js");

// ======================================================
// CREATE COMMENT
// ======================================================
const createComment = async (
  req,
  res
) => {
  try {
    const {
      blogPost,
      content,
      parent,
      name,
      email,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!blogPost || !content) {
      return res.status(400).json({
        success: false,
        message:
          "Blog post and content are required",
      });
    }

    // ==========================================
    // XSS SANITIZATION
    // ==========================================
    const safeContent = xss(content);

    const safeName = name
      ? xss(name)
      : "";

    const safeEmail = email
      ? xss(email)
      : "";

    // ==========================================
    // CREATE COMMENT
    // ==========================================
    const comment =
      await Comment.create({
        blogPost,
        content: safeContent,
        parent: parent || null,

        // Logged in user
        user: req.user
          ? req.user._id
          : null,

        // Guest user
        name: req.user
          ? ""
          : safeName,

        email: req.user
          ? ""
          : safeEmail,

        ipAddress: req.ip,
        userAgent:
          req.headers[
            "user-agent"
          ],
      });

    // ==========================================
    // ROOT COMMENT COUNT
    // ==========================================
    if (!parent) {
      await BlogPost.findByIdAndUpdate(
        blogPost,
        {
          $inc: {
            commentsCount: 1,
          },
        }
      );
    }

    return res.status(201).json({
      success: true,
      message:
        "Comment submitted successfully",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ======================================================
// GET COMMENTS BY BLOG
// TREE STRUCTURE
// ======================================================
const getCommentsByBlog =
  async (req, res) => {
    try {
      const { blogId } =
        req.params;

      const comments =
        await Comment.find({
          blogPost:
            blogId,
          status:
            "approved",
        })
          .sort({
            createdAt:
              -1,
          })
          .lean();

      // ==========================================
      // TREE STRUCTURE
      // ==========================================
      const map = {};
      const roots = [];

      comments.forEach(
        (comment) => {
          map[
            comment._id
          ] = {
            ...comment,
            replies: [],
          };
        }
      );

      comments.forEach(
        (comment) => {
          if (
            comment.parent &&
            map[
              comment.parent
            ]
          ) {
            map[
              comment.parent
            ].replies.push(
              map[
                comment._id
              ]
            );
          } else {
            roots.push(
              map[
                comment._id
              ]
            );
          }
        }
      );

      return res.status(200).json({
        success: true,
        data: roots,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// UPDATE COMMENT STATUS
// ======================================================
const updateCommentStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const allowedStatus =
        [
          "pending",
          "approved",
          "spam",
        ];

      if (
        !allowedStatus.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status",
        });
      }

      const comment =
        await Comment.findById(
          req.params.id
        );

      if (!comment) {
        return res.status(404).json({
          success: false,
          message:
            "Comment not found",
        });
      }

      comment.status =
        status;

      await comment.save();

      return res.status(200).json({
        success: true,
        message:
          "Comment updated successfully",
        data: comment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// DELETE COMMENT
// ======================================================
const deleteComment =
  async (req, res) => {
    try {
      const comment =
        await Comment.findById(
          req.params.id
        );

      if (!comment) {
        return res.status(404).json({
          success: false,
          message:
            "Comment not found",
        });
      }

      // Decrease comment count
      if (!comment.parent) {
        await BlogPost.findByIdAndUpdate(
          comment.blogPost,
          {
            $inc: {
              commentsCount:
                -1,
            },
          }
        );
      }

      await comment.deleteOne();

      return res.status(200).json({
        success: true,
        message:
          "Comment deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// GET ALL COMMENTS
// ======================================================
const getAllComments =
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 20,
        status,
      } = req.query;

      const query = {};

      if (status) {
        query.status =
          status;
      }

      const comments =
        await Comment.find(
          query
        )
          .populate(
            "blogPost",
            "title slug"
          )
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt:
              -1,
          })
          .skip(
            (page - 1) *
              Number(limit)
          )
          .limit(
            Number(limit)
          );

      const total =
        await Comment.countDocuments(
          query
        );

      return res.status(200).json({
        success: true,
        total,
        page:
          Number(page),
        pages:
          Math.ceil(
            total /
              Number(
                limit
              )
          ),
        data: comments,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ======================================================
// LIKE COMMENT
// ======================================================
const likeComment =
  async (req, res) => {
    try {
      const comment =
        await Comment.findByIdAndUpdate(
          req.params.id,
          {
            $inc: {
              likes: 1,
            },
          },
          {
            new: true,
          }
        );

      if (!comment) {
        return res.status(404).json({
          success: false,
          message:
            "Comment not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: comment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
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