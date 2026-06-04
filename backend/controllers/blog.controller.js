// ======================================================
// File: backend/controllers/blog.controller.js
// Description: Blog Controller
// ======================================================

const BlogPost = require("../models/BlogPost.model.js");

const {
  cacheWrapper,
  generateCacheKey,
  clearBlogCache,
} = require("../utils/cache.utils.js");

// ======================================================
// HELPERS
// ======================================================

const parseTags = (tags) => {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const safeSlug = (title = "", slug = "") => {
  return (
    slug?.trim() ||
    title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
  );
};

const safeString = (value = "") => {
  return typeof value === "string" ? value.trim() : "";
};

// ======================================================
// SAFE FEATURED IMAGE PATH
// ======================================================

const getFeaturedImagePath = (req, slug = "") => {
  // ==========================================
  // NO FILE
  // ==========================================
  if (!req?.file) {
    return "";
  }

  // ==========================================
  // SAFE SLUG
  // prevents:
  // /blog//filename.jpg
  // ==========================================
  const safeFolderSlug = safeString(slug) || "general";

  // ==========================================
  // SAFE FILENAME
  // ==========================================
  const fileName = req.file.filename?.replaceAll("\\", "/").trim();

  // ==========================================
  // NORMALIZED PATH
  // ==========================================
  return `/uploads/images/blog/${safeFolderSlug}/${fileName}`
    .replace(/\/+/g, "/")
    .trim();
};

// ======================================================
// CREATE BLOG
// ======================================================
const createBlogPost = async (req, res) => {
  try {
    // ==========================================
    // BASIC DATA
    // ==========================================
    const title = safeString(req.body.title);

    const slug = safeSlug(title, req.body.slug) || "general";

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!title || !req.body.content || !req.body.category) {
      return res.status(400).json({
        success: false,

        message: "Title, content and category are required.",
      });
    }

    // ==========================================
    // FEATURED IMAGE
    // SUPPORTS:
    // A) uploaded image path string
    // B) multer upload fallback
    // ==========================================
    const featuredImage =
      req.body.featuredImage || getFeaturedImagePath(req, slug);

    // ==========================================
    // BLOG PAYLOAD
    // ==========================================
    const blogData = {
      // ======================================
      // BASIC INFO
      // ======================================
      title,

      slug,

      excerpt: safeString(req.body.excerpt),

      content: req.body.content || "",

      // ======================================
      // MEDIA
      // ======================================
      featuredImage,

      // ======================================
      // CATEGORY
      // ======================================
      category: safeString(req.body.category),

      tags: parseTags(req.body.tags),

      // ======================================
      // STATUS
      // ======================================
      status: req.body.status || "draft",

      publishedAt: req.body.status === "published" ? new Date() : null,

      // ======================================
      // SEO
      // ======================================
      seo: {
        metaTitle: safeString(req.body.metaTitle),

        metaDescription: safeString(req.body.metaDescription),

        keywords: req.body.focusKeyword ? [req.body.focusKeyword] : [],
      },

      // ======================================
      // USER
      // ======================================
      author: req.user._id,
    };

    // ==========================================
    // CREATE BLOG
    // ==========================================
    const blog = await BlogPost.create(blogData);

    // ==========================================
    // CLEAR CACHE
    // ==========================================
    await clearBlogCache();

    // ==========================================
    // RESPONSE
    // ==========================================
    return res.status(201).json({
      success: true,

      message: "Blog created successfully",

      data: blog,
    });
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to create blog",
    });
  }
};

