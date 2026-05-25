"use client";

// ======================================================
// File: components/login/LoginForm.jsx
// Description: Production-grade Login Form
// Role-based authentication redirect
// ======================================================

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();

  // ====================================================
  // AUTH CONTEXT
  // ====================================================
  const { login, loading, isAuthenticated, checkAuth } = useAuth();

  // ====================================================
  // FORM STATE
  // ====================================================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // ====================================================
  // INPUT CHANGE
  // ====================================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ====================================================
  // ROLE REDIRECT
  // Prevent logged-in user from staying
  // on /login page
  // ====================================================
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const redirectUser = async () => {
      try {
        const currentUser = await checkAuth();

        const role = currentUser?.role;

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
      } catch (err) {
        console.error("Redirect failed:", err);
      }
    };

    redirectUser();
  }, [isAuthenticated, router, checkAuth]);

  // ====================================================
  // SUBMIT
  // ====================================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response?.success) {
        const role = response?.user?.role;

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
      }
    } catch (err) {
      console.error("Login failed:", err);

      setError(err?.message || "Authentication failed");
    }
  };

  // ====================================================
  // UI
  // ====================================================
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            marginBottom: "24px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            Login
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Sign in to continue
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 14px",
              borderRadius: "14px",
              background: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div
            style={{
              marginBottom: "16px",
            }}
          >
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              cursor: "pointer",
              padding: "14px",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "700",
              background: "#2563eb",
              color: "#ffffff",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
