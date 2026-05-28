// ======================================================
// File: controllers/property.controller.js
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
    // ==========================================
    // HELPERS
    // ==========================================
    const safeJSONParse = (value, fallback) => {
      try {
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    };

    const toBoolean = (value) => value === "true" || value === true;

    const toNumber = (value, fallback = 0) => {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? fallback : parsed;
    };

    // ==========================================
    // BASIC DATA
    // ==========================================
    const title = req.body.title?.trim() || "";

    const slug =
      req.body.slug?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    // ==========================================
    // PARSE JSON STRINGS (multipart/form-data)
    // ==========================================
    const area = safeJSONParse(req.body.area, {
      value: "",
      unit: "sqft",
    });

    const location = safeJSONParse(req.body.location, {});

    const amenities = safeJSONParse(req.body.amenities, []);

    const seo = safeJSONParse(req.body.seo, {});

    // ==========================================
    // LOCATION NORMALIZATION
    // ==========================================
    const latitude = toNumber(location?.coordinates?.coordinates?.[1], 0);

    const longitude = toNumber(location?.coordinates?.coordinates?.[0], 0);

    const normalizedLocation = {
      address: location?.address || "",
      city: location?.city || "",
      state: location?.state || "",
      country: location?.country || "India",
      pincode: location?.pincode || "",

      coordinates: {
        type: "Point",
        coordinates: [longitude, latitude], // [lng, lat]
      },
    };

    // ==========================================
    // FILES
    // ==========================================
    const thumbnail = req.files?.thumbnail?.[0]
      ? `/uploads/images/property/${slug}/${req.files.thumbnail[0].filename}`
      : "";

    const images =
      req.files?.images?.map((file, index) => ({
        url: `/uploads/images/property/${slug}/${file.filename}`,
        alt: `${title} Image ${index + 1}`,
        public_id: "",
      })) || [];

    // ==========================================
    // PROPERTY PAYLOAD
    // ==========================================
    const propertyData = {
      title,

      slug,

      overview: req.body.overview || "",

      description: req.body.description || "",

      type: req.body.type || "apartment",

      status: req.body.status || "available",

      price: toNumber(req.body.price),

      bedrooms: toNumber(req.body.bedrooms),

      bathrooms: toNumber(req.body.bathrooms),

      area: {
        value: toNumber(area?.value),
        unit: area?.unit || "sqft",
      },

      location: normalizedLocation,

      amenities: Array.isArray(amenities) ? amenities : [],

      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords: Array.isArray(seo?.keywords) ? seo.keywords : [],
        canonicalUrl: seo?.canonicalUrl || "",
        ogImage: seo?.ogImage || "",
      },

      thumbnail,

      images,

      videos: [],

      isFeatured: toBoolean(req.body.isFeatured),

      isVerified: toBoolean(req.body.isVerified),

      postedBy: req.user._id,
    };

    // ==========================================
    // CREATE PROPERTY
    // ==========================================
    const property = await Property.create(propertyData);

    // ==========================================
    // CLEAR CACHE
    // ==========================================
    await clearPropertyCache();

    // ==========================================
    // RESPONSE
    // ==========================================
    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("CREATE PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create property",
    });
  }
};

