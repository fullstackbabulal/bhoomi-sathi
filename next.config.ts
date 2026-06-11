// ======================================================
// File: frontend/next.config.ts
// ======================================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.0.2"],

  images: {
    // ==========================================
    // LOCAL DEVELOPMENT
    // ==========================================

    dangerouslyAllowLocalIP: true,

    qualities: [75, 90],

    remotePatterns: [
      // ==========================================
      // LOCAL BACKEND
      // ==========================================

      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/uploads/**",
      },

      // ==========================================
      // PRODUCTION BACKEND
      // Allow ALL images from:
      // https://backend.bhartiavenue.com
      // ==========================================

      {
        protocol: "https",
        hostname: "backend.bhartiavenue.com",
        pathname: "/**",
      },

      // ==========================================
      // EXTERNAL IMAGE SOURCES
      // ==========================================

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;
