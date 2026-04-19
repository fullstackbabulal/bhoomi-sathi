import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redis.js";

// ==========================================
// GENERIC RATE LIMITER FACTORY
// ==========================================
const createRateLimiter = ({ windowMs, max, prefix, message }) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,

    // ===============================
    // REDIS STORE (SCALABLE)
    // ===============================
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
      prefix,
    }),

    message: {
      success: false,
      message,
    },

    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message,
      });
    },
  });
};

// ==========================================
// GLOBAL LIMITER (BASIC PROTECTION)
// ==========================================
export const globalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300, // 300 requests per IP
  prefix: "rl:global:",
  message: "Too many requests, please try again later",
});

// ==========================================
// AUTH LIMITER (LOGIN / REGISTER)
// ==========================================
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20, // strict
  prefix: "rl:auth:",
  message: "Too many login attempts, please try again later",
});

// ==========================================
// COMMENT LIMITER (ANTI-SPAM)
// ==========================================
export const commentLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10, // 10 comments per 10 min
  prefix: "rl:comment:",
  message: "Too many comments, slow down",
});

// ==========================================
// ENQUIRY LIMITER (LEAD SPAM PROTECTION)
// ==========================================
export const enquiryLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5, // 5 enquiries per 10 min
  prefix: "rl:enquiry:",
  message: "Too many enquiries, please try again later",
});

// ==========================================
// SEARCH LIMITER (OPTIONAL)
// ==========================================
export const searchLimiter = createRateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 60, // prevent abuse
  prefix: "rl:search:",
  message: "Too many search requests",
});
