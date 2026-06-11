// ======================================================
// File: backend/controllers/Testimonials.controller.js
// Description: Testimonial Controller
// ======================================================

const mongoose = require("mongoose");
const Testimonial = require("../models/Testimonials.model");

// ======================================================
// Create Testimonial
// POST /api/testimonials
// ======================================================

const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      designation,
      company,
      image,
      rating,
      review,
      location,
      isFeatured,
      displayOrder,
    } = req.body;

    if (!name || !review) {
      return res.status(400).json({
        success: false,
        message: "Name and review are required",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      designation,
      company,
      image,
      rating,
      review,
      location,
      isFeatured,
      displayOrder,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Create Testimonial Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// Get All Testimonials
// GET /api/testimonials
// ======================================================

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      isActive: true,
    }).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("Get Testimonials Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

// ======================================================
// Get Featured Testimonials
// GET /api/testimonials/featured
// ======================================================

const getFeaturedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      isActive: true,
      isFeatured: true,
    }).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("Get Featured Testimonials Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch featured testimonials",
      error: error.message,
    });
  }
};

// ======================================================
// Get Single Testimonial
// GET /api/testimonials/:id
// ======================================================

const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error("Get Testimonial Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// Update Testimonial
// PUT /api/testimonials/:id
// ======================================================

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Update Testimonial Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// Toggle Active Status
// PATCH /api/testimonials/:id/status
// ======================================================

const toggleTestimonialStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.isActive = !testimonial.isActive;

    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: `Testimonial ${
        testimonial.isActive ? "activated" : "deactivated"
      } successfully`,
      data: testimonial,
    });
  } catch (error) {
    console.error("Toggle Testimonial Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update testimonial status",
      error: error.message,
    });
  }
};

// ======================================================
// Delete Testimonial
// DELETE /api/testimonials/:id
// ======================================================

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete Testimonial Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// Exports
// ======================================================

module.exports = {
  createTestimonial,
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
};
