const BlogPost = require("../models/BlogPost");

const {
  cacheWrapper,
  generateCacheKey,
  clearBlogCache,
} = require("../utils/cache");

// ==========================================
// CREATE BLOG POST
// ==========================================
const createBlogPost = async (req, res) => {
  try {
    const blog = new BlogPost({
      ...req.body,
      author: req.user._id,
    });

    await blog.save();

    await clearBlogCache();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET BLOG POSTS (FILTER + CACHE)
// ==========================================
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

    const query = { status };

    if (category) query.category = category;
    if (tag) query.tags = tag;

    if (keyword) {
      query.$text = { $search: keyword };
    }

    const cacheKey = generateCacheKey("blogs", req.query);

    const result = await cacheWrapper({
      key: cacheKey,
      ttl: 120,
      fetchFunction: async () => {
        const blogs = await BlogPost.find(query)
          .populate("author", "name")
          .sort(sort)
          .skip((page - 1) * limit)
          .limit(Number(limit))
          .lean();

        const total = await BlogPost.countDocuments(query);

        return {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
          data: blogs,
        };
      },
    });

    res.json({
      success: true,
      source: result.source,
      ...result.data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET BLOG BY SLUG (SEO)
// ==========================================
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const cacheKey = `blog:${slug}`;

    const result = await cacheWrapper({
      key: cacheKey,
      ttl: 300,
      fetchFunction: async () => {
        const blog = await BlogPost.findOne({
          slug,
          status: "published",
        })
          .populate("author", "name")
          .lean();

        if (!blog) throw new Error("Blog not found");

        // increment views async
        BlogPost.updateOne({ _id: blog._id }, { $inc: { views: 1 } }).exec();

        return blog;
      },
    });

    res.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET BLOG BY ID
// ==========================================
const getBlogById = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id)
      .populate("author", "name email")
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// UPDATE BLOG
// ==========================================
const updateBlogPost = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (
      blog.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    Object.assign(blog, req.body);

    if (req.body.status === "published" && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

    await clearBlogCache();

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// DELETE BLOG
// ==========================================
const deleteBlogPost = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (
      blog.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await blog.deleteOne();

    await clearBlogCache();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// RELATED BLOGS (SEO BOOST)
// ==========================================
const getRelatedBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogPost.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const related = await BlogPost.find({
      _id: { $ne: blog._id },
      category: blog.category,
      status: "published",
    })
      .limit(4)
      .sort("-createdAt")
      .lean();

    res.json({
      success: true,
      data: related,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogBySlug,
  getBlogById,
  updateBlogPost,
  deleteBlogPost,
  getRelatedBlogs,
};
