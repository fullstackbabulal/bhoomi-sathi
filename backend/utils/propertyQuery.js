const Property = require("../models/Property");

// Build query
const buildPropertyQuery = (params) => {
  const { minPrice, maxPrice, type, city, keyword } = params;

  const query = {};

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (type) query.type = type;
  if (city) query["location.city"] = city;

  if (keyword) {
    query.$text = { $search: keyword };
  }

  return query;
};

// Execute search
const executePropertySearch = async ({
  query,
  page = 1,
  limit = 10,
  sort = {},
}) => {
  const properties = await Property.find(query)
    .populate("postedBy", "name")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Property.countDocuments(query);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    properties,
  };
};

module.exports = {
  buildPropertyQuery,
  executePropertySearch,
};
