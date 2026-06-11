"use client";

// ======================================================
// File: context/AuthContext.tsx
// Description: Production-grade Auth Context
// Cookie-based authentication
// ======================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

import { useRouter } from "next/navigation";

import { getCurrentUser, loginUser, logoutUser } from "@/services/authApi";

// ======================================================
// TYPES
// ======================================================

export interface AuthUser {
  _id?: string;
  id?: string;

  name?: string;
  email?: string;
  phone?: string;

  role?: string;

  avatar?: string;

  [key: string]: any;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;

  setUser: Dispatch<SetStateAction<AuthUser | null>>;

  loading: boolean;

  isAuthenticated: boolean;

  login: (payload: LoginPayload) => Promise<{
    success: boolean;
    user: AuthUser;
  }>;

  logout: () => Promise<void>;

  checkAuth: () => Promise<AuthUser | null>;

  refreshUser: () => Promise<AuthUser | null>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ======================================================
// CONTEXT
// ======================================================

const AuthContext = createContext<AuthContextType | null>(null);

// ======================================================
// PROVIDER
// ======================================================

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  // ====================================================
  // STATE
  // ====================================================

  const [user, setUser] = useState<AuthUser | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  // ====================================================
  // CHECK AUTH
  // ====================================================

  const checkAuth = useCallback(async () => {
    try {
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
    }
  }, []);

  // ====================================================
  // INITIAL SESSION CHECK
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        await checkAuth();
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [checkAuth]);

  // ====================================================
  // LOGIN
  // ====================================================

  const login = useCallback(
    async ({ email, password }: LoginPayload) => {
      try {
        setLoading(true);

        const response = await loginUser({
          email,
          password,
        });

        if (!response?.success) {
          throw new Error(response?.message || "Login failed.");
        }

        const currentUser = await checkAuth();

        if (!currentUser) {
          throw new Error("Unable to fetch authenticated user.");
        }

        switch (currentUser?.role) {
          case "admin":
            router.replace("/admin/dashboard");
            break;

          case "agent":
            router.replace("/agent/dashboard");
            break;

          default:
            router.replace("/user/dashboard");
        }

        return {
          success: true,
          user: currentUser,
        };
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
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);

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

  const value = useMemo<AuthContextType>(
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ======================================================
// CUSTOM HOOK
// ======================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  return {
    user: null,

    setUser: () => {},

    loading: false,

    isAuthenticated: false,

    login: async () => {
      throw new Error("AuthProvider not available");
    },

    logout: async () => {},

    checkAuth: async () => null,

    refreshUser: async () => null,
  };
}
export default AuthContext;
