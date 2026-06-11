// ======================================================
// File: routes/Testimonials.route.js
// Description: Testimonial Routes
// ======================================================

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const uploadMulter = require("../middleware/uploadMulter");

const {
  createTestimonial,
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
} = require("../controllers/Testimonials.controller");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get all active testimonials
router.get("/", getTestimonials);

// Get featured testimonials
router.get("/featured", getFeaturedTestimonials);

// Get single testimonial
router.get("/:id", getTestimonialById);

// ======================================================
// ADMIN ROUTES
// Authentication + Authorization Required
// ======================================================

// Create testimonial
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  uploadMulter.single("image"),
  createTestimonial,
);

// Update testimonial
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  uploadMulter.single("image"),
  updateTestimonial,
);

// Toggle active status
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  toggleTestimonialStatus,
);

// Delete testimonial
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteTestimonial,
);

// ======================================================
// EXPORT
// ======================================================

module.exports = router;