// ======================================================
// GET ALL PROPERTIES
// ======================================================
const getProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort } = req.query;

    const query = buildPropertyQuery(req.query);

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "low") {
      sortOption = {
        price: 1,
      };
    }

    if (sort === "high") {
      sortOption = {
        price: -1,
      };
    }

    const cacheKey = generateCacheKey("properties", req.query);

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
    console.error("GET PROPERTIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET PROPERTY BY SLUG
// ======================================================
const getPropertyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await cacheWrapper({
      key: `property:${slug}`,

      fetchFunction: async () => {
        const property = await Property.findOne({
          slug,
        }).populate("postedBy", "name email phone");

        if (!property) {
          throw new Error("Property not found");
        }

        Property.updateOne(
          {
            _id: property._id,
          },
          {
            $inc: {
              views: 1,
            },
          },
        ).exec();

        return property;
      },
    });

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("GET PROPERTY BY SLUG ERROR:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET PROPERTY BY ID
// ======================================================
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(id).populate(
      "postedBy",
      "name email phone",
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("GET PROPERTY BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE PROPERTY
// ======================================================
const updateProperty = async (req, res) => {
  try {
    // ==========================================
    // HELPERS
    // ==========================================
    const safeJSONParse = (value, fallback) => {
      try {
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    };

    const toBoolean = (value) => value === "true" || value === true;

    const toNumber = (value, fallback = 0) => {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? fallback : parsed;
    };

    // ==========================================
    // FIND PROPERTY
    // ==========================================
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // ==========================================
    // AUTHORIZATION
    // ==========================================
    const isOwner = property.postedBy.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // ==========================================
    // BASIC DATA
    // ==========================================
    const title = req.body.title?.trim() || property.title;

    const slug =
      req.body.slug?.trim() ||
      property.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    // ==========================================
    // PARSE JSON STRINGS
    // ==========================================
    const area = safeJSONParse(
      req.body.area,
      property.area || {
        value: "",
        unit: "sqft",
      },
    );

    const location = safeJSONParse(req.body.location, property.location || {});

    const amenities = safeJSONParse(
      req.body.amenities,
      property.amenities || [],
    );

    const seo = safeJSONParse(req.body.seo, property.seo || {});

    // ==========================================
    // LOCATION NORMALIZATION
    // ==========================================
    const latitude = toNumber(location?.coordinates?.coordinates?.[1], 0);

    const longitude = toNumber(location?.coordinates?.coordinates?.[0], 0);

    const normalizedLocation = {
      address: location?.address || "",
      city: location?.city || "",
      state: location?.state || "",
      country: location?.country || "India",
      pincode: location?.pincode || "",

      coordinates: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };

    // ==========================================
    // FILES
    // ==========================================
    let thumbnail = property.thumbnail;

    if (req.files?.thumbnail?.[0]) {
      thumbnail = `/uploads/images/property/${slug}/${req.files.thumbnail[0].filename}`;
    }

    let images = property.images || [];

    if (req.files?.images?.length) {
      images = req.files.images.map((file, index) => ({
        url: `/uploads/images/property/${slug}/${file.filename}`,
        alt: `${title} Image ${index + 1}`,
        public_id: "",
      }));
    }

    // ==========================================
    // UPDATE PAYLOAD
    // ==========================================
    const updateData = {
      title,

      slug,

      overview: req.body.overview ?? property.overview,

      description: req.body.description ?? property.description,

      type: req.body.type || property.type,

      status: req.body.status || property.status,

      price:
        req.body.price !== undefined
          ? toNumber(req.body.price)
          : property.price,

      bedrooms:
        req.body.bedrooms !== undefined
          ? toNumber(req.body.bedrooms)
          : property.bedrooms,

      bathrooms:
        req.body.bathrooms !== undefined
          ? toNumber(req.body.bathrooms)
          : property.bathrooms,

      area: {
        value: toNumber(area?.value),
        unit: area?.unit || "sqft",
      },

      location: normalizedLocation,

      amenities: Array.isArray(amenities) ? amenities : [],

      seo: {
        metaTitle: seo?.metaTitle || "",

        metaDescription: seo?.metaDescription || "",

        keywords: Array.isArray(seo?.keywords) ? seo.keywords : [],

        canonicalUrl: seo?.canonicalUrl || "",

        ogImage: seo?.ogImage || "",
      },

      thumbnail,

      images,

      isFeatured:
        req.body.isFeatured !== undefined
          ? toBoolean(req.body.isFeatured)
          : property.isFeatured,

      isVerified:
        req.body.isVerified !== undefined
          ? toBoolean(req.body.isVerified)
          : property.isVerified,
    };

    // ==========================================
    // UPDATE PROPERTY
    // ==========================================
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    // ==========================================
    // CLEAR CACHE
    // ==========================================
    await clearPropertyCache();

    // ==========================================
    // RESPONSE
    // ==========================================
    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("UPDATE PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update property",
    });
  }
};

// ======================================================
// DELETE PROPERTY
// ======================================================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const isOwner = property.postedBy.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await property.deleteOne();

    await clearPropertyCache();

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET FEATURED PROPERTIES
// ======================================================
const getFeaturedProperties = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const properties = await Property.find({
      isFeatured: true,
      status: "available",
    })
      .populate("postedBy", "name email phone")
      .sort({
        createdAt: -1,
      })
      .limit(limit);

    return res.status(200).json({
      success: true,
      total: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("GET FEATURED PROPERTIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET NEARBY PROPERTIES
// ======================================================
const getNearbyProperties = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const radiusInMeters = Number(radius) * 1000;

    const properties = await Property.find({
      status: "available",

      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",

            coordinates: [Number(lng), Number(lat)],
          },

          $maxDistance: radiusInMeters,
        },
      },
    })
      .populate("postedBy", "name email phone")
      .limit(20);

    return res.status(200).json({
      success: true,
      total: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("GET NEARBY PROPERTIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadPropertyMedia = async (req, res) => {
  try {
    const { slug } = req.body;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });
    }

    const images =
      req.files?.images?.map((file) => ({
        url: `/uploads/images/property/${slug}/${file.filename}`,
        public_id: "",
      })) || [];

    const thumbnail = req.files?.thumbnail?.[0]
      ? `/uploads/images/property/${slug}/${req.files.thumbnail[0].filename}`
      : "";

    return res.status(200).json({
      success: true,
      message: "Media uploaded successfully",
      data: {
        images,
        thumbnail,
      },
    });
  } catch (error) {
    console.error("uploadPropertyMedia error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload media",
    });
  }
};

// ======================================================
module.exports = {
  uploadPropertyMedia,
  createProperty,
  getProperties,
  getPropertyBySlug,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getNearbyProperties,
};
