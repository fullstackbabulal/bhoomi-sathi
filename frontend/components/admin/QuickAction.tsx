"use client";

// ======================================================
// File: components/admin/dashboard/QuickAction.tsx
// Description: Dashboard Quick Action Card
// ======================================================

import Link from "next/link";

import {
  ArrowRight,
  Building2,
  FileText,
  Mail,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";

import styles from "./QuickAction.module.css";

// ======================================================
// TYPES
// ======================================================

export interface QuickActionItem {
  title?: string;
  description?: string;
  href?: string;
  icon?: string;
  variant?: string;
}

interface QuickActionProps {
  data?: QuickActionItem | null;

  // Backward compatibility
  title?: string;
  description?: string;
  href?: string;
  icon?: string;
  variant?: string;

  loading?: boolean;
  error?: string | null;
}

// ======================================================
// COMPONENT
// ======================================================

export default function QuickAction({
  data = null,

  title,
  description,
  href,
  icon,
  variant,

  loading = false,
  error = null,
}: QuickActionProps) {
  // ====================================================
  // FALLBACK DATA
  // ====================================================

  const mockData: QuickActionItem = {
    title: "Add Property",
    description: "Create and publish a new property listing",
    href: "/admin/properties/add",
    icon: "property",
    variant: "blue",
  };

  // ====================================================
  // SAFE DATA
  // ====================================================

  const safeData: QuickActionItem = data || {
    title,
    description,
    href,
    icon,
    variant,
  };

  const finalData =
    safeData?.title || safeData?.description ? safeData : mockData;

  // ====================================================
  // ICON MAP
  // ====================================================

  const iconMap = {
    property: Building2,
    agent: Users,
    enquiry: Mail,
    blog: FileText,
    settings: Settings,
    user: UserPlus,
    add: PlusCircle,
  };

  const IconComponent =
    iconMap[(finalData?.icon || "add") as keyof typeof iconMap] || PlusCircle;

  // ====================================================
  // SAFE VALUES
  // ====================================================

  const safeHref = finalData?.href || "/admin/dashboard";

  const safeVariant = finalData?.variant || "blue";

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className={`${styles.card} ${styles.blue}`}>
        <div className={styles.iconWrapper}>
          <PlusCircle size={22} />
        </div>

        <div className={styles.content}>
          <h4>Loading...</h4>

          <p>Preparing quick action</p>
        </div>

        <div className={styles.arrow}>
          <ArrowRight size={18} />
        </div>
      </div>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (error) {
    return (
      <div className={`${styles.card} ${styles.red}`}>
        <div className={styles.iconWrapper}>
          <Settings size={22} />
        </div>

        <div className={styles.content}>
          <h4>Unavailable</h4>

          <p>Quick action unavailable</p>
        </div>
      </div>
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <Link
      href={safeHref}
      className={`${styles.card} ${
        styles[safeVariant as keyof typeof styles] || styles.blue
      }`}
    >
      <div className={styles.iconWrapper}>
        <IconComponent size={22} />
      </div>

      <div className={styles.content}>
        <h4>{finalData?.title || "Quick Action"}</h4>

        <p>{finalData?.description || "No description available"}</p>
      </div>

      <div className={styles.arrow}>
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}
