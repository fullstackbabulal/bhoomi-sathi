"use client";

// ======================================================
// File: components/auth/ProtectedRoute.jsx
// Description: Secure Route Protection
// Auth + Role-based access control
// ======================================================

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

// ======================================================
// AUTH PAGES
// ======================================================

const AUTH_PAGES = ["/login", "/register"];

// ======================================================
// COMPONENT
// ======================================================

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();

  const pathname = usePathname();

  const { user, loading, isAuthenticated } = useAuth();

  // ====================================================
  // PAGE TYPE
  // ====================================================

  const isAuthPage = AUTH_PAGES.includes(pathname);

  // ====================================================
  // ACCESS CONTROL
  // ====================================================

  useEffect(() => {
    // Wait for auth
    if (loading) return;

    /*
    ==========================================
    NOT LOGGED IN
    ==========================================
    */

    if (!isAuthenticated && !isAuthPage) {
      router.replace("/login");

      return;
    }

    /*
    ==========================================
    AUTH PAGE REDIRECT
    Example:
    logged-in user visits /login
    ==========================================
    */

    if (isAuthenticated && isAuthPage) {
      switch (user?.role) {
        case "admin":
          router.replace("/admin/dashboard");
          break;

        case "agent":
          router.replace("/agent/dashboard");
          break;

        default:
          router.replace("/user/dashboard");
      }

      return;
    }

    /*
    ==========================================
    ROLE VALIDATION
    ==========================================
    */

    const hasRoleAccess =
      allowedRoles.length === 0 || allowedRoles.includes(user?.role);

    if (isAuthenticated && !hasRoleAccess) {
      router.replace("/");

      return;
    }
  }, [
    router,
    loading,
    pathname,
    user,
    isAuthenticated,
    allowedRoles,
    isAuthPage,
  ]);

  // ====================================================
  // WAIT FOR AUTH
  // ====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // ====================================================
  // BLOCK RENDER
  // ====================================================

  if (!isAuthenticated && !isAuthPage) {
    return null;
  }

  const hasRoleAccess =
    allowedRoles.length === 0 || allowedRoles.includes(user?.role);

  if (isAuthenticated && !hasRoleAccess) {
    return null;
  }

  // ====================================================
  // SAFE RENDER
  // ====================================================

  return children;
}
