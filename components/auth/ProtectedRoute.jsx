"use client";

// ======================================================
// File: components/auth/ProtectedRoute.jsx
// Description: Production-grade Route Protection
// Manual session validation + role protection
// ======================================================

import { useEffect, useMemo, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

// ======================================================
// TYPES
// ======================================================

/**
 * @typedef {"admin" | "agent" | "user"} UserRole
 */

/**
 * @typedef ProtectedRouteProps
 * @property {React.ReactNode} children
 * @property {UserRole[]} [allowedRoles]
 */

// ======================================================
// AUTH PAGES
// Authenticated users should not access these
// ======================================================

/** @type {string[]} */
const AUTH_PAGES = ["/login", "/register"];

// ======================================================
// COMPONENT
// ======================================================

/**
 * @param {ProtectedRouteProps} props
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();

  const pathname = usePathname();

  const { user, loading, checkAuth, isAuthenticated } = useAuth();

  // ====================================================
  // LOCAL STATE
  // Prevent premature redirects
  // ====================================================
  const [checkingSession, setCheckingSession] = useState(true);

  // ====================================================
  // AUTH PAGE CHECK
  // ====================================================
  const isAuthPage = useMemo(() => AUTH_PAGES.includes(pathname), [pathname]);

  // ====================================================
  // SESSION CHECK
  // Manual auth validation
  // ====================================================
  useEffect(() => {
    let mounted = true;

    const validateSession = async () => {
      try {
        setCheckingSession(true);

        await checkAuth();
      } catch {
        // silent fail
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    validateSession();

    return () => {
      mounted = false;
    };
  }, [checkAuth]);

  // ====================================================
  // ACCESS CONTROL
  // ====================================================
  useEffect(() => {
    if (loading || checkingSession) {
      return;
    }

    // ==============================================
    // NOT AUTHENTICATED
    // ==============================================
    if (!isAuthenticated) {
      // Allow access to auth pages
      if (isAuthPage) {
        return;
      }

      router.replace("/login");

      return;
    }

    // ==============================================
    // AUTHENTICATED
    // ==============================================
    if (isAuthenticated) {
      // Prevent access to login/register
      if (isAuthPage) {
        const role = user?.role;

        // Admin
        if (role === "admin") {
          router.replace("/admin/dashboard");

          return;
        }

        // Agent
        if (role === "agent") {
          router.replace("/agent/dashboard");

          return;
        }

        // User
        router.replace("/user/dashboard");

        return;
      }

      // ==========================================
      // ROLE CHECK
      // ==========================================
      const hasRoleAccess =
        allowedRoles.length === 0 ||
        allowedRoles.includes(
          /** @type {UserRole} */
          (user?.role),
        );

      if (!hasRoleAccess) {
        router.replace("/");

        return;
      }
    }
  }, [
    router,
    pathname,
    user,
    loading,
    isAuthPage,
    allowedRoles,
    checkingSession,
    isAuthenticated,
  ]);

  // ====================================================
  // LOADING UI
  // ====================================================
  if (loading || checkingSession) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              border: "4px solid #e2e8f0",
              borderTop: "4px solid #2563eb",
              borderRadius: "999px",
              margin: "0 auto",
              animation: "spin 0.8s linear infinite",
            }}
          />

          <p
            style={{
              marginTop: "18px",
              color: "#64748b",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Checking session...
          </p>
        </div>

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // ====================================================
  // BLOCK UNAUTHORIZED
  // ====================================================
  if (!isAuthenticated && !isAuthPage) {
    return null;
  }

  // ====================================================
  // BLOCK AUTH PAGES
  // ====================================================
  if (isAuthenticated && isAuthPage) {
    return null;
  }

  // ====================================================
  // ROLE BLOCK
  // ====================================================
  const hasRoleAccess =
    allowedRoles.length === 0 ||
    allowedRoles.includes(
      /** @type {UserRole} */
      (user?.role),
    );

  if (isAuthenticated && !hasRoleAccess) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================
  return children;
}
