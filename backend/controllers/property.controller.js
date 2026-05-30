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
// Controller: createProperty
// Description: Create Property
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

    const safeArray = (value) => (Array.isArray(value) ? value : []);

    // ==========================================
    // BASIC DATA
    // ==========================================
    const title = req.body.title?.trim() || "";

    const slug =
      req.body.slug?.trim() ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    // ==========================================
    // PARSE JSON STRINGS
    // (multipart/form-data)
    // ==========================================
    const area = safeJSONParse(req.body.area, {
      value: 0,
      unit: "sqft",
    });

    const location = safeJSONParse(req.body.location, {});

    const amenities = safeJSONParse(req.body.amenities, []);

    const seo = safeJSONParse(req.body.seo, {});

    const faq = safeJSONParse(req.body.faq, []);

    const nearbyPlaces = safeJSONParse(req.body.nearbyPlaces, []);

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
    const thumbnail = req.files?.thumbnail?.[0]
      ? `/uploads/images/property/${slug}/${req.files.thumbnail[0].filename}`
      : "";

    const images =
      req.files?.images?.map((file, index) => ({
        url: `/uploads/images/property/${slug}/${file.filename}`,

        public_id: "",

        alt: `${title} Image ${index + 1}`,
      })) || [];

    const videos =
      req.files?.videos?.map((file) => ({
        url: `/uploads/videos/property/${slug}/${file.filename}`,
      })) || [];

    // ==========================================
    // FAQ NORMALIZATION
    // ==========================================
    const normalizedFaq = safeArray(faq).map((item) => ({
      question: item?.question || "",

      answer: item?.answer || "",
    }));

    // ==========================================
    // NEARBY PLACES NORMALIZATION
    // ==========================================
    const normalizedNearbyPlaces = safeArray(nearbyPlaces).map((item) => ({
      name: item?.name || "",

      type: item?.type || "other",

      distance: toNumber(item?.distance),

      unit: item?.unit || "km",
    }));

    // ==========================================
    // PROPERTY PAYLOAD
    // ==========================================
    const propertyData = {
      // ======================================
      // BASIC INFO
      // ======================================
      title,

      slug,

      overview: req.body.overview || "",

      description: req.body.description || "",

      // ======================================
      // PROPERTY DETAILS
      // ======================================
      listingType: req.body.listingType || "sale",

      type: req.body.type || "apartment",

      status: req.body.status || "available",

      price: toNumber(req.body.price),

      emi: toNumber(req.body.emi),

      area: {
        value: toNumber(area?.value),

        unit: area?.unit || "sqft",
      },

      carpetArea: toNumber(req.body.carpetArea),

      superBuiltUpArea: toNumber(req.body.superBuiltUpArea),

      bedrooms: toNumber(req.body.bedrooms),

      bathrooms: toNumber(req.body.bathrooms),

      parking: toNumber(req.body.parking),

      facing: req.body.facing || "",

      floor: toNumber(req.body.floor),

      totalFloors: toNumber(req.body.totalFloors),

      ownershipType: req.body.ownershipType || "freehold",

      constructionYear: toNumber(req.body.constructionYear, null),

      possession: req.body.possession || "",

      // ======================================
      // LOCATION
      // ======================================
      location: normalizedLocation,

      // ======================================
      // MEDIA
      // ======================================
      thumbnail,

      images,

      videos,

      // ======================================
      // FEATURES
      // ======================================
      amenities: safeArray(amenities),

      faq: normalizedFaq,

      nearbyPlaces: normalizedNearbyPlaces,

      // ======================================
      // SEO
      // ======================================
      seo: {
        metaTitle: seo?.metaTitle || "",

        metaDescription: seo?.metaDescription || "",

        keywords: safeArray(seo?.keywords),

        canonicalUrl: seo?.canonicalUrl || "",

        ogImage: seo?.ogImage || "",
      },

      // ======================================
      // FLAGS
      // ======================================
      isFeatured: toBoolean(req.body.isFeatured),

      isVerified: toBoolean(req.body.isVerified),

      // ======================================
      // USER
      // ======================================
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
// ======================================================
// Controller: getPropertyBySlug
// Description: Get Single Property Details by Slug
// ======================================================

const getPropertyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await cacheWrapper({
      key: `property:${slug}`,

      fetchFunction: async () => {
        const property = await Property.findOne({
          slug,
        }).populate("postedBy", "name email phone avatar rating reviewCount");

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

        const formattedProperty = {
          _id: property._id,

          propertyId:
            property.propertyId || `BS${String(property._id).slice(-6)}`,

          title: property.title,

          slug: property.slug,

          overview: property.overview,

          description: property.description,

          listingType: property.listingType || "sale",

          type: property.type,

          status: property.status,

          isFeatured: property.isFeatured,

          isVerified: property.isVerified,

          price: property.price || 0,

          emi: property.emi || null,

          area: {
            value: property.area?.value || 0,

            unit: property.area?.unit || "sqft",
          },

          bedrooms: property.bedrooms || 0,

          bathrooms: property.bathrooms || 0,

          location: {
            address: property.location?.address || "",

            city: property.location?.city || "",

            state: property.location?.state || "",

            country: property.location?.country || "India",

            pincode: property.location?.pincode || "",

            coordinates: property.location?.coordinates?.coordinates || [],
          },

          images: property.images || [],

          videos: property.videos || [],

          thumbnail: property.thumbnail || "",

          amenities: property.amenities || [],

          postedBy: {
            _id: property.postedBy?._id,

            name: property.postedBy?.name || "",

            email: property.postedBy?.email || "",

            phone: property.postedBy?.phone || "",

            avatar: property.postedBy?.avatar || "",

            rating: property.postedBy?.rating || 0,

            reviewCount: property.postedBy?.reviewCount || 0,
          },

          engagement: {
            views: property.views || 0,

            favoritesCount: property.favoritesCount || 0,
          },

          seo: property.seo || {},

          createdAt: property.createdAt,

          updatedAt: property.updatedAt,
        };

        return formattedProperty;
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
// GET SIMILAR PROPERTIES
// Description:
// Priority Strategy:
// 1. Same City + Same Type
// 2. Same City
// 3. Same Type
// Excludes current property
// ======================================================
const getSimilarProperties = async (req, res) => {
  try {
    const { id } = req.params;

    const limit = Number(req.query.limit) || 6;

    // ==========================================
    // VALIDATE PROPERTY ID
    // ==========================================
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    // ==========================================
    // FIND CURRENT PROPERTY
    // ==========================================
    const currentProperty = await Property.findById(id)
      .select("type location.city status")
      .lean();

    if (!currentProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const city = currentProperty?.location?.city || "";

    const type = currentProperty?.type || "";

    // ==========================================
    // CACHE KEY
    // ==========================================
    const cacheKey = generateCacheKey("similar-properties", {
      id,
      city,
      type,
      limit,
    });

    // ==========================================
    // CACHE WRAPPER
    // ==========================================
    const result = await cacheWrapper({
      key: cacheKey,

      fetchFunction: async () => {
        const baseSelect = `
              _id
              title
              slug
              price
              type
              listingType
              status
              thumbnail
              images
              bedrooms
              bathrooms
              area
              location
              isFeatured
              isVerified
              createdAt
            `;

        let properties = [];

        // ==========================================
        // STRATEGY 1
        // SAME CITY + SAME TYPE
        // ==========================================
        properties = await Property.find({
          _id: {
            $ne: id,
          },

          "location.city": city,

          type,

          status: "available",
        })
          .select(baseSelect)
          .sort({
            createdAt: -1,
          })
          .limit(limit)
          .lean();

        // ==========================================
        // STRATEGY 2
        // SAME CITY
        // ==========================================
        if (!properties.length) {
          properties = await Property.find({
            _id: {
              $ne: id,
            },

            "location.city": city,

            status: "available",
          })
            .select(baseSelect)
            .sort({
              createdAt: -1,
            })
            .limit(limit)
            .lean();
        }

        // ==========================================
        // STRATEGY 3
        // SAME TYPE
        // ==========================================
        if (!properties.length) {
          properties = await Property.find({
            _id: {
              $ne: id,
            },

            type,

            status: "available",
          })
            .select(baseSelect)
            .sort({
              createdAt: -1,
            })
            .limit(limit)
            .lean();
        }

        return properties;
      },
    });

    // ==========================================
    // RESPONSE
    // ==========================================
    return res.status(200).json({
      success: true,

      total: result.data.length,

      source: result.source,

      filters: {
        city,
        type,
      },

      data: result.data,
    });
  } catch (error) {
    console.error("GET SIMILAR PROPERTIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch similar properties",
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
  getSimilarProperties,
};
