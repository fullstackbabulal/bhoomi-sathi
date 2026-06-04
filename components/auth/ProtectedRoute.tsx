"use client";

// ======================================================
// File: components/auth/ProtectedRoute.tsx
// Description: Secure Route Protection
// Auth + Role-based Access Control
// ======================================================

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

// ======================================================
// TYPES
// ======================================================

type UserRole = "admin" | "agent" | "user";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

// ======================================================
// AUTH PAGES
// ======================================================

const AUTH_PAGES = ["/login", "/register"];

// ======================================================
// COMPONENT
// ======================================================

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) {
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
    // ==========================================
    // WAIT FOR AUTH CHECK
    // ==========================================

    if (loading) return;

    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (!isAuthenticated && !isAuthPage) {
      router.replace("/login");

      return;
    }

    // ==========================================
    // AUTH PAGE REDIRECT
    // Example:
    // Logged-in user visits /login
    // ==========================================

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

    // ==========================================
    // ROLE VALIDATION
    // ==========================================

    const hasRoleAccess =
      allowedRoles.length === 0 ||
      allowedRoles.includes(user?.role as UserRole);

    if (isAuthenticated && !hasRoleAccess) {
      router.replace("/");

      return;
    }
  }, [
    router,
    pathname,
    loading,
    user,
    isAuthenticated,
    allowedRoles,
    isAuthPage,
  ]);

  // ====================================================
  // LOADING STATE
  // ====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // ====================================================
  // BLOCK UNAUTHENTICATED ACCESS
  // ====================================================

  if (!isAuthenticated && !isAuthPage) {
    return null;
  }

  // ====================================================
  // ROLE CHECK
  // ====================================================

  const hasRoleAccess =
    allowedRoles.length === 0 || allowedRoles.includes(user?.role as UserRole);

  if (isAuthenticated && !hasRoleAccess) {
    return null;
  }

  // ====================================================
  // SAFE RENDER
  // ====================================================

  return <>{children}</>;
}
