const { getRedisClient } = require("../config/redis");

// ==========================================
// CONFIG
// ==========================================
const DEFAULT_TTL = 60;
const SCAN_COUNT = 100;
const DEBUG = process.env.NODE_ENV === "development";

// ==========================================
// GENERATE CACHE KEY
// ==========================================
const generateCacheKey = (prefix, params = {}) => {
  return `${prefix}:${JSON.stringify(params)}`;
};

// ==========================================
// SAFE REDIS GETTER
// ==========================================
const getRedis = () => {
  const client = getRedisClient();
  return client || null;
};

// ==========================================
// GET CACHE
// ==========================================
const getCache = async (key) => {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    if (DEBUG) console.error("❌ Cache GET:", err.message);
    return null;
  }
};

// ==========================================
// SET CACHE
// ==========================================
const setCache = async (key, data, ttl = DEFAULT_TTL) => {
  const redis = getRedis();
  if (!redis) return;

  try {
    await redis.set(key, JSON.stringify(data), { EX: ttl });
  } catch (err) {
    if (DEBUG) console.error("❌ Cache SET:", err.message);
  }
};

// ==========================================
// DELETE CACHE KEY
// ==========================================
const deleteCache = async (key) => {
  const redis = getRedis();
  if (!redis) return;

  try {
    await redis.del(key);
  } catch (err) {
    if (DEBUG) console.error("❌ Cache DELETE:", err.message);
  }
};

// ==========================================
// CLEAR CACHE USING SCAN (NON-BLOCKING)
// ==========================================
const clearCacheByPattern = async (pattern) => {
  const redis = getRedis();
  if (!redis) return;

  try {
    let cursor = "0";

    do {
      const { cursor: nextCursor, keys } = await redis.scan(cursor, {
        MATCH: pattern,
        COUNT: SCAN_COUNT,
      });

      cursor = nextCursor;

      if (keys.length) {
        await redis.del(keys);
      }
    } while (cursor !== "0");

    if (DEBUG) console.log(`🧹 Cache cleared: ${pattern}`);
  } catch (err) {
    console.error("❌ Cache CLEAR:", err.message);
  }
};

// ==========================================
// DOMAIN CACHE HELPERS
// ==========================================
const clearPropertyCache = async () => {
  await Promise.all([
    clearCacheByPattern("properties:*"),
    clearCacheByPattern("geo:*"),
    clearCacheByPattern("featured:*"),
  ]);
};

const clearBlogCache = async () => {
  await Promise.all([
    clearCacheByPattern("blogs:*"),
    clearCacheByPattern("blog:*"),
  ]);
};

// ==========================================
// CACHE WRAPPER (CORE LOGIC)
// ==========================================
const cacheWrapper = async ({ key, ttl = DEFAULT_TTL, fetchFunction }) => {
  // 1. Try cache
  const cached = await getCache(key);
  if (cached) {
    return { source: "cache", data: cached };
  }

  try {
    // 2. Fetch fresh data
    const freshData = await fetchFunction();

    // 3. Store in cache (non-blocking mindset)
    setCache(key, freshData, ttl);

    return { source: "database", data: freshData };
  } catch (err) {
    console.error("❌ Cache Wrapper:", err.message);

    // fallback (never break API)
    const fallbackData = await fetchFunction();
    return { source: "database", data: fallbackData };
  }
};

// ==========================================
// EXPORTS
// ==========================================
module.exports = {
  generateCacheKey,
  getCache,
  setCache,
  deleteCache,
  clearCacheByPattern,
  clearPropertyCache,
  clearBlogCache,
  cacheWrapper,
};
