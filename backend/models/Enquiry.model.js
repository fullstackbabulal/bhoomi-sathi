// ======================================================
// File: models/Enquiry.model.js
// Description: Enquiry Model
// ======================================================

const mongoose = require("mongoose");

// ======================================================
// HELPERS
// ======================================================
const normalizePhone = (phone = "") => {
  return String(phone).replace(/\D/g, "").slice(-10);
};

// ======================================================
// ENQUIRY SCHEMA
// ======================================================
const enquirySchema = new mongoose.Schema(
  {
    // ==========================================
    // USER INFO
    // ==========================================
    name: {
      type: String,

      required: [true, "Name is required"],

      trim: true,
    },

    phone: {
      type: String,

      required: [true, "Phone number is required"],

      trim: true,

      index: true,

      // ==============================
      // AUTO NORMALIZE PHONE
      // ==============================
      set: (value) => normalizePhone(value),

      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    email: {
      type: String,

      trim: true,

      lowercase: true,

      default: "",

      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    message: {
      type: String,

      trim: true,

      default: "",
    },

    // ==========================================
    // PROPERTY RELATION
    // ==========================================
    property: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Property",

      default: null,

      index: true,
    },

    // ==========================================
    // SOURCE
    // ==========================================
    source: {
      type: String,

      enum: ["website", "facebook", "whatsapp", "call", "other"],

      default: "website",

      index: true,
    },

    campaign: {
      type: String,

      trim: true,

      default: "",
    },

    medium: {
      type: String,

      trim: true,

      default: "",
    },

    // ==========================================
    // LEAD STATUS
    // ==========================================
    status: {
      type: String,

      enum: ["new", "contacted", "visited", "closed", "rejected"],

      default: "new",

      index: true,
    },

    // ==========================================
    // ASSIGNED AGENT
    // ==========================================
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      default: null,
    },

    // ==========================================
    // NOTES
    // ==========================================
    notes: [
      {
        text: {
          type: String,

          trim: true,

          default: "",
        },

        createdAt: {
          type: Date,

          default: Date.now,
        },
      },
    ],

    // ==========================================
    // TRACKING
    // ==========================================
    isRead: {
      type: Boolean,

      default: false,

      index: true,
    },

    followUpDate: {
      type: Date,

      default: null,
    },

    // ==========================================
    // ANTI-SPAM
    // ==========================================
    isSpam: {
      type: Boolean,

      default: false,
    },

    ipAddress: {
      type: String,

      trim: true,

      default: "",
    },

    userAgent: {
      type: String,

      trim: true,

      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// ======================================================
// INDEXES
// ======================================================
enquirySchema.index({
  createdAt: -1,
});

enquirySchema.index({
  phone: 1,
  createdAt: -1,
});

enquirySchema.index({
  phone: 1,
  property: 1,
  createdAt: -1,
});

// ======================================================
// EXPORT MODEL
// ======================================================
module.exports = mongoose.model("Enquiry", enquirySchema);
