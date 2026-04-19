import Property from "../models/Property.js";

export const buildPropertyQuery = (params) => {
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

export const executePropertySearch = async ({ query, page, limit, sort }) => {
  const properties = await Property.find(query)
    .populate("postedBy", "name")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Property.countDocuments(query);

  return {
    total,
    properties,
  };
};
