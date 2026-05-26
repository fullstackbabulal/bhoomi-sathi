// ======================================================
// File: backend/routes/property.route.js
// Description: Property Routes
// ======================================================

const express = require("express");
const uploadMulter = require("../middleware/uploadMulter.js");
const router = express.Router();

// ======================================================
// CONTROLLERS
// ======================================================
const {
  createProperty,
  getProperties,
  getPropertyBySlug,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getNearbyProperties,
  getFeaturedProperties,
} = require("../controllers/property.controller");

// ======================================================
// MIDDLEWARE
// ======================================================
const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get all properties
router.get("/", getProperties);

// Featured properties
router.get("/featured", getFeaturedProperties);

// Nearby properties
router.get("/nearby", getNearbyProperties);

// Property by slug
router.get("/slug/:slug", getPropertyBySlug);

// Property by ID
router.get("/:id", getPropertyById);

// ======================================================
// PROTECTED ROUTES
// Admin + Agent
// ======================================================

// Create property
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "agent"),

  uploadMulter.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 20,
    },
  ]),

  createProperty,
);

// Update property
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  updateProperty,
);

// Delete property
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  deleteProperty,
);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
