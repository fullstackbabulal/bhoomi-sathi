const Property = require("../models/Property");
const mongoose = require("mongoose");

const {
  buildPropertyQuery,
  executePropertySearch,
} = require("../utils/propertyQuery");

const {
  cacheWrapper,
  generateCacheKey,
  clearPropertyCache,
} = require("../utils/cache");

// ==========================================
// CREATE PROPERTY
// ==========================================
const createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      postedBy: req.user._id,
    });

    await property.save();

    // 🔥 Clear cache after mutation
    await clearPropertyCache();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET PROPERTIES (SEARCH + CACHE)
// ==========================================
const getProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort } = req.query;

    const query = buildPropertyQuery(req.query);

    const sortOption =
      sort === "low"
        ? { price: 1 }
        : sort === "high"
          ? { price: -1 }
          : { createdAt: -1 };

    const cacheKey = generateCacheKey("properties", req.query);

    const result = await cacheWrapper({
      key: cacheKey,
      ttl: 120,
      fetchFunction: async () => {
        return await executePropertySearch({
          query,
          page: Number(page),
          limit: Number(limit),
          sort: sortOption,
        });
      },
    });

    res.json({
      success: true,
      source: result.source, // 🔥 debug (cache/db)
      ...result.data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET PROPERTY BY SLUG (SEO)
// ==========================================
const getPropertyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const cacheKey = `property:${slug}`;

    const result = await cacheWrapper({
      key: cacheKey,
      ttl: 300,
      fetchFunction: async () => {
        const property = await Property.findOne({ slug }).populate(
          "postedBy",
          "name phone",
        );

        if (!property) {
          throw new Error("Property not found");
        }

        // Increment views async
        Property.updateOne(
          { _id: property._id },
          { $inc: { views: 1 } },
        ).exec();

        return property;
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
// GET PROPERTY BY ID
// ==========================================
const getPropertyById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(req.params.id).populate(
      "postedBy",
      "name email",
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// UPDATE PROPERTY
// ==========================================
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (
      property.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    Object.assign(property, req.body);
    await property.save();

    await clearPropertyCache();

    res.json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// DELETE PROPERTY
// ==========================================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (
      property.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await property.deleteOne();

    await clearPropertyCache();

    res.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// NEARBY PROPERTIES (GEO SEARCH)
// ==========================================
const getNearbyProperties = async (req, res) => {
  try {
    const { lat, lng, distance = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude required",
      });
    }

    const properties = await Property.find({
      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: Number(distance),
        },
      },
    }).limit(20);

    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// FEATURED PROPERTIES
// ==========================================
const getFeaturedProperties = async (req, res) => {
  try {
    const cacheKey = "featured:properties";

    const result = await cacheWrapper({
      key: cacheKey,
      ttl: 300,
      fetchFunction: async () => {
        return await Property.find({ isFeatured: true })
          .sort("-createdAt")
          .limit(10);
      },
    });

    res.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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
