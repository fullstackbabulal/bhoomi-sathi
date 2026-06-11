// ======================================================
// File: app/layout.tsx
// Description: Root Layout
// Production-grade App Router layout
// ======================================================

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import ToastProvider from "@/components/providers/ToastProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";

import { AuthProvider } from "@/context/AuthContext";

// ======================================================
// SEO METADATA
// ======================================================
export const metadata: Metadata = {
  metadataBase: new URL("https://plotinpatna.com"),

  title: {
    default: "Plot in Patna - Find Your Dream Land",
    template: "%s | Plot in Patna",
  },

  description:
    "Buy plots, land, flats and real estate in Patna with trusted guidance and verified property listings.",

  keywords: [
    "real estate",
    "plots",
    "land",
    "property",
    "buy land",
    "Plot in Patna",
    "Patna property",
    "Patna plots",
    "Bihar real estate",
  ],

  applicationName: "Plot in Patna",

  openGraph: {
    title: "Plot in Patna - Find Your Dream Land",
    description:
      "Buy plots, land, flats and real estate in Patna with trusted guidance and verified property listings.",
    url: "https://plotinpatna.com",
    siteName: "Plot in Patna",
    locale: "en_IN",
    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Plot in Patna",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Plot in Patna - Find Your Dream Land",
    description:
      "Buy plots, land, flats and real estate in Patna with trusted guidance and verified property listings.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
        <ReduxProvider>
          <ToastProvider />

          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
