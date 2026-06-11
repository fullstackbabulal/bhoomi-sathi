// ======================================================
// File: backend/routes/auth.route.js
// Description: Authentication Routes
// ======================================================

const express = require("express");

const router = express.Router();

// ======================================================
// CONTROLLERS
// ======================================================
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  createAgent,
} = require("../controllers/auth.controller");

// ======================================================
// MIDDLEWARE
// ======================================================
const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Register User
// POST /api/auth/register
router.post("/register", registerUser);

// Login
// POST /api/auth/login
router.post("/login", loginUser);

// ======================================================
// PROTECTED ROUTES
// ======================================================

// Logout
// POST /api/auth/logout
router.post("/logout", authMiddleware, logoutUser);

// Get Current Logged User
// GET /api/auth/me
router.get("/me", authMiddleware, getCurrentUser);

// ======================================================
// ADMIN ONLY ROUTES
// ======================================================

// Create Agent
// POST /api/auth/create-agent
router.post(
  "/create-agent",
  authMiddleware,
  roleMiddleware("admin"),
  createAgent,
);

// ======================================================
// EXPORT
// ======================================================
module.exports = router;
