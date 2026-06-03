// ======================================================
// File: app/layout.tsx
// Description: Root Layout
// Production-grade App Router layout
// ======================================================

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import BootstrapClient from "@/components/common/BootstrapClient";
import ToastProvider from "@/components/providers/ToastProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";

import { AuthProvider } from "@/context/AuthContext";

// ======================================================
// SEO METADATA
// ======================================================
export const metadata: Metadata = {
  title: "Plot in Patna - Find Your Dream Land",

  description: "Buy plots, land & property with trusted guidance",

  keywords: [
    "real estate",
    "plots",
    "land",
    "property",
    "buy land",
    "Plot in Patna",
  ],
};

// ======================================================
// TYPES
// ======================================================
interface RootLayoutProps {
  children: ReactNode;
}

// ======================================================
// ROOT LAYOUT
// ======================================================
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        {/* ==========================================
            BOOTSTRAP CLIENT JS
        ========================================== */}
        <BootstrapClient />

        {/* ==========================================
            REDUX PROVIDER
        ========================================== */}
        <ReduxProvider>
          {/* ==========================================
              GLOBAL TOAST PROVIDER
          ========================================== */}
          <ToastProvider />

          {/* ==========================================
              AUTH PROVIDER
              Cookie-based session auth
          ========================================== */}
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
