// ======================================================
// File: controllers/blogController.js
// Description: Blog Controller
// ======================================================

const BlogPost = require("../models/BlogPost.model.js");

const {
  cacheWrapper,
  generateCacheKey,
  clearBlogCache,
} = require("../utils/cache.utils.js");

// ======================================================
// CREATE BLOG
// ======================================================
const createBlogPost = async (
  req,
  res
) => {
  try {
    const blog =
      await BlogPost.create({
        ...req.body,
        author: req.user._id,
      });

    await clearBlogCache();

    return res.status(201).json({
      success: true,
      message:
        "Blog created successfully",
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
// GET BLOG POSTS
// FILTER + SEARCH + PAGINATION
// ======================================================
const getBlogPosts = async (
  req,
  res
) => {
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

    // ==========================================
    // FILTERS
    // ==========================================
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

    const cacheKey =
      generateCacheKey(
        "blogs",
        req.query
      );

    const result =
      await cacheWrapper({
        key: cacheKey,

        fetchFunction:
          async () => {
            const blogs =
              await BlogPost.find(
                query
              )
                .populate(
                  "author",
                  "name email"
                )
                .sort(sort)
                .skip(
                  (page - 1) *
                    Number(limit)
                )
                .limit(
                  Number(limit)
                );

            const total =
              await BlogPost.countDocuments(
                query
              );

            return {
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
              data: blogs,
            };
          },
      });

    return res.status(200).json({
      success: true,
      source:
        result.source,
      ...result.data,
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
// GET BLOG BY SLUG
// ======================================================
const getBlogBySlug = async (
  req,
  res
) => {
  try {
    const { slug } =
      req.params;

    const result =
      await cacheWrapper({
        key: `blog:${slug}`,

        fetchFunction:
          async () => {
            const blog =
              await BlogPost.findOne(
                {
                  slug,
                  status:
                    "published",
                }
              ).populate(
                "author",
                "name email"
              );

            if (!blog) {
              throw new Error(
                "Blog not found"
              );
            }

            // Increment views
            BlogPost.updateOne(
              {
                _id: blog._id,
              },
              {
                $inc: {
                  views: 1,
                },
              }
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
      message:
        error.message,
    });
  }
};

// ======================================================
// GET BLOG BY ID
// ======================================================
const getBlogById = async (
  req,
  res
) => {
  try {
    const blog =
      await BlogPost.findById(
        req.params.id
      ).populate(
        "author",
        "name email"
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message:
          "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
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
// UPDATE BLOG
// ======================================================
const updateBlogPost =
  async (req, res) => {
    try {
      const blog =
        await BlogPost.findById(
          req.params.id
        );

      if (!blog) {
        return res.status(404).json({
          success: false,
          message:
            "Blog not found",
        });
      }

      // Owner or admin
      const isOwner =
        blog.author.toString() ===
        req.user._id.toString();

      const isAdmin =
        req.user.role ===
        "admin";

      if (
        !isOwner &&
        !isAdmin
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      Object.assign(
        blog,
        req.body
      );

      // Set publish date
      if (
        req.body
          .status ===
          "published" &&
        !blog.publishedAt
      ) {
        blog.publishedAt =
          new Date();
      }

      await blog.save();

      await clearBlogCache();

      return res.status(200).json({
        success: true,
        message:
          "Blog updated successfully",
        data: blog,
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
// DELETE BLOG
// ======================================================
const deleteBlogPost =
  async (req, res) => {
    try {
      const blog =
        await BlogPost.findById(
          req.params.id
        );

      if (!blog) {
        return res.status(404).json({
          success: false,
          message:
            "Blog not found",
        });
      }

      const isOwner =
        blog.author.toString() ===
        req.user._id.toString();

      const isAdmin =
        req.user.role ===
        "admin";

      if (
        !isOwner &&
        !isAdmin
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      await blog.deleteOne();

      await clearBlogCache();

      return res.status(200).json({
        success: true,
        message:
          "Blog deleted successfully",
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
// RELATED BLOGS
// ======================================================
const getRelatedBlogs =
  async (req, res) => {
    try {
      const blog =
        await BlogPost.findById(
          req.params.id
        );

      if (!blog) {
        return res.status(404).json({
          success: false,
          message:
            "Blog not found",
        });
      }

      const related =
        await BlogPost.find({
          _id: {
            $ne:
              blog._id,
          },
          category:
            blog.category,
          status:
            "published",
        })
          .sort({
            createdAt:
              -1,
          })
          .limit(4);

      return res.status(200).json({
        success: true,
        data: related,
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
  createBlogPost,
  getBlogPosts,
  getBlogBySlug,
  getBlogById,
  updateBlogPost,
  deleteBlogPost,
  getRelatedBlogs,
};