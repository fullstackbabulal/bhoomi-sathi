// ======================================================
// File: src/services/propertyApi.js
// Description: Property API Service
// ======================================================

import API from "../utils/api";

// ======================================================
// CONFIG
// ======================================================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ======================================================
// HELPERS
// ======================================================
const getFullImageUrl = (path) => {
  if (!path) return "";

  // already full url
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
};

const normalizeProperty = (property) => {
  if (!property) return null;

  return {
    ...property,

    thumbnail: getFullImageUrl(property.thumbnail),

    images: Array.isArray(property.images)
      ? property.images.map((image) => ({
          ...image,
          url: getFullImageUrl(image.url),
        }))
      : [],
  };
};

const buildPropertyFormData = (payload) => {
  const formData = new FormData();

  // ==========================================
  // SIMPLE FIELDS
  // ==========================================
  formData.append("title", payload.title || "");

  formData.append("slug", payload.slug || "");

  formData.append("overview", payload.overview || "");

  formData.append("description", payload.description || "");

  formData.append("type", payload.type || "apartment");

  formData.append("status", payload.status || "available");

  formData.append("price", payload.price || 0);

  formData.append("bedrooms", payload.bedrooms || 0);

  formData.append("bathrooms", payload.bathrooms || 0);

  formData.append("isFeatured", payload.isFeatured || false);

  formData.append("isVerified", payload.isVerified || false);

  // ==========================================
  // JSON FIELDS
  // ==========================================
  formData.append(
    "area",
    JSON.stringify(
      payload.area || {
        value: "",
        unit: "sqft",
      },
    ),
  );

  formData.append("location", JSON.stringify(payload.location || {}));

  formData.append("amenities", JSON.stringify(payload.amenities || []));

  formData.append("seo", JSON.stringify(payload.seo || {}));

  // ==========================================
  // FILES
  // ==========================================
  if (payload.thumbnailFile) {
    formData.append("thumbnail", payload.thumbnailFile);
  }

  if (Array.isArray(payload.galleryFiles)) {
    payload.galleryFiles.forEach((file) => {
      formData.append("images", file);
    });
  }

  return formData;
};

// ======================================================
// FETCH ALL PROPERTIES
// ======================================================
export const fetchProperties = async (params = {}) => {
  try {
    const { data } = await API.get("/properties", {
      params,
    });

    return {
      ...data,
      properties: data?.properties?.map(normalizeProperty) || [],
    };
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

    return {
      ...data,
      data: normalizeProperty(data.data),
    };
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
// GET PROPERTY BY SLUG
// ======================================================
export const getPropertyBySlug = async (slug) => {
  try {
    const { data } = await API.get(`/properties/slug/${slug}`);

    return {
      ...data,
      data: normalizeProperty(data.data),
    };
  } catch (error) {
    console.error("Get property by slug error:", error);

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
    const formData = buildPropertyFormData(payload);

    const { data } = await API.post("/properties", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      ...data,
      data: normalizeProperty(data.data),
    };
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
    const formData = buildPropertyFormData(payload);

    const { data } = await API.put(`/properties/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      ...data,
      data: normalizeProperty(data.data),
    };
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

    return {
      ...data,
      properties: data?.properties?.map(normalizeProperty) || [],
    };
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
// FETCH ADMIN PROPERTIES
// Admin Dashboard Property Listing
// ======================================================
export const getAdminProperties = async (params = {}) => {
  try {
    const { data } = await API.get("/properties/admin/all", {
      params,
    });

    return {
      ...data,

      properties: data?.properties?.map(normalizeProperty) || [],
    };
  } catch (error) {
    console.error("Get admin properties error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to fetch admin properties",
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
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getAdminProperties,
};
