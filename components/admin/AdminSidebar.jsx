"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Mail,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

import styles from "./AdminSidebar.module.css";

export default function AdminSidebar({
  navItems = null,

  collapsed = false,
  isOpen = false,

  loading = false,
  error = null,

  onClose,
  onToggleCollapse,
}) {
  const pathname = usePathname();

  /*
  ===================================
  MOCK / STATIC FALLBACK
  ===================================
  */

  const mockNavItems = [
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
    {
      label: "Settings",
      href: "/admin/settings",
      icon: "settings",
    },
  ];

  /*
  ===================================
  SAFE DATA
  API → STATIC FALLBACK
  ===================================
  */

  const safeNavItems = navItems?.length > 0 ? navItems : mockNavItems;

  /*
  ===================================
  ICON MAPPER
  ===================================
  */

  const iconMap = {
    "layout-dashboard": LayoutDashboard,
    "building-2": Building2,
    users: Users,
    mail: Mail,
    "file-text": FileText,
    settings: Settings,
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || LayoutDashboard;

    return <IconComponent size={22} />;
  };

  /*
  ===================================
  EMPTY SAFE
  ===================================
  */

  const showEmptyState = !loading && !error && safeNavItems.length === 0;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          ${styles.sidebar}
          ${collapsed ? styles.collapsed : ""}
          ${isOpen ? styles.open : ""}
        `}
      >
        {/* TOP */}
        <div className={styles.topSection}>
          <Link href="/admin/dashboard" className={styles.logoWrapper}>
            <div className={styles.logo}>A</div>

            {!collapsed && (
              <div className={styles.brandText}>
                <h2>Admin Panel</h2>
                <p>Property Management</p>
              </div>
            )}
          </Link>

          <button
            type="button"
            className={styles.mobileCloseBtn}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className={styles.navigation}>
          {/* Loading */}
          {loading && <div className={styles.emptyState}>Loading menu...</div>}

          {/* Error */}
          {!loading && error && (
            <div className={styles.emptyState}>Unable to load menu.</div>
          )}

          {/* Empty */}
          {showEmptyState && (
            <div className={styles.emptyState}>No navigation found.</div>
          )}

          {/* Menu */}
          {!loading &&
            !error &&
            safeNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href || "/admin/dashboard"}
                  className={`
                    ${styles.navItem}
                    ${isActive ? styles.active : ""}
                  `}
                >
                  <div className={styles.navLeft}>
                    {renderIcon(item.icon)}

                    {!collapsed && <span>{item.label || "Menu"}</span>}
                  </div>
                </Link>
              );
            })}
        </nav>

        {/* BOTTOM */}
        <div className={styles.bottomSection}>
          <button
            type="button"
            className={styles.collapseButton}
            onClick={onToggleCollapse}
          >
            {collapsed ? (
              <>
                <ChevronRight size={18} />
              </>
            ) : (
              <>
                <ChevronLeft size={18} />

                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
