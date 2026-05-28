// ======================================================
// File: backend/routes/property.route.js
// Description: Property Routes
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// MIDDLEWARE
// ======================================================
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const uploadMulter = require("../middleware/uploadMulter.js");

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
  uploadPropertyMedia,
} = require("../controllers/property.controller");

// ======================================================
// SHARED MULTER CONFIG
// ======================================================
const propertyUploadFields = uploadMulter.fields([
  {
    name: "thumbnail",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 20,
  },
]);

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
  propertyUploadFields,
  createProperty,
);

// Upload media manually
router.post(
  "/upload-media",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  propertyUploadFields,
  uploadPropertyMedia,
);

// Update property
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "agent"),
  propertyUploadFields,
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
