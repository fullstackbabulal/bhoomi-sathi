const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { getRateLimitClient } = require("../config/redisRateLimit");

// ==========================================
// CONFIG
// ==========================================
const DEBUG = process.env.NODE_ENV === "development";

let redisWarningShown = false;

// ==========================================
// CREATE RATE LIMITER (SAFE + CLEAN)
// ==========================================
const createRateLimiter = ({ windowMs, max, prefix, message }) => {
  const redisClient = getRateLimitClient();

  // ==========================================
  // REDIS MODE (DISTRIBUTED RATE LIMIT)
  // ==========================================
  if (redisClient) {
    if (DEBUG) console.log("✅ RateLimit using Redis");

    return rateLimit({
      windowMs,
      max,
      standardHeaders: true,
      legacyHeaders: false,

      store: new RedisStore({
        // ✅ Correct command format for redis v4
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix,
      }),

      handler: (req, res) => {
        res.status(429).json({
          success: false,
          message,
        });
      },
    });
  }

  // ==========================================
  // MEMORY FALLBACK (NO REDIS)
  // ==========================================
  if (!redisWarningShown) {
    console.warn("⚠️ RateLimit using Memory (Redis not connected)");
    redisWarningShown = true;
  }

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message,
      });
    },
  });
};

// ==========================================
// GLOBAL LIMITER
// ==========================================
const globalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  prefix: "rl:global:",
  message: "Too many requests, please try again later",
});

module.exports = { globalLimiter };
