import BlogPost from "../models/BlogPost.js";

// OPTIONAL REDIS
// import redisClient from "../config/redis.js";

// ==========================================
// CREATE BLOG POST (ADMIN)
// ==========================================
export const createBlogPost = async (req, res) => {
  try {
    const blog = new BlogPost({
      ...req.body,
      author: req.user._id,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL BLOG POSTS (FILTER + PAGINATION)
// ==========================================
export const getBlogPosts = async (req, res) => {
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

    // FILTERS
    if (category) query.category = category;
    if (tag) query.tags = tag;

    // SEARCH
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // CACHE KEY
    const cacheKey = `blogs:${JSON.stringify(req.query)}`;

    // if (redisClient) {
    //   const cached = await redisClient.get(cacheKey);
    //   if (cached) return res.json(JSON.parse(cached));
    // }

    const blogs = await BlogPost.find(query)
      .populate("author", "name")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await BlogPost.countDocuments(query);

    const response = {
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: blogs,
    };

    // if (redisClient) {
    //   await redisClient.set(cacheKey, JSON.stringify(response), "EX", 120);
    // }

    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET SINGLE BLOG (BY SLUG - SEO)
// ==========================================
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await BlogPost.findOne({
      slug,
      status: "published",
    }).populate("author", "name");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Increment views (non-blocking)
    BlogPost.updateOne({ _id: blog._id }, { $inc: { views: 1 } }).exec();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET BLOG BY ID (ADMIN)
// ==========================================
export const getBlogById = async (req, res) => {
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

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// UPDATE BLOG
// ==========================================
export const updateBlogPost = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // AUTH CHECK (AUTHOR OR ADMIN)
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

    // Auto set publishedAt
    if (req.body.status === "published" && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

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
export const deleteBlogPost = async (req, res) => {
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

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// RELATED BLOGS (SEO INTERNAL LINKING)
// ==========================================
export const getRelatedBlogs = async (req, res) => {
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
      .sort("-createdAt");

    res.json({
      success: true,
      data: related,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