// ======================================================
// GET BLOG POSTS
// FILTER + SEARCH + PAGINATION
// ======================================================
const getBlogPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      keyword,
      status = "published",
      sort = "-createdAt",
    } = req.query;

    const query = {
      status,
    };

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (keyword) {
      query.$text = {
        $search: keyword,
      };
    }

    const cacheKey = generateCacheKey("blogs", req.query);

    const result = await cacheWrapper({
      key: cacheKey,

      fetchFunction: async () => {
        const blogs = await BlogPost.find(query)
          .populate("author", "name email")
          .sort(sort)
          .skip((page - 1) * Number(limit))
          .limit(Number(limit));

        const total = await BlogPost.countDocuments(query);

        return {
          total,

          page: Number(page),

          pages: Math.ceil(total / Number(limit)),

          data: blogs,
        };
      },
    });

    return res.status(200).json({
      success: true,

      source: result.source,

      ...result.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// GET BLOG BY SLUG
// ======================================================
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await cacheWrapper({
      key: `blog:${slug}`,

      fetchFunction: async () => {
        const blog = await BlogPost.findOne({
          slug,

          status: "published",
        }).populate("author", "name email");

        if (!blog) {
          throw new Error("Blog not found");
        }

        BlogPost.updateOne(
          {
            _id: blog._id,
          },
          {
            $inc: {
              views: 1,
            },
          },
        ).exec();

        return blog;
      },
    });

    return res.status(200).json({
      success: true,

      data: result.data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// GET BLOG BY ID
// ======================================================
const getBlogById = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!blog) {
      return res.status(404).json({
        success: false,

        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,

      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// UPDATE BLOG
// ======================================================
const updateBlogPost = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,

        message: "Blog not found",
      });
    }

    const isOwner = blog.author.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,

        message: "Not authorized",
      });
    }

    // ==========================================
    // FIXED SLUG LOGIC
    // REQUIRED FOR MULTER PATH
    // ==========================================
    const updatedSlug =
      safeSlug(
        req.body.title || blog.title,

        req.body.slug || blog.slug,
      ) || "general";

    // ==========================================
    // SUPPORTS:
    // A) uploaded image path string
    // B) multer upload fallback
    // ==========================================
    const featuredImage = getFeaturedImagePath(req, updatedSlug);

    Object.assign(blog, {
      ...req.body,

      slug: updatedSlug,

      tags: parseTags(req.body.tags),

      seo: {
        metaTitle: req.body.metaTitle || "",

        metaDescription: req.body.metaDescription || "",

        keywords: req.body.focusKeyword ? [req.body.focusKeyword] : [],
      },
    });

    /**
     * Immediate upload workflow
     * string path support
     */
    if (req.body.featuredImage) {
      blog.featuredImage = req.body.featuredImage;
    } else if (featuredImage) {
      /**
       * Multer fallback
       */
      blog.featuredImage = featuredImage;
    }

    await blog.save();

    await clearBlogCache();

    return res.status(200).json({
      success: true,

      message: "Blog updated successfully.",

      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// DELETE BLOG
// ======================================================
const deleteBlogPost = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,

        message: "Blog not found",
      });
    }

    const isOwner = blog.author.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,

        message: "Not authorized",
      });
    }

    await blog.deleteOne();

    await clearBlogCache();

    return res.status(200).json({
      success: true,

      message: "Blog deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// RELATED BLOGS
// ======================================================
const getRelatedBlogs = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,

        message: "Blog not found",
      });
    }

    const related = await BlogPost.find({
      _id: {
        $ne: blog._id,
      },

      category: blog.category,

      status: "published",
    })
      .sort({
        createdAt: -1,
      })
      .limit(4);

    return res.status(200).json({
      success: true,

      data: related,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// UPLOAD BLOG FEATURED IMAGE
// ======================================================
const uploadBlogFeaturedImage = async (req, res) => {
  try {
    const title = req.body.title || "";

    const slug = safeSlug(title, req.body.slug);

    const featuredImage = getFeaturedImagePath(req, slug);

    if (!featuredImage) {
      return res.status(400).json({
        success: false,

        message: "Image upload failed",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Image uploaded successfully",

      data: {
        featuredImage,
      },
    });
  } catch (error) {
    console.error("UPLOAD BLOG IMAGE ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to upload image",
    });
  }
};

const updateBlogStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.status = status;

    if (status === "published") {
      blog.publishedAt = new Date();
    }

    await blog.save();

    await clearBlogCache();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: blog,
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
  createBlogPost,
  getBlogPosts,
  getBlogBySlug,
  getBlogById,
  updateBlogPost,
  deleteBlogPost,
  getRelatedBlogs,
  uploadBlogFeaturedImage,
  updateBlogStatus,
};
