const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    // ===============================
    // BASIC INFO
    // ===============================
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    excerpt: String,

    content: {
      type: String, // Rich text (HTML / Markdown)
      required: true,
    },

    featuredImage: String,

    // ===============================
    // CATEGORIZATION
    // ===============================
    category: {
      type: String,
      required: true,
      index: true,
    },

    tags: [
      {
        type: String,
        index: true,
      },
    ],

    // ===============================
    // AUTHOR
    // ===============================
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ===============================
    // SEO FIELDS
    // ===============================
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: String,
      ogImage: String,
    },

    // ===============================
    // PUBLISHING
    // ===============================
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    publishedAt: Date,

    // ===============================
    // ENGAGEMENT
    // ===============================
    views: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// ===============================
// INDEXES
// ===============================
blogPostSchema.index({ title: "text", content: "text" });
blogPostSchema.index({ category: 1, status: 1, createdAt: -1 });

// ===============================
// AUTO SLUG GENERATION
// ===============================
blogPostSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
