"use client";

// ======================================================
// File: AdminSidebar.tsx
// Description: Responsive Admin Sidebar
// ======================================================

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

import styles from "./AdminSidebar.module.css";
import ADMIN_SIDEBAR_CONFIG from "@/utils/AdminSidebarConfig";

// ======================================================
// TYPES
// ======================================================

export interface SidebarChild {
  label: string;
  path: string;
}

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType<{
    size?: number;
  }>;

  children?: SidebarItem[];
}

interface AdminSidebarProps {
  collapsed?: boolean;
  isOpen?: boolean;

  loading?: boolean;
  error?: string | null;

  navItems?: SidebarItem[];

  onClose?: () => void;
  onToggleCollapse?: () => void;
}

// ======================================================
// COMPONENT
// ======================================================

export default function AdminSidebar({
  collapsed = false,
  isOpen = false,

  loading = false,
  error = null,

  navItems = [],

  onClose = () => {},
  onToggleCollapse = () => {},
}: AdminSidebarProps) {
  const pathname = usePathname();

  // ====================================================
  // STATE
  // ====================================================

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // ====================================================
  // HANDLERS
  // ====================================================

  const toggleMenu = (label: string): void => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  // ====================================================
  // MENU SOURCE
  // ====================================================

  const menuItems: SidebarItem[] =
    navItems.length > 0 ? navItems : (ADMIN_SIDEBAR_CONFIG as SidebarItem[]);

  // ====================================================
  // EMPTY STATE
  // ====================================================

  const showEmptyState = !loading && !error && menuItems.length === 0;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* ===================================
          MOBILE OVERLAY
      =================================== */}

      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* ===================================
          SIDEBAR
      =================================== */}

      <aside
        className={`
          ${styles.sidebar}
          ${collapsed ? styles.collapsed : ""}
          ${isOpen ? styles.open : ""}
        `}
      >
        {/* ===================================
            TOP SECTION
        =================================== */}

        <div className={styles.topSection}>
          <Link href="/admin/dashboard" className={styles.logoWrapper}>
            <div className={styles.logo}>A</div>

            {!collapsed && (
              <div className={styles.brandText}>
                <h2>Admin Panel</h2>
                <p>Plot in Patna</p>
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

        {/* ===================================
            NAVIGATION
        =================================== */}

        <nav className={styles.navigation}>
          {loading && <div className={styles.emptyState}>Loading menu...</div>}

          {!loading && error && (
            <div className={styles.emptyState}>Unable to load menu.</div>
          )}

          {showEmptyState && (
            <div className={styles.emptyState}>No navigation found.</div>
          )}

          {!loading &&
            !error &&
            menuItems.map((item) => {
              const hasChildren = (item.children?.length ?? 0) > 0;

              const isOpenMenu = openMenu === item.label;

              const Icon = item.icon;

              const isParentActive =
                item.path === pathname ||
                item.children?.some((child) => child.path === pathname);

              return (
                <div key={item.label} className={styles.menuGroup}>
                  {!hasChildren ? (
                    <Link
                      href={item.path || "#"}
                      className={`
                        ${styles.navItem}
                        ${isParentActive ? styles.active : ""}
                      `}
                    >
                      <div className={styles.navLeft}>
                        <Icon size={22} />

                        {!collapsed && <span>{item.label}</span>}
                      </div>
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMenu(item.label)}
                        className={`
                          ${styles.navItem}
                          ${isParentActive ? styles.active : ""}
                        `}
                      >
                        <div className={styles.navLeft}>
                          <Icon size={22} />

                          {!collapsed && <span>{item.label}</span>}
                        </div>

                        {!collapsed && (
                          <ChevronDown
                            size={18}
                            className={`
                              ${styles.chevron}
                              ${isOpenMenu ? styles.rotate : ""}
                            `}
                          />
                        )}
                      </button>

                      {!collapsed && (
                        <div
                          className={`
                            ${styles.subMenu}
                            ${isOpenMenu ? styles.subMenuOpen : ""}
                          `}
                        >
                          {item.children?.map((child) => {
                            const isChildActive = pathname === child.path;

                            return (
                              <Link
                                key={child.path}
                                href={child.path}
                                className={`
                                    ${styles.subMenuItem}
                                    ${isChildActive ? styles.activeSubMenu : ""}
                                  `}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
        </nav>

        {/* ===================================
            FOOTER
        =================================== */}

        <div className={styles.bottomSection}>
          <button
            type="button"
            className={styles.collapseButton}
            onClick={onToggleCollapse}
          >
            {collapsed ? (
              <ChevronRight size={18} />
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
