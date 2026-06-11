// ======================================================
// File: utils/cache.js
// Description: Cache Utility (Redis Removed)
// Purpose: No-op cache layer for future scalability
// ======================================================

// ======================================================
// GENERATE CACHE KEY
// ======================================================
const generateCacheKey = (
  prefix,
  params = {}
) => {
  return `${prefix}:${JSON.stringify(
    params
  )}`;
};

// ======================================================
// CACHE METHODS (NO-OP)
// Redis removed → always return null
// ======================================================

const getCache = async () => {
  return null;
};

const setCache = async () => {
  return null;
};

const deleteCache = async () => {
  return null;
};

const clearCacheByPattern =
  async () => {
    return null;
  };

const clearPropertyCache =
  async () => {
    return null;
  };

const clearBlogCache =
  async () => {
    return null;
  };

// ======================================================
// CACHE WRAPPER
// Always fetch from database
// ======================================================
const cacheWrapper = async ({
  fetchFunction,
}) => {
  try {
    const data =
      await fetchFunction();

    return {
      source: "database",
      data,
    };
  } catch (error) {
    console.error(
      "❌ Cache Wrapper Error:",
      error.message
    );

    throw error;
  }
};

// ======================================================
// EXPORTS
// ======================================================
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