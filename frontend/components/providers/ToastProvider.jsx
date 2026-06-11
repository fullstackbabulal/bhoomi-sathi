"use client";

// ======================================================
// File: components/providers/ToastProvider.jsx
// Description: Global Toast Provider
// Production-grade notification system
// ======================================================

import { Toaster } from "react-hot-toast";

// ======================================================
// TOAST PROVIDER
// ======================================================
export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 4000,

        // ==============================================
        // SUCCESS TOAST
        // ==============================================
        success: {
          duration: 3000,
        },

        // ==============================================
        // ERROR TOAST
        // ==============================================
        error: {
          duration: 5000,
        },

        // ==============================================
        // DEFAULT STYLING
        // ==============================================
        style: {
          borderRadius: "14px",
          padding: "14px 16px",
          fontSize: "14px",
          fontWeight: "500",
          maxWidth: "420px",
        },
      }}
    />
  );
}
