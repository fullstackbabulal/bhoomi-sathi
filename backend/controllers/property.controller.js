// ======================================================
// File: controllers/propertyController.js
// Description: Property Controller
// ======================================================

const mongoose = require("mongoose");
const Property = require("../models/Property.model.js");

const {
  buildPropertyQuery,
  executePropertySearch,
} = require("../utils/propertyQuery.utils.js");

const {
  cacheWrapper,
  generateCacheKey,
  clearPropertyCache,
} = require("../utils/cache.utils.js");

// ======================================================
// CREATE PROPERTY
// ======================================================
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      postedBy: req.user._id,
    });

    await clearPropertyCache();

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL PROPERTIES
// SEARCH + FILTER + PAGINATION
// ======================================================
const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort,
    } = req.query;

    const query =
      buildPropertyQuery(req.query);

    // ==========================================
    // SORTING
    // ==========================================
    let sortOption = {
      createdAt: -1,
    };

    if (sort === "low") {
      sortOption = { price: 1 };
    }

    if (sort === "high") {
      sortOption = { price: -1 };
    }

    const cacheKey =
      generateCacheKey(
        "properties",
        req.query
      );

    const result = await cacheWrapper({
      key: cacheKey,

      fetchFunction: async () => {
        return await executePropertySearch({
          query,
          page: Number(page),
          limit: Number(limit),
          sort: sortOption,
        });
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
// GET PROPERTY BY SLUG
// ======================================================
const getPropertyBySlug = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const result =
      await cacheWrapper({
        key: `property:${slug}`,

        fetchFunction: async () => {
          const property =
            await Property.findOne({
              slug,
            }).populate(
              "postedBy",
              "name email phone"
            );

          if (!property) {
            throw new Error(
              "Property not found"
            );
          }

          // Increment views
          Property.updateOne(
            { _id: property._id },
            {
              $inc: { views: 1 },
            }
          ).exec();

          return property;
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
// GET PROPERTY BY ID
// ======================================================
const getPropertyById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // ==========================================
    // VALIDATE ID
    // ==========================================
    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid property ID",
      });
    }

    const property =
      await Property.findById(
        id
      ).populate(
        "postedBy",
        "name email phone"
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message:
          "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE PROPERTY
// ======================================================
const updateProperty = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message:
          "Property not found",
      });
    }

    // ==========================================
    // OWNER / ADMIN CHECK
    // ==========================================
    const isOwner =
      property.postedBy.toString() ===
      req.user._id.toString();

    const isAdmin =
      req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized",
      });
    }

    Object.assign(
      property,
      req.body
    );

    await property.save();

    await clearPropertyCache();

    return res.status(200).json({
      success: true,
      message:
        "Property updated successfully",
      data: property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE PROPERTY
// ======================================================
const deleteProperty = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message:
          "Property not found",
      });
    }

    const isOwner =
      property.postedBy.toString() ===
      req.user._id.toString();

    const isAdmin =
      req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized",
      });
    }

    await property.deleteOne();

    await clearPropertyCache();

    return res.status(200).json({
      success: true,
      message:
        "Property deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// FEATURED PROPERTIES
// ======================================================
const getFeaturedProperties =
  async (req, res) => {
    try {
      const result =
        await cacheWrapper({
          key:
            "featured-properties",

          fetchFunction:
            async () => {
              return await Property.find(
                {
                  isFeatured: true,
                }
              )
                .sort({
                  createdAt: -1,
                })
                .limit(10);
            },
        });

      return res.status(200).json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ======================================================
// NEARBY PROPERTIES
// ======================================================
const getNearbyProperties =
  async (req, res) => {
    try {
      const {
        lat,
        lng,
        distance = 5000,
      } = req.query;

      if (!lat || !lng) {
        return res.status(400).json({
          success: false,
          message:
            "Latitude and longitude are required",
        });
      }

      const properties =
        await Property.find({
          "location.coordinates":
            {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [
                    Number(lng),
                    Number(lat),
                  ],
                },
                $maxDistance:
                  Number(distance),
              },
            },
        }).limit(20);

      return res.status(200).json({
        success: true,
        data: properties,
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
  createProperty,
  getProperties,
  getPropertyBySlug,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getNearbyProperties,
  getFeaturedProperties,
};