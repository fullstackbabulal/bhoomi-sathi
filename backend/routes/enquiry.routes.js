// ======================================================
// File: routes/enquiry/enquiry.routes.js
// Description: Enquiry Routes
// ======================================================

const express = require("express");

const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiry.controller");

const router = express.Router();

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Create enquiry
// POST /api/enquiries
router.post("/", createEnquiry);

// ======================================================
// ADMIN ROUTES
// ======================================================

// Get all enquiries
// GET /api/enquiries
router.get("/", getEnquiries);

// Get single enquiry
// GET /api/enquiries/:id
router.get("/:id", getEnquiryById);

// Update enquiry
// PUT /api/enquiries/:id
router.put("/:id", updateEnquiry);

// Delete enquiry
// DELETE /api/enquiries/:id
router.delete("/:id", deleteEnquiry);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
