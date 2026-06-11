// ======================================================
// File: frontend/utils/api.js
// Description: Axios API Client
// ======================================================

import axios from "axios";

// ======================================================
// API BASE URL
// ======================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ======================================================
// AXIOS INSTANCE
// ======================================================

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,

  headers: {
    "Content-Type": "application/json",
  },

  // ==========================================
  // REQUIRED FOR HTTPONLY COOKIE AUTH
  // ==========================================
  withCredentials: true,

  timeout: 30000,
});

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

API.interceptors.request.use(
  (config) => config,

  (error) => Promise.reject(error),
);

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    /*
    ============================================
    EXPECTED AUTH FAILURE
    DO NOT THROW CONSOLE ERROR
    401 during protected route check
    is NORMAL.
    ============================================
    */

    if (status === 401) {
      console.warn("Unauthorized request:", message);

      return Promise.reject(error);
    }

    /*
    ============================================
    REAL ERRORS
    ============================================
    */

    console.error("API Error:", message);

    return Promise.reject(error);
  },
);

// ======================================================
// EXPORT
// ======================================================

export default API;
