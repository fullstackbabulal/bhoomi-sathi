// ======================================================
// File: middleware/rateLimiter.js
// Description: Rate Limiter Middleware
// ======================================================

const rateLimit = require("express-rate-limit");

// ======================================================
// GLOBAL API LIMITER
// Protects all API routes
// ======================================================
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests per IP
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

// ======================================================
// AUTH LIMITER
// Protect login/register endpoints
// ======================================================
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login/register attempts

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },
});

// ======================================================
// COMMENT LIMITER
// Prevent spam comments
// ======================================================
const commentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,

  message: {
    success: false,
    message:
      "Too many comments. Please wait a moment.",
  },
});

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  globalLimiter,
  authLimiter,
  commentLimiter,
};