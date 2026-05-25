"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";

import styles from "./AdminHeader.module.css";

export default function AdminHeader({
  onMenuClick,

  // Dynamic/API Props
  adminData = null,
  notifications = null,
  searchValue = "",
  onSearch = null,
  loading = false,
  error = null,

  // Optional callbacks
  onProfileClick,
  onSettingsClick,
  onLogout,
}) {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState(searchValue);

  /*
  ===================================
  MOCK / STATIC FALLBACK DATA
  ===================================
  */

  const mockAdminData = {
    name: "Admin",
    role: "Administrator",
    avatar: "A",
  };

  const mockNotifications = [
    {
      id: 1,
      title: "New enquiry received",
      isRead: false,
    },
  ];

  /*
  ===================================
  SAFE DATA
  API → FALLBACK
  ===================================
  */

  const safeAdminData = adminData || mockAdminData;

  const safeNotifications =
    notifications?.length > 0 ? notifications : mockNotifications;

  /*
  ===================================
  DERIVED STATE
  ===================================
  */

  const unreadCount = useMemo(() => {
    return safeNotifications.filter((item) => item?.isRead === false).length;
  }, [safeNotifications]);

  const avatarText = useMemo(() => {
    return (
      safeAdminData?.avatar ||
      safeAdminData?.name?.charAt(0)?.toUpperCase() ||
      "A"
    );
  }, [safeAdminData]);

  /*
  ===================================
  OUTSIDE CLICK
  ===================================
  */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /*
  ===================================
  SEARCH HANDLER
  ===================================
  */

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setInternalSearch(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  /*
  ===================================
  LOGOUT HANDLER
  ===================================
  */

  const handleLogout = async () => {
    try {
      setProfileOpen(false);

      /*
      ===================================
      CUSTOM LOGOUT (AUTH CONTEXT/API)
      ===================================
      */

      if (onLogout) {
        await onLogout();
      }

      /*
      ===================================
      CLEAR LOCAL STORAGE
      ===================================
      */

      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("auth");

      /*
      ===================================
      CLEAR SESSION STORAGE
      ===================================
      */

      sessionStorage.clear();

      /*
      ===================================
      CLEAR COOKIES
      ===================================
      */

      document.cookie.split(";").forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();

        document.cookie = `${cookieName}=;expires=${new Date(
          0,
        ).toUTCString()};path=/`;
      });

      /*
      ===================================
      FORCE REDIRECT TO LOGIN
      ===================================
      */

      router.replace("/login");

      /*
      Hard refresh so protected state resets
      */

      setTimeout(() => {
        window.location.href = "/login";
      }, 50);
    } catch (logoutError) {
      console.error("Logout failed:", logoutError);
    }
  };

  /*
  ===================================
  PROFILE ACTIONS
  ===================================
  */

  const handleProfileClick = () => {
    setProfileOpen(false);

    if (onProfileClick) {
      onProfileClick();
      return;
    }

    router.push("/admin/profile");
  };

  const handleSettingsClick = () => {
    setProfileOpen(false);

    if (onSettingsClick) {
      onSettingsClick();
      return;
    }

    router.push("/admin/settings");
  };

  return (
    <header className={styles.header}>
      {/* LEFT */}
      <div className={styles.leftSection}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div className={styles.searchWrapper}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search properties, agents, enquiries..."
            value={onSearch ? searchValue : internalSearch}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.rightSection}>
        <button
          type="button"
          className={styles.notificationButton}
          aria-label="Notifications"
        >
          <Bell size={20} />

          {!loading && unreadCount > 0 && (
            <span className={styles.notificationDot} />
          )}
        </button>

        <div className={styles.profileWrapper} ref={dropdownRef}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <div className={styles.avatar}>{loading ? "..." : avatarText}</div>

            <div className={styles.profileInfo}>
              <h4>{loading ? "Loading..." : safeAdminData?.name || "Admin"}</h4>

              <p>
                {error ? "Unavailable" : safeAdminData?.role || "Administrator"}
              </p>
            </div>

            <ChevronDown size={18} />
          </button>

          {profileOpen && (
            <div className={styles.dropdown}>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={handleProfileClick}
              >
                <User size={18} />
                Profile
              </button>

              <button
                type="button"
                className={styles.dropdownItem}
                onClick={handleSettingsClick}
              >
                <Settings size={18} />
                Settings
              </button>

              <button
                type="button"
                className={`${styles.dropdownItem} ${styles.logout}`}
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
