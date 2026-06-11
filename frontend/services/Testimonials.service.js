// ======================================================
// File: frontend/services/Testimonials.service.js
// Description: Testimonials API Service
// ======================================================

import API from "../utils/api";

// ======================================================
// GET ALL TESTIMONIALS
// GET /api/testimonials
// ======================================================

export const getTestimonials = async () => {
  try {
    const { data } = await API.get("/testimonials");

    return data;
  } catch (error) {
    console.error("Get Testimonials Error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to fetch testimonials",
      }
    );
  }
};

// ======================================================
// GET FEATURED TESTIMONIALS
// GET /api/testimonials/featured
// ======================================================

export const getFeaturedTestimonials = async () => {
  try {
    const { data } = await API.get("/testimonials/featured");

    return data;
  } catch (error) {
    console.error("Get Featured Testimonials Error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to fetch featured testimonials",
      }
    );
  }
};

// ======================================================
// GET TESTIMONIAL BY ID
// GET /api/testimonials/:id
// ======================================================

export const getTestimonialById = async (id) => {
  try {
    const { data } = await API.get(`/testimonials/${id}`);

    return data;
  } catch (error) {
    console.error("Get Testimonial Error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to fetch testimonial",
      }
    );
  }
};

// ======================================================
// CREATE TESTIMONIAL
// POST /api/testimonials
// ======================================================

export const createTestimonial = async (payload) => {
  try {
    const formData = new FormData();

    formData.append("entity", "testimonial");

    formData.append("name", payload.name || "");
    formData.append("designation", payload.designation || "");
    formData.append("company", payload.company || "");
    formData.append("review", payload.review || "");
    formData.append("location", payload.location || "");
    formData.append("rating", payload.rating || 5);
    formData.append("isFeatured", payload.isFeatured || false);
    formData.append("displayOrder", payload.displayOrder || 0);

    if (payload.imageFile) {
      formData.append("image", payload.imageFile);
    }

    const { data } = await API.post("/testimonials", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Create Testimonial Error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to create testimonial",
      }
    );
  }
};

// ======================================================
// UPDATE TESTIMONIAL
// PUT /api/testimonials/:id
// ======================================================

export const updateTestimonial = async (id, payload) => {
  try {
    const formData = new FormData();

    formData.append("entity", "testimonial");

    formData.append("name", payload.name || "");
    formData.append("designation", payload.designation || "");
    formData.append("company", payload.company || "");
    formData.append("review", payload.review || "");
    formData.append("location", payload.location || "");
    formData.append("rating", payload.rating || 5);
    formData.append("isFeatured", payload.isFeatured || false);
    formData.append("displayOrder", payload.displayOrder || 0);

    if (payload.imageFile) {
      formData.append("image", payload.imageFile);
    }

    const { data } = await API.put(`/testimonials/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Update Testimonial Error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to update testimonial",
      }
    );
  }
};

// ======================================================
// TOGGLE TESTIMONIAL STATUS
// PATCH /api/testimonials/:id/status
// ======================================================

export const toggleTestimonialStatus = async (id) => {
  try {
    const { data } = await API.patch(`/testimonials/${id}/status`);

    return data;
  } catch (error) {
    console.error("Toggle Testimonial Status Error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to update testimonial status",
      }
    );
  }
};

// ======================================================
// DELETE TESTIMONIAL
// DELETE /api/testimonials/:id
// ======================================================

export const deleteTestimonial = async (id) => {
  try {
    const { data } = await API.delete(`/testimonials/${id}`);

    return data;
  } catch (error) {
    console.error("Delete Testimonial Error:", error);

    throw (
      error?.response?.data || {
        message: "Failed to delete testimonial",
      }
    );
  }
};

// ======================================================
// EXPORTS
// ======================================================

export default {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  toggleTestimonialStatus,
  deleteTestimonial,
};
