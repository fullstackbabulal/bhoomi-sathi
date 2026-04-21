const { createClient } = require("redis");

let redisClient = null;

const connectRedis = async () => {
  try {
    const isSecure = process.env.REDIS_URL.startsWith("rediss://");

    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: isSecure
        ? {
            tls: true,
            rejectUnauthorized: false,
          }
        : undefined,
    });

    redisClient.on("error", (err) => {
      console.error("❌ Redis Error:", err.message);
    });

    redisClient.on("connect", () => {
      console.log("🔌 Redis connecting...");
    });

    redisClient.on("ready", () => {
      console.log("✅ Redis ready");
    });

    redisClient.on("end", () => {
      console.warn("⚠️ Redis connection closed");
    });

    // ✅ NO timeout race (THIS WAS BREAKING IT)
    await redisClient.connect();

    // ✅ Test connection (important)
    await redisClient.set("health", "ok");
    const val = await redisClient.get("health");

    console.log("🧪 Redis test:", val);
  } catch (error) {
    console.warn("⚠️ Redis not connected:", error.message);
    redisClient = null;
  }
};

// ✅ ALWAYS return client if exists
const getRedisClient = () => {
  return redisClient;
};

module.exports = {
  connectRedis,
  getRedisClient,
};
