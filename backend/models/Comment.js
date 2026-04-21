const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    // ===============================
    // RELATIONS
    // ===============================
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ===============================
    // COMMENT DATA
    // ===============================
    name: String, // for guest users
    email: String, // optional

    content: {
      type: String,
      required: true,
      trim: true,
    },

    // ===============================
    // THREADING (IMPORTANT)
    // ===============================
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },

    // depth control (performance safe)
    depth: {
      type: Number,
      default: 0,
      max: 3, // prevent infinite nesting
    },

    // ===============================
    // MODERATION
    // ===============================
    status: {
      type: String,
      enum: ["pending", "approved", "spam"],
      default: "pending",
      index: true,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // ENGAGEMENT
    // ===============================
    likes: {
      type: Number,
      default: 0,
    },

    // ===============================
    // SECURITY / ANTI-SPAM
    // ===============================
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true },
);

// ===============================
// INDEXES
// ===============================
commentSchema.index({ blogPost: 1, parent: 1, createdAt: -1 });

// ===============================
// HELPER: LIMIT DEPTH
// ===============================
commentSchema.pre("save", async function (next) {
  if (this.parent) {
    const parentComment = await mongoose.model("Comment").findById(this.parent);

    if (parentComment) {
      this.depth = parentComment.depth + 1;

      if (this.depth > 3) {
        return next(new Error("Maximum comment nesting depth exceeded"));
      }
    }
  }
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
