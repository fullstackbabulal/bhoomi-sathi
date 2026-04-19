import Comment from "../models/Comment.js";
import BlogPost from "../models/BlogPost.js";

// ==========================================
// CREATE COMMENT (USER / GUEST)
// ==========================================
export const createComment = async (req, res) => {
  try {
    const { blogPost, content, parent, name, email } = req.body;

    if (!blogPost || !content) {
      return res.status(400).json({
        success: false,
        message: "BlogPost and content are required",
      });
    }

    const comment = new Comment({
      blogPost,
      content,
      parent: parent || null,
      name: req.user ? undefined : name,
      email: req.user ? undefined : email,
      user: req.user ? req.user._id : null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    await comment.save();

    // Increment comment count (only for root comments or approved later)
    await BlogPost.updateOne({ _id: blogPost }, { $inc: { commentsCount: 1 } });

    res.status(201).json({
      success: true,
      message: "Comment submitted (awaiting approval)",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET COMMENTS (NESTED TREE)
// ==========================================
export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({
      blogPost: blogId,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    // ===============================
    // BUILD TREE STRUCTURE
    // ===============================
    const map = {};
    const roots = [];

    comments.forEach((comment) => {
      map[comment._id] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
      if (comment.parent) {
        if (map[comment.parent]) {
          map[comment.parent].replies.push(map[comment._id]);
        }
      } else {
        roots.push(map[comment._id]);
      }
    });

    res.json({
      success: true,
      data: roots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// MODERATE COMMENT (ADMIN)
// ==========================================
export const updateCommentStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved / spam / pending

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
export const deleteComment = async (req, res) => {
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
// GET ALL COMMENTS (ADMIN PANEL)
// ==========================================
export const getAllComments = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;

    const comments = await Comment.find(query)
      .populate("blogPost", "title slug")
      .populate("user", "name email")
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(Number(limit));

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
// LIKE COMMENT (ENGAGEMENT)
// ==========================================
export const likeComment = async (req, res) => {
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
