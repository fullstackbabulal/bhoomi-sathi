// ======================================================
// File: frontend/utils/api.js
// Description: Axios API Client
// ======================================================

import axios from "axios";

// ======================================================
// API BASE URL
// ======================================================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ======================================================
// AXIOS INSTANCE
// ======================================================
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,

  headers: {
    "Content-Type": "application/json",
  },

  // ==================================================
  // REQUIRED FOR HTTPONLY COOKIE AUTH
  // ==================================================
  withCredentials: true,

  timeout: 30000,
});

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================
API.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================
API.interceptors.response.use(
  (response) => response,

  (error) => {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";

    console.error("API Error:", message);

    // ==========================================
    // AUTH ERROR
    // ==========================================
    if (error?.response?.status === 401) {
      console.warn("Unauthorized request.");
    }

    return Promise.reject(error);
  },
);

// ======================================================
// EXPORT
// ======================================================
export default API;
