"use client";

// ======================================================
// File: components/admin/AdminHeader.tsx
// Description: Admin Header
// ======================================================

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

// ======================================================
// TYPES
// ======================================================

export interface NotificationItem {
  id: string | number;
  title: string;
  isRead?: boolean;
}

export interface AdminData {
  name?: string;
  role?: string;
  avatar?: string;
}

interface AdminHeaderProps {
  onMenuClick?: () => void;

  // Dynamic/API Props
  adminData?: AdminData | null;
  notifications?: NotificationItem[] | null;

  searchValue?: string;
  onSearch?: ((value: string) => void) | null;

  loading?: boolean;
  error?: string | null;

  // Optional callbacks
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => Promise<void> | void;
}

// ======================================================
// COMPONENT
// ======================================================

export default function AdminHeader({
  onMenuClick,

  adminData = null,
  notifications = null,
  searchValue = "",
  onSearch = null,
  loading = false,
  error = null,

  onProfileClick,
  onSettingsClick,
  onLogout,
}: AdminHeaderProps) {
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState<string>(searchValue);

  // ====================================================
  // MOCK / FALLBACK DATA
  // ====================================================

  const mockAdminData: AdminData = {
    name: "Admin",
    role: "Administrator",
    avatar: "A",
  };

  const mockNotifications: NotificationItem[] = [
    {
      id: 1,
      title: "New enquiry received",
      isRead: false,
    },
  ];

  // ====================================================
  // SAFE DATA
  // ====================================================

  const safeAdminData: AdminData = adminData || mockAdminData;

  const safeNotifications: NotificationItem[] =
    notifications && notifications.length > 0
      ? notifications
      : mockNotifications;

  // ====================================================
  // DERIVED DATA
  // ====================================================

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

  // ====================================================
  // OUTSIDE CLICK
  // ====================================================

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ====================================================
  // SEARCH
  // ====================================================

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInternalSearch(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = async () => {
    try {
      setProfileOpen(false);

      if (onLogout) {
        await onLogout();
      }

      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("auth");

      sessionStorage.clear();

      document.cookie.split(";").forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();

        document.cookie = `${cookieName}=;expires=${new Date(
          0,
        ).toUTCString()};path=/`;
      });

      router.replace("/login");

      setTimeout(() => {
        window.location.href = "/login";
      }, 50);
    } catch (logoutError) {
      console.error("Logout failed:", logoutError);
    }
  };

  // ====================================================
  // PROFILE ACTIONS
  // ====================================================

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

  // ====================================================
  // RENDER
  // ====================================================

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
