// ======================================================
// File: frontend/utils/api.js
// Description: Axios API Client
// ======================================================

import axios from "axios";

// ======================================================
// API BASE URL
// ======================================================
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ======================================================
// AXIOS INSTANCE
// ======================================================
const API = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  // ==================================================
  // REQUIRED FOR HTTPONLY COOKIE AUTH
  // ==================================================
  withCredentials: true,
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
    const message = error.response?.data?.message || error.message;

    console.error("API Error:", message);

    // Future auth redirect support
    if (error.response?.status === 401) {
      console.warn("Unauthorized request.");
    }

    return Promise.reject(error);
  },
);

// ======================================================
// EXPORT
// ======================================================
export default API;
