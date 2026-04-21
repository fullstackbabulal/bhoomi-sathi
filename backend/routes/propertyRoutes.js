const express = require("express");

const {
  createProperty,
  getProperties,
  getPropertyBySlug,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getNearbyProperties,
  getFeaturedProperties,
} = require("../controllers/propertyController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Advanced search + filters
router.get("/", getProperties);

// Featured properties
router.get("/featured", getFeaturedProperties);

// Nearby (Geo search)
router.get("/nearby", getNearbyProperties);

// SEO-friendly route (IMPORTANT)
router.get("/slug/:slug", getPropertyBySlug);

// Get by ID
router.get("/:id", getPropertyById);

// ==========================================
// PROTECTED ROUTES (ADMIN / AGENT)
// ==========================================

// Create property
router.post("/", protect, authorize("admin", "agent"), createProperty);

// Update property
router.put("/:id", protect, authorize("admin", "agent"), updateProperty);

// Delete property
router.delete("/:id", protect, authorize("admin", "agent"), deleteProperty);

module.exports = router;
