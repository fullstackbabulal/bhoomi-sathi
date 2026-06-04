"use client";

// ======================================================
// File: components/admin/layout/AdminLayout.tsx
// Description: Admin Layout
// ======================================================

import { ReactNode, useEffect, useMemo, useState } from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import styles from "./AdminLayout.module.css";

// ======================================================
// TYPES
// ======================================================

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

interface AdminLayoutProps {
  children: ReactNode;

  adminData?: any;

  sidebarItems?: SidebarItem[] | null;

  notifications?: any[] | null;

  loading?: boolean;

  error?: string | null;

  defaultCollapsed?: boolean;
}

// ======================================================
// COMPONENT
// ======================================================

export default function AdminLayout({
  children,

  adminData = null,
  sidebarItems = null,
  notifications = null,

  loading = false,
  error = null,

  defaultCollapsed = false,
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // ====================================================
  // FALLBACK SIDEBAR
  // ====================================================

  const mockSidebarItems: SidebarItem[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: "layout-dashboard",
    },
    {
      label: "Properties",
      href: "/admin/properties",
      icon: "building-2",
    },
    {
      label: "Agents",
      href: "/admin/agents",
      icon: "users",
    },
    {
      label: "Enquiries",
      href: "/admin/enquiries",
      icon: "mail",
    },
    {
      label: "Blogs",
      href: "/admin/blogs",
      icon: "file-text",
    },
  ];

  const safeSidebarItems = useMemo(() => {
    return sidebarItems?.length ? sidebarItems : mockSidebarItems;
  }, [sidebarItems]);

  // ====================================================
  // RESPONSIVE
  // ====================================================

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;

      setIsMobile(mobile);

      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ====================================================
  // SIDEBAR ACTIONS
  // ====================================================

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileSidebarOpen(true);

      return;
    }

    setSidebarCollapsed((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        isOpen={mobileSidebarOpen}
        loading={loading}
        error={error}
        navItems={safeSidebarItems}
        onClose={handleSidebarClose}
        onToggleCollapse={handleSidebarToggle}
      />

      <div
        className={`${styles.mainWrapper} ${
          sidebarCollapsed && !isMobile ? styles.collapsed : ""
        }`}
      >
        <AdminHeader
          adminData={adminData}
          notifications={notifications}
          loading={loading}
          error={error}
          onMenuClick={handleMenuClick}
        />

        <main className={styles.mainContent}>
          {children ?? <div>No content available.</div>}
        </main>
      </div>
    </div>
  );
}
