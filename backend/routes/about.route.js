// ======================================================
// File: backend/routes/about.route.js
// Description: About Page Routes
// ======================================================

const express = require("express");

const router = express.Router();

// ======================================================
// CONTROLLERS
// ======================================================
const { getAboutPage } = require("../controllers/about.controller");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get About Page Data
// GET /api/about
router.get("/", getAboutPage);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
