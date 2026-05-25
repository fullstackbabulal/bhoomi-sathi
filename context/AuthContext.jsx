"use client";

// ======================================================
// File: context/AuthContext.jsx
// Description: Production-grade Auth Context
// Cookie-based authentication
// ======================================================

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { getCurrentUser, loginUser, logoutUser } from "@/services/authApi";

// ======================================================
// CONTEXT
// ======================================================
const AuthContext = createContext(null);

// ======================================================
// PROVIDER
// ======================================================
export function AuthProvider({ children }) {
  const router = useRouter();

  // ====================================================
  // STATE
  // ====================================================
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(false);

  // ====================================================
  // CHECK AUTH
  // ====================================================
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCurrentUser();

      const currentUser = response?.user || null;

      if (currentUser) {
        setUser(currentUser);

        setIsAuthenticated(true);

        return currentUser;
      }

      setUser(null);

      setIsAuthenticated(false);

      return null;
    } catch {
      setUser(null);

      setIsAuthenticated(false);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ====================================================
  // LOGIN
  // ====================================================
  const login = useCallback(
    async ({ email, password }) => {
      try {
        setLoading(true);

        // ======================================
        // LOGIN REQUEST
        // ======================================
        const response = await loginUser({
          email,
          password,
        });

        if (!response?.success) {
          throw new Error(response?.message || "Login failed.");
        }

        // ======================================
        // FETCH SESSION USER
        // ======================================
        const currentUser = await checkAuth();

        if (!currentUser) {
          throw new Error("Unable to fetch authenticated user.");
        }

        // ======================================
        // ROLE BASED REDIRECT
        // ======================================
        const role = currentUser?.role;

        if (role === "admin") {
          router.replace("/admin/dashboard");
        } else if (role === "agent") {
          router.replace("/agent/dashboard");
        } else {
          router.replace("/user/dashboard");
        }

        return {
          success: true,
          user: currentUser,
        };
      } catch (error) {
        setUser(null);

        setIsAuthenticated(false);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [checkAuth, router],
  );

  // ====================================================
  // LOGOUT
  // ====================================================
  const logout = useCallback(async () => {
    try {
      setLoading(true);

      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // ======================================
      // RESET STATE
      // ======================================
      setUser(null);

      setIsAuthenticated(false);

      setLoading(false);

      // ======================================
      // REDIRECT LOGIN
      // ======================================
      router.replace("/login");
    }
  }, [router]);

  // ====================================================
  // REFRESH USER
  // ====================================================
  const refreshUser = useCallback(async () => {
    return await checkAuth();
  }, [checkAuth]);

  // ====================================================
  // CONTEXT VALUE
  // ====================================================
  const value = useMemo(
    () => ({
      user,
      setUser,

      loading,
      isAuthenticated,

      login,
      logout,
      checkAuth,
      refreshUser,
    }),
    [user, loading, isAuthenticated, login, logout, checkAuth, refreshUser],
  );

  // ====================================================
  // PROVIDER
  // ====================================================
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ======================================================
// CUSTOM HOOK
// ======================================================
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

// ======================================================
// EXPORT
// ======================================================
export default AuthContext;
