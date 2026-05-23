// ======================================================
// File: models/Property.js
// Description: Property Model
// ======================================================

const mongoose = require("mongoose");

// ======================================================
// PROPERTY SCHEMA
// ======================================================
const propertySchema = new mongoose.Schema(
  {
    // ==================================================
    // BASIC INFO
    // ==================================================
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    // ==================================================
    // PROPERTY DETAILS
    // ==================================================
    type: {
      type: String,
      enum: [
        "plot",
        "apartment",
        "house",
        "commercial",
        "villa",
      ],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "available",
        "sold",
        "pending",
      ],
      default: "available",
      index: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
      index: true,
    },

    area: {
      value: {
        type: Number,
        default: 0,
      },

      unit: {
        type: String,
        enum: [
          "sqft",
          "sqm",
          "bigha",
          "acre",
        ],
        default: "sqft",
      },
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    // ==================================================
    // LOCATION
    // ==================================================
    location: {
      address: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
        trim: true,
        index: true,
      },

      state: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "India",
      },

      pincode: {
        type: String,
        default: "",
      },

      // GEO LOCATION
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },

        coordinates: {
          type: [Number], // [lng, lat]
          default: [0, 0],
        },
      },
    },

    // ==================================================
    // MEDIA
    // ==================================================
    images: [
      {
        url: {
          type: String,
          default: "",
        },

        public_id: {
          type: String,
          default: "",
        },
      },
    ],

    videos: [
      {
        url: {
          type: String,
          default: "",
        },
      },
    ],

    thumbnail: {
      type: String,
      default: "",
    },

    // ==================================================
    // FEATURES
    // ==================================================
    amenities: {
      type: [String],
      default: [],
    },

    // ==================================================
    // USER RELATION
    // ==================================================
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ==================================================
    // ENGAGEMENT
    // ==================================================
    views: {
      type: Number,
      default: 0,
    },

    favoritesCount: {
      type: Number,
      default: 0,
    },

    // ==================================================
    // SEO
    // ==================================================
    seo: {
      metaTitle: {
        type: String,
        default: "",
      },

      metaDescription: {
        type: String,
        default: "",
      },

      keywords: {
        type: [String],
        default: [],
      },

      canonicalUrl: {
        type: String,
        default: "",
      },

      ogImage: {
        type: String,
        default: "",
      },
    },

    // ==================================================
    // FLAGS
    // ==================================================
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// INDEXES
// ======================================================

// Text Search
propertySchema.index({
  title: "text",
  description: "text",
});

// Fast filtering
propertySchema.index({
  price: 1,
  type: 1,
  "location.city": 1,
  createdAt: -1,
});

// Geo Search
propertySchema.index({
  "location.coordinates": "2dsphere",
});

// ======================================================
// AUTO GENERATE SLUG
// ======================================================
propertySchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  next();
});

// ======================================================
// EXPORT MODEL
// ======================================================
module.exports = mongoose.model(
  "Property",
  propertySchema
);