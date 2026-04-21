const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");
const xss = require("xss");

// ==========================================
// CREATE COMMENT
// ==========================================
const createComment = async (req, res) => {
  try {
    const { blogPost, content, parent, name, email } = req.body;

    if (!blogPost || !content) {
      return res.status(400).json({
        success: false,
        message: "BlogPost and content are required",
      });
    }

    // ✅ XSS Sanitization
    const safeContent = xss(content);
    const safeName = name ? xss(name) : undefined;
    const safeEmail = email ? xss(email) : undefined;

    const comment = new Comment({
      blogPost,
      content: safeContent,
      parent: parent || null,
      name: req.user ? undefined : safeName,
      email: req.user ? undefined : safeEmail,
      user: req.user ? req.user._id : null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    await comment.save();

    // ✅ Only root comments counted
    if (!parent) {
      await BlogPost.updateOne(
        { _id: blogPost },
        { $inc: { commentsCount: 1 } },
      );
    }

    res.status(201).json({
      success: true,
      message: "Comment submitted (awaiting approval)",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET COMMENTS (TREE STRUCTURE)
// ==========================================
const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({
      blogPost: blogId,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    const map = {};
    const roots = [];

    // Build map
    comments.forEach((c) => {
      map[c._id] = { ...c, replies: [] };
    });

    // Build tree
    comments.forEach((c) => {
      if (c.parent && map[c.parent]) {
        map[c.parent].replies.push(map[c._id]);
      } else {
        roots.push(map[c._id]);
      }
    });

    res.json({ success: true, data: roots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// UPDATE COMMENT STATUS (ADMIN)
// ==========================================
const updateCommentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    comment.status = status;
    await comment.save();

    res.json({
      success: true,
      message: "Comment status updated",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// DELETE COMMENT
// ==========================================
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    await comment.deleteOne();

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET ALL COMMENTS (ADMIN)
// ==========================================
const getAllComments = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;

    const comments = await Comment.find(query)
      .populate("blogPost", "title slug")
      .populate("user", "name email")
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Comment.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: comments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// LIKE COMMENT
// ==========================================
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true },
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByBlog,
  updateCommentStatus,
  deleteComment,
  getAllComments,
  likeComment,
};
