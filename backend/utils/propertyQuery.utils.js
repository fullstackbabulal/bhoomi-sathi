// ======================================================
// File: backend/utils/propertyQuery.utils.js
// Description: Property Query Utility
// Purpose: Build property query + execute search
// ======================================================

const Property = require("../models/Property.model.js");

// ======================================================
// BUILD PROPERTY QUERY
// ======================================================
const buildPropertyQuery = (params = {}) => {
  const { minPrice, maxPrice, type, city, keyword } = params;

  const query = {};

  // ======================================================
  // PRICE FILTER
  // ======================================================
  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  // ======================================================
  // PROPERTY TYPE
  // Normalize casing
  // ======================================================
  if (type?.trim()) {
    query.type = String(type).trim().toLowerCase();
  }

  // ======================================================
  // CITY FILTER
  // Case-insensitive search
  // ======================================================
  if (city?.trim()) {
    query["location.city"] = {
      $regex: `^${city.trim()}$`,
      $options: "i",
    };
  }

  // ======================================================
  // KEYWORD SEARCH
  // ======================================================
  if (keyword?.trim()) {
    query.$text = {
      $search: keyword.trim(),
    };
  }

  return query;
};

// ======================================================
// EXECUTE PROPERTY SEARCH
// ======================================================
const executePropertySearch = async ({
  query = {},
  page = 1,
  limit = 10,
  sort = {
    createdAt: -1,
  },
}) => {
  const currentPage = Number(page) || 1;

  const pageLimit = Number(limit) || 10;

  const skip = (currentPage - 1) * pageLimit;

  const properties = await Property.find(query)
    .populate("postedBy", "name email phone")
    .sort(sort)
    .skip(skip)
    .limit(pageLimit)
    .lean();

  const total = await Property.countDocuments(query);

  return {
    total,
    page: currentPage,
    pages: Math.ceil(total / pageLimit),
    properties,
  };
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  buildPropertyQuery,
  executePropertySearch,
};
