// ======================================================
// File: services/searchService.js
// Description: Property Search Service
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
  // PROPERTY TYPE FILTER
  // ======================================================
  if (type) {
    query.type = type;
  }

  // ======================================================
  // CITY FILTER
  // ======================================================
  if (city) {
    query["location.city"] = city;
  }

  // ======================================================
  // KEYWORD SEARCH (TEXT INDEX)
  // ======================================================
  if (keyword) {
    query.$text = {
      $search: keyword,
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
  sort = {},
}) => {
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 10;
  const skip = (currentPage - 1) * pageLimit;

  const properties = await Property.find(query)
    .populate("postedBy", "name")
    .sort(sort)
    .skip(skip)
    .limit(pageLimit);

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
