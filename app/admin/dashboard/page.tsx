"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import DashboardHome from "@/components/admin/dashboard/DashboardHome";

export default function AdminDashboardPage() {
  /*
  ===================================
  STATE
  ===================================
  */

  const [dashboardData, setDashboardData] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  /*
  ===================================
  FETCH DASHBOARD
  API FIRST
  ===================================
  */

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        /*
        ===================================
        API CALL
        Replace with real API
        ===================================
        */

        // Example:
        // const response =
        //   await getDashboard();

        // const result =
        //   response?.data;

        const result = null;

        if (!mounted) return;

        /*
        ===================================
        SAFE API → FALLBACK
        ===================================
        */

        setDashboardData(result || null);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);

        if (!mounted) return;

        setError("Unable to load dashboard");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AdminLayout loading={loading} error={error}>
      <DashboardHome
        dashboardData={dashboardData}
        loading={loading}
        error={error}
      />
    </AdminLayout>
  );
}
