import redisClient from "../config/redis.js";

// ==========================================
// GENERATE CACHE KEY (CONSISTENT)
// ==========================================
export const generateCacheKey = (prefix, params = {}) => {
  return `${prefix}:${JSON.stringify(params)}`;
};

// ==========================================
// GET CACHE
// ==========================================
export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    console.error("Cache GET error:", error.message);
    return null; // fail silently
  }
};

// ==========================================
// SET CACHE
// ==========================================
export const setCache = async (key, data, ttl = 60) => {
  try {
    await redisClient.set(key, JSON.stringify(data), "EX", ttl);
  } catch (error) {
    console.error("Cache SET error:", error.message);
  }
};

// ==========================================
// DELETE SINGLE KEY
// ==========================================
export const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("Cache DELETE error:", error.message);
  }
};

// ==========================================
// CLEAR CACHE BY PATTERN (IMPORTANT)
// ==========================================
export const clearCacheByPattern = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🧹 Cleared cache: ${pattern}`);
    }
  } catch (error) {
    console.error("Cache CLEAR error:", error.message);
  }
};

// ==========================================
// PROPERTY CACHE HELPERS
// ==========================================
export const clearPropertyCache = async () => {
  await clearCacheByPattern("properties:*");
  await clearCacheByPattern("geo:*");
  await clearCacheByPattern("featured:*");
};

// ==========================================
// BLOG CACHE HELPERS
// ==========================================
export const clearBlogCache = async () => {
  await clearCacheByPattern("blogs:*");
  await clearCacheByPattern("blog:*");
};

// ==========================================
// SMART CACHE WRAPPER (BEST PRACTICE)
// ==========================================
export const cacheWrapper = async ({ key, ttl = 60, fetchFunction }) => {
  try {
    // 1. Check cache
    const cached = await getCache(key);
    if (cached) {
      return { source: "cache", data: cached };
    }

    // 2. Fetch from DB
    const freshData = await fetchFunction();

    // 3. Store in cache
    await setCache(key, freshData, ttl);

    return { source: "database", data: freshData };
  } catch (error) {
    console.error("Cache Wrapper error:", error.message);

    // fallback (never break app)
    const freshData = await fetchFunction();
    return { source: "database", data: freshData };
  }
};
