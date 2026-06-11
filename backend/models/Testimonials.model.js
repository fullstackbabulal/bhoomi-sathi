// ======================================================
// File: backend/models/Testimonials.model.js
// Description: Testimonial Schema
// ======================================================

const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      maxlength: 100,
    },

    designation: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    review: {
      type: String,
      required: [true, "Review is required"],
      trim: true,
      maxlength: 2000,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ======================================================
// Indexes
// ======================================================

testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ isFeatured: 1 });
testimonialSchema.index({ displayOrder: 1 });

// ======================================================
// Export Model
// ======================================================

module.exports = mongoose.model("Testimonial", testimonialSchema);
