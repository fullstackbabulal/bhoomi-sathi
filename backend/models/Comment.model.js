// ======================================================
// File: models/Comment.js
// Description: Comment Model
// ======================================================

const mongoose = require("mongoose");

// ======================================================
// COMMENT SCHEMA
// ======================================================
const commentSchema = new mongoose.Schema(
  {
    // ==================================================
    // BLOG RELATION
    // ==================================================
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
      index: true,
    },

    // ==================================================
    // USER RELATION (OPTIONAL)
    // Logged-in user
    // ==================================================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ==================================================
    // GUEST USER INFO
    // ==================================================
    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    // ==================================================
    // COMMENT CONTENT
    // ==================================================
    content: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },

    // ==================================================
    // REPLY SYSTEM
    // ==================================================
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },

    // Reply depth (max 3)
    depth: {
      type: Number,
      default: 0,
      max: 3,
    },

    // ==================================================
    // MODERATION
    // ==================================================
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "spam",
      ],
      default: "pending",
      index: true,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    // ==================================================
    // ENGAGEMENT
    // ==================================================
    likes: {
      type: Number,
      default: 0,
    },

    // ==================================================
    // SECURITY
    // ==================================================
    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// INDEXES
// ======================================================
commentSchema.index({
  blogPost: 1,
  parent: 1,
  createdAt: -1,
});

// ======================================================
// LIMIT COMMENT DEPTH
// Prevent infinite nesting
// ======================================================
commentSchema.pre(
  "save",
  async function (next) {
    try {
      if (!this.parent) {
        return next();
      }

      const parentComment =
        await mongoose
          .model("Comment")
          .findById(this.parent);

      if (!parentComment) {
        return next(
          new Error(
            "Parent comment not found"
          )
        );
      }

      this.depth =
        (parentComment.depth || 0) + 1;

      if (this.depth > 3) {
        return next(
          new Error(
            "Maximum reply depth exceeded"
          )
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

// ======================================================
// EXPORT MODEL
// ======================================================
module.exports = mongoose.model(
  "Comment",
  commentSchema
);