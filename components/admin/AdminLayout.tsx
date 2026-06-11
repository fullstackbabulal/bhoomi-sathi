"use client";

// ======================================================
// File: components/admin/layout/AdminLayout.tsx
// Description: Admin Layout
// ======================================================

import { ReactNode, useEffect, useMemo, useState } from "react";

import {
  LayoutDashboard,
  Building2,
  Users,
  Mail,
  FileText,
  PlusCircle,
  List,
} from "lucide-react";

import AdminHeader from "./AdminHeader";
import AdminSidebar, { SidebarItem } from "./AdminSidebar";

import styles from "./AdminLayout.module.css";

// ======================================================
// TYPES
// ======================================================

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
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },

    {
      label: "Properties",
      path: "/admin/properties/all",
      icon: Building2,

      children: [
        {
          label: "All Properties",
          path: "/admin/properties/all",
          icon: List,
        },
        {
          label: "Add Property",
          path: "/admin/properties/add",
          icon: PlusCircle,
        },
      ],
    },

    {
      label: "Agents",
      path: "/admin/agents",
      icon: Users,

      children: [
        {
          label: "All Agents",
          path: "/admin/agents",
          icon: List,
        },
        {
          label: "Add Agent",
          path: "/admin/agents/add",
          icon: PlusCircle,
        },
      ],
    },

    {
      label: "Enquiries",
      path: "/admin/enquiries",
      icon: Mail,
    },

    {
      label: "Blogs",
      path: "/admin/blogs",
      icon: FileText,

      children: [
        {
          label: "All Blogs",
          path: "/admin/blogs",
          icon: List,
        },
        {
          label: "Add Blog",
          path: "/admin/blogs/add",
          icon: PlusCircle,
        },
      ],
    },
  ];

  const safeSidebarItems = useMemo<SidebarItem[]>(() => {
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
