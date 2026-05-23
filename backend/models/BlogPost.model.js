// ======================================================
// File: models/BlogPost.js
// Description: Blog Post Model
// ======================================================

const mongoose = require("mongoose");

// ======================================================
// BLOG POST SCHEMA
// ======================================================
const blogPostSchema = new mongoose.Schema(
  {
    // ==================================================
    // BASIC INFO
    // ==================================================
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      default: "",
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    featuredImage: {
      type: String,
      default: "",
    },

    // ==================================================
    // CATEGORY & TAGS
    // ==================================================
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    // ==================================================
    // AUTHOR
    // ==================================================
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ==================================================
    // SEO
    // ==================================================
    seo: {
      metaTitle: {
        type: String,
        default: "",
      },

      metaDescription: {
        type: String,
        default: "",
      },

      keywords: {
        type: [String],
        default: [],
      },

      canonicalUrl: {
        type: String,
        default: "",
      },

      ogImage: {
        type: String,
        default: "",
      },
    },

    // ==================================================
    // PUBLISHING
    // ==================================================
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    // ==================================================
    // ENGAGEMENT
    // ==================================================
    views: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// INDEXES
// ======================================================

// Text search
blogPostSchema.index({
  title: "text",
  content: "text",
});

// Category filtering
blogPostSchema.index({
  category: 1,
  status: 1,
  createdAt: -1,
});

// ======================================================
// AUTO GENERATE SLUG
// ======================================================
blogPostSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  next();
});

// ======================================================
// AUTO SET PUBLISHED DATE
// ======================================================
blogPostSchema.pre("save", function (next) {
  if (
    this.status === "published" &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }

  next();
});

// ======================================================
// EXPORT MODEL
// ======================================================
module.exports = mongoose.model(
  "BlogPost",
  blogPostSchema
);