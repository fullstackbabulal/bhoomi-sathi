import Property from "../models/Property.js";
import mongoose from "mongoose";

// OPTIONAL: Redis (plug when ready)
// import redisClient from "../config/redis.js";

// ==========================================
// CREATE PROPERTY (ADMIN / AGENT)
// ==========================================
export const createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      postedBy: req.user._id,
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL PROPERTIES (ADVANCED SEARCH)
// ==========================================
export const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      type,
      city,
      keyword,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    // ===============================
    // FILTERS
    // ===============================
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (type) query.type = type;
    if (city) query["location.city"] = city;

    // TEXT SEARCH
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // ===============================
    // CACHE KEY (REDIS READY)
    // ===============================
    const cacheKey = `properties:${JSON.stringify(req.query)}`;

    // if (redisClient) {
    //   const cached = await redisClient.get(cacheKey);
    //   if (cached) {
    //     return res.json(JSON.parse(cached));
    //   }
    // }

    const properties = await Property.find(query)
      .populate("postedBy", "name email")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Property.countDocuments(query);

    const response = {
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: properties,
    };

    // if (redisClient) {
    //   await redisClient.set(cacheKey, JSON.stringify(response), "EX", 60);
    // }

    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET SINGLE PROPERTY (BY SLUG - SEO)
// ==========================================
export const getPropertyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const property = await Property.findOne({ slug }).populate(
      "postedBy",
      "name phone",
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Increment views (async, non-blocking)
    Property.updateOne({ _id: property._id }, { $inc: { views: 1 } }).exec();

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET PROPERTY BY ID
// ==========================================
export const getPropertyById = async (req, res) => {
  try {
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
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Authorization check (basic)
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
export const deleteProperty = async (req, res) => {
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

    res.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// NEARBY PROPERTIES (MAP FEATURE)
// ==========================================
export const getNearbyProperties = async (req, res) => {
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
          $maxDistance: Number(distance), // meters
        },
      },
    }).limit(20);

    res.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// FEATURED PROPERTIES
// ==========================================
export const getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isFeatured: true })
      .sort("-createdAt")
      .limit(10);

    res.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
