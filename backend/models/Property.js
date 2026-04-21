const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // ===============================
    // BASIC INFO
    // ===============================
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },

    // ===============================
    // PROPERTY DETAILS
    // ===============================
    type: {
      type: String,
      enum: ["plot", "apartment", "house", "commercial", "villa"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available",
      index: true,
    },

    price: {
      type: Number,
      required: true,
      index: true,
    },

    area: {
      value: Number,
      unit: {
        type: String,
        enum: ["sqft", "sqm", "bigha", "acre"],
        default: "sqft",
      },
    },

    bedrooms: Number,
    bathrooms: Number,

    // ===============================
    // LOCATION (GEO + SEO)
    // ===============================
    location: {
      address: String,
      city: {
        type: String,
        index: true,
      },
      state: String,
      country: {
        type: String,
        default: "India",
      },
      pincode: String,

      // GEO LOCATION (for maps & search)
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [lng, lat]
          index: "2dsphere",
        },
      },
    },

    // ===============================
    // MEDIA
    // ===============================
    images: [
      {
        url: String,
        public_id: String, // Cloudinary / S3 reference
      },
    ],
    videos: [
      {
        url: String,
      },
    ],

    thumbnail: {
      type: String,
    },

    // ===============================
    // FEATURES / AMENITIES
    // ===============================
    amenities: [String], // ["Road", "Electricity", "Water", etc.]

    // ===============================
    // RELATIONS
    // ===============================
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ===============================
    // ENGAGEMENT
    // ===============================
    views: {
      type: Number,
      default: 0,
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },

    // ===============================
    // SEO META
    // ===============================
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: String,
      ogImage: String,
    },

    // ===============================
    // FLAGS
    // ===============================
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
  },
);

// ===============================
// INDEXES (CRITICAL FOR PERFORMANCE)
// ===============================

// Text search (title + description)
propertySchema.index({
  title: "text",
  description: "text",
});

// Compound filter index (for fast search queries)
propertySchema.index({
  price: 1,
  type: 1,
  "location.city": 1,
  createdAt: -1,
});

// ===============================
// PRE-SAVE HOOK (AUTO SLUG)
// ===============================
propertySchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

module.exports = mongoose.model("Property", propertySchema);
