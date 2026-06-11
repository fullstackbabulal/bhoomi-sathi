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

interface AuthUser {
  _id?: string;
  name?: string;
  email?: string;
  role?: UserRole | string;
}

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

  const pathname = usePathname() ?? "";

  const auth = useAuth();

  const user = (auth?.user ?? null) as AuthUser | null;

  const loading = Boolean(auth?.loading);
  const isAuthenticated = Boolean(auth?.isAuthenticated);

  // ====================================================
  // PAGE TYPE
  // ====================================================

  const isAuthPage = AUTH_PAGES.includes(pathname);

  // ====================================================
  // ACCESS CONTROL
  // ====================================================

  useEffect(() => {
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
          break;
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
  // LOADING
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
  // RENDER
  // ====================================================

  return <>{children}</>;
}
