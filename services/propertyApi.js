// ======================================================
// File: src/services/propertyApi.js
// Description: Property API Service
// ======================================================

import API from "../utils/api";

// ======================================================
// FETCH ALL PROPERTIES
// ======================================================
export const fetchProperties = async (params = {}) => {
  try {
    const { data } = await API.get("/properties", {
      params,
    });

    return data;
  } catch (error) {
    console.error("Fetch properties error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to fetch properties",
      }
    );
  }
};

// ======================================================
// GET PROPERTY BY ID
// ======================================================
export const getPropertyById = async (id) => {
  try {
    const { data } = await API.get(`/properties/${id}`);

    return data;
  } catch (error) {
    console.error("Get property error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to fetch property",
      }
    );
  }
};

// ======================================================
// CREATE PROPERTY
// ======================================================
export const createProperty = async (payload) => {
  try {
    const { data } = await API.post("/properties", payload);

    return data;
  } catch (error) {
    console.error("Create property error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to create property",
      }
    );
  }
};

// ======================================================
// UPDATE PROPERTY
// ======================================================
export const updateProperty = async (id, payload) => {
  try {
    const { data } = await API.put(`/properties/${id}`, payload);

    return data;
  } catch (error) {
    console.error("Update property error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to update property",
      }
    );
  }
};

// ======================================================
// DELETE PROPERTY
// ======================================================
export const deleteProperty = async (id) => {
  try {
    const { data } = await API.delete(`/properties/${id}`);

    return data;
  } catch (error) {
    console.error("Delete property error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to delete property",
      }
    );
  }
};

// ======================================================
// FEATURED PROPERTIES
// ======================================================
export const getFeaturedProperties = async () => {
  try {
    const { data } = await API.get("/properties/featured");

    return data;
  } catch (error) {
    console.error("Featured property error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to fetch featured properties",
      }
    );
  }
};

// ======================================================
// EXPORT
// ======================================================
export default {
  fetchProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
};
