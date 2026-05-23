// ======================================================
// File: models/Enquiry.js
// Description: Enquiry Model
// ======================================================

const mongoose = require("mongoose");

// ======================================================
// ENQUIRY SCHEMA
// ======================================================
const enquirySchema = new mongoose.Schema(
  {
    // ==================================================
    // USER INFO
    // ==================================================
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
      match: [
        /^[0-9]{10}$/,
        "Phone number must be 10 digits",
      ],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email",
      ],
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    // ==================================================
    // PROPERTY RELATION
    // ==================================================
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
      index: true,
    },

    // ==================================================
    // SOURCE
    // ==================================================
    source: {
      type: String,
      enum: [
        "website",
        "facebook",
        "whatsapp",
        "call",
        "other",
      ],
      default: "website",
      index: true,
    },

    campaign: {
      type: String,
      default: "",
    },

    medium: {
      type: String,
      default: "",
    },

    // ==================================================
    // LEAD STATUS
    // ==================================================
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "visited",
        "closed",
        "rejected",
      ],
      default: "new",
      index: true,
    },

    // ==================================================
    // ASSIGNED AGENT
    // ==================================================
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ==================================================
    // NOTES
    // ==================================================
    notes: [
      {
        text: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ==================================================
    // TRACKING
    // ==================================================
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    // ==================================================
    // ANTI-SPAM
    // ==================================================
    isSpam: {
      type: Boolean,
      default: false,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
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
// CLEAN PHONE NUMBER
// Remove non-numeric characters
// ======================================================
enquirySchema.pre("save", function (next) {
  if (this.phone) {
    this.phone = this.phone
      .replace(/\D/g, "")
      .slice(-10);
  }

  next();
});

// ======================================================
// EXPORT MODEL
// ======================================================
module.exports = mongoose.model(
  "Enquiry",
  enquirySchema
);