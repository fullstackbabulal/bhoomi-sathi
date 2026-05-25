// ======================================================
// File: services/authApi.js
// Description: Production-grade Authentication API
// Cookie-based authentication (HttpOnly JWT)
// ======================================================

import axios from "axios";

// ======================================================
// ENVIRONMENT CONFIG
// ======================================================
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ======================================================
// AXIOS INSTANCE
// ======================================================
const authApi = axios.create({
  baseURL: API_BASE_URL,

  withCredentials: true,

  timeout: 15000,

  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================================
// REQUEST INTERCEPTOR
// Future extensibility
// ======================================================
authApi.interceptors.request.use(
  (config) => config,

  (error) => Promise.reject(error),
);

// ======================================================
// RESPONSE INTERCEPTOR
// Centralized error normalization
// ======================================================
authApi.interceptors.response.use(
  (response) => response,

  (error) => {
    return Promise.reject(normalizeApiError(error));
  },
);

// ======================================================
// NORMALIZE API ERROR
// ======================================================
const normalizeApiError = (error) => {
  // ==============================================
  // NETWORK ERROR
  // ==============================================
  if (!error?.response) {
    return new Error("Unable to connect to server.");
  }

  // ==============================================
  // REQUEST TIMEOUT
  // ==============================================
  if (error?.code === "ECONNABORTED") {
    return new Error("Request timeout. Please try again.");
  }

  const status = error.response.status;

  const message = error.response?.data?.message || "Something went wrong.";

  switch (status) {
    case 400:
      return new Error(message);

    case 401:
      return new Error(message);

    case 403:
      return new Error(message);

    case 404:
      return new Error("Requested resource not found.");

    case 429:
      return new Error("Too many requests. Please try again later.");

    case 500:
      return new Error("Internal server error.");

    default:
      return new Error(message);
  }
};

// ======================================================
// VALIDATE RESPONSE
// ======================================================
const validateResponse = (response) => {
  if (!response?.data) {
    throw new Error("Invalid server response.");
  }

  return response.data;
};

// ======================================================
// LOGIN USER
// POST /api/auth/login
// ======================================================
export const loginUser = async ({ email, password }) => {
  const response = await authApi.post("/auth/login", {
    email,
    password,
  });

  return validateResponse(response);
};

// ======================================================
// GET CURRENT USER
// GET /api/auth/me
//
// IMPORTANT:
// 401 = expected when user is
// not logged in.
// Returns null instead of throwing.
// ======================================================
export const getCurrentUser = async () => {
  try {
    const response = await authApi.get("/auth/me");

    return validateResponse(response);
  } catch (error) {
    // ==========================================
    // EXPECTED CASE
    // User not authenticated
    // ==========================================
    if (error?.message?.toLowerCase()?.includes("unauthorized")) {
      return null;
    }

    return null;
  }
};

// ======================================================
// LOGOUT USER
// POST /api/auth/logout
// ======================================================
export const logoutUser = async () => {
  const response = await authApi.post("/auth/logout");

  return validateResponse(response);
};

// ======================================================
// REGISTER USER
// POST /api/auth/register
// ======================================================
export const registerUser = async ({ name, email, password, phone = "" }) => {
  const response = await authApi.post("/auth/register", {
    name,
    email,
    password,
    phone,
  });

  return validateResponse(response);
};

// ======================================================
// EXPORT INSTANCE
// ======================================================
export default authApi;
