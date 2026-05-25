"use client";

import { useEffect, useMemo, useState } from "react";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import styles from "./AdminLayout.module.css";

export default function AdminLayout({
  children,

  // Dynamic/API Props
  adminData = null,
  sidebarItems = null,
  notifications = null,

  loading = false,
  error = null,

  // Optional config
  defaultCollapsed = false,
}) {
  /*
  ===================================
  STATE
  ===================================
  */

  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  /*
  ===================================
  MOCK / STATIC FALLBACK
  ===================================
  */

  const mockSidebarItems = [
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

  /*
  ===================================
  SAFE DATA
  API → STATIC FALLBACK
  ===================================
  */

  const safeSidebarItems = useMemo(() => {
    return sidebarItems?.length ? sidebarItems : mockSidebarItems;
  }, [sidebarItems]);

  /*
  ===================================
  RESPONSIVE
  ===================================
  */

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

  /*
  ===================================
  SIDEBAR ACTIONS
  ===================================
  */

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

  return (
    <div className={styles.adminLayout}>
      {/* SIDEBAR */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        isOpen={mobileSidebarOpen}
        loading={loading}
        error={error}
        navItems={safeSidebarItems}
        onClose={handleSidebarClose}
        onToggleCollapse={handleSidebarToggle}
      />

      {/* MAIN */}
      <div
        className={`${styles.mainWrapper} ${
          sidebarCollapsed && !isMobile ? styles.collapsed : ""
        }`}
      >
        {/* HEADER */}
        <AdminHeader
          adminData={adminData}
          notifications={notifications}
          loading={loading}
          error={error}
          onMenuClick={handleMenuClick}
        />

        {/* CONTENT */}
        <main className={styles.mainContent}>
          {children ?? <div>No content available.</div>}
        </main>
      </div>
    </div>
  );
}
