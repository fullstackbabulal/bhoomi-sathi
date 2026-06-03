"use client";

// ======================================================
// File: AdminSidebar.jsx
// Description: Responsive Admin Sidebar
// ======================================================

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

import styles from "./AdminSidebar.module.css";

import ADMIN_SIDEBAR_CONFIG from "@/utils/AdminSidebarConfig";

export default function AdminSidebar({
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
  OPEN SUBMENU
  Mobile / Tablet Click
  ===================================
  */

  const [openMenu, setOpenMenu] = useState(null);

  /*
  ===================================
  TOGGLE MENU
  ===================================
  */

  const toggleMenu = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  /*
  ===================================
  EMPTY STATE
  ===================================
  */

  const showEmptyState =
    !loading && !error && ADMIN_SIDEBAR_CONFIG.length === 0;

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

          {/* MENU */}
          {!loading &&
            !error &&
            ADMIN_SIDEBAR_CONFIG.map((item) => {
              const hasChildren = item.children?.length > 0;

              const isOpenMenu = openMenu === item.label;

              const Icon = item.icon;

              /*
                ======================
                ACTIVE STATES
                ======================
                */

              const isParentActive =
                item.path === pathname ||
                item.children?.some((child) => child.path === pathname);

              return (
                <div key={item.label} className={styles.menuGroup}>
                  {/* =====================
                        NORMAL LINK
                    ===================== */}
                  {!hasChildren ? (
                    <Link
                      href={item.path}
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
                      {/* =====================
                            PARENT MENU
                        ===================== */}
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

                      {/* =====================
                            SUB MENU
                        ===================== */}
                      {!collapsed && (
                        <div
                          className={`
                              ${styles.subMenu}
                              ${isOpenMenu ? styles.subMenuOpen : ""}
                            `}
                        >
                          {item.children.map((child) => {
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
            BOTTOM
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
