// ======================================================
// File: backend/middleware/auth.middleware.js
// Description: Authentication Middleware
// JWT + HttpOnly Cookie Authentication
// ======================================================

const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// ======================================================
// AUTH MIDDLEWARE
// ======================================================
const authMiddleware = async (req, res, next) => {
  try {
    // ==================================================
    // GET TOKEN FROM HTTPONLY COOKIE
    // ==================================================
    const token = req.cookies?.token;

    // ==================================================
    // TOKEN NOT FOUND
    // ==================================================
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // ==================================================
    // VERIFY JWT TOKEN
    // ==================================================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ==================================================
    // FIND USER
    // ==================================================
    const user = await User.findById(decoded.id).select("-password");

    // ==================================================
    // USER NOT FOUND
    // ==================================================
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
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
    // ATTACH USER TO REQUEST
    // ==================================================
    req.user = user;

    next();
  } catch (error) {
    // ==================================================
    // INVALID / EXPIRED TOKEN
    // ==================================================
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // ==================================================
    // SERVER ERROR
    // ==================================================
    console.error("Auth Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================
module.exports = authMiddleware;
