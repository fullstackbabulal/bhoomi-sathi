const { getRedisClient } = require("./redis");

// This will reuse SAME Redis connection
let redisRateClient = null;

const getRateLimitClient = () => {
  const client = getRedisClient();

  if (!client) {
    console.warn("⚠️ Redis not available for RateLimit (fallback mode)");
    return null;
  }

  return client;
};

module.exports = {
  getRateLimitClient,
};
