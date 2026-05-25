"use client";

// ======================================================
// File: app/dashboard/page.tsx
// Description: Role-based Dashboard Redirect
// ======================================================

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

// ======================================================
// TYPES
// ======================================================

type UserRole = "admin" | "agent" | "user";

interface AuthUser {
  role?: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<unknown>;
}

// ======================================================
// COMPONENT
// ======================================================

export default function DashboardPage() {
  const router = useRouter();

  // ==============================================
  // TYPE-SAFE AUTH
  // ==============================================
  const { user, loading, checkAuth, isAuthenticated } =
    useAuth() as AuthContextValue;

  // ==============================================
  // SESSION CHECK
  // ==============================================
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ==============================================
  // ROLE REDIRECT
  // ==============================================
  useEffect(() => {
    if (loading) {
      return;
    }

    // NOT LOGGED IN
    if (!isAuthenticated) {
      router.replace("/login");

      return;
    }

    const role = user?.role;

    // ADMIN
    if (role === "admin") {
      router.replace("/admin/dashboard");

      return;
    }

    // AGENT
    if (role === "agent") {
      router.replace("/agent/dashboard");

      return;
    }

    // USER
    router.replace("/user/dashboard");
  }, [user, loading, router, isAuthenticated]);

  // ==============================================
  // LOADING UI
  // ==============================================
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
      }}
    >
      Redirecting...
    </main>
  );
}
