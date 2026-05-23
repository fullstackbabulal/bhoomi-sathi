// ======================================================
// File: backend/controllers/auth.controller.js
// Description: Authentication Controller
// ======================================================

const User = require("../models/User.model");

const { sendTokenResponse, clearTokenCookie } = require("../utils/jwt.util");

// ======================================================
// REGISTER USER
// Public Registration
// Default role = user
// ======================================================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // ==================================================
    // CHECK EXISTING USER
    // ==================================================
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // ==================================================
    // CREATE USER
    // ==================================================
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "user",
    });

    // ==================================================
    // LOGIN AFTER REGISTER
    // ==================================================
    return sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ======================================================
// LOGIN USER
// Single Login
// admin / agent / user
// ======================================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // ==================================================
    // FIND USER
    // ==================================================
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ==================================================
    // ACCOUNT DISABLED
    // ==================================================
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been disabled.",
      });
    }

    // ==================================================
    // PASSWORD CHECK
    // ==================================================
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ==================================================
    // UPDATE LAST LOGIN
    // ==================================================
    user.lastLogin = new Date();

    await user.save();

    // ==================================================
    // LOGIN SUCCESS
    // ==================================================
    return sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ======================================================
// LOGOUT USER
// ======================================================
const logoutUser = async (req, res) => {
  try {
    clearTokenCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed.",
    });
  }
};

// ======================================================
// GET CURRENT USER
// Protected Route
// ======================================================
const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Get Current User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user.",
    });
  }
};

// ======================================================
// CREATE AGENT
// Admin Only
// ======================================================
const createAgent = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // ==================================================
    // CHECK EXISTING AGENT
    // ==================================================
    const existingAgent = await User.findOne({
      email,
    });

    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // ==================================================
    // CREATE AGENT
    // ==================================================
    const agent = await User.create({
      name,
      email,
      password,
      phone,
      role: "agent",
    });

    return res.status(201).json({
      success: true,
      message: "Agent created successfully.",
      agent,
    });
  } catch (error) {
    console.error("Create Agent Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create agent.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  createAgent,
};
