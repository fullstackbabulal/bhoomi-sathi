"use client";

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

export default function QuickAction({
  data = null,

  // Backward compatibility props
  title,
  description,
  href,
  icon,
  variant,

  loading = false,
  error = null,
}) {
  /*
  ===================================
  MOCK / STATIC FALLBACK
  ===================================
  */

  const mockData = {
    title: "Add Property",
    description: "Create and publish a new property listing",
    href: "/admin/properties/new",
    icon: "property",
    variant: "blue",
  };

  /*
  ===================================
  SAFE DATA
  API → STATIC FALLBACK
  ===================================
  */

  const safeData = data || {
    title,
    description,
    href,
    icon,
    variant,
  };

  const finalData =
    safeData?.title || safeData?.description ? safeData : mockData;

  /*
  ===================================
  ICON MAP
  ===================================
  */

  const iconMap = {
    property: Building2,
    agent: Users,
    enquiry: Mail,
    blog: FileText,
    settings: Settings,
    user: UserPlus,
    add: PlusCircle,
  };

  const IconComponent = iconMap[finalData?.icon] || PlusCircle;

  /*
  ===================================
  SAFE VALUES
  ===================================
  */

  const safeHref = finalData?.href || "/admin/dashboard";

  const safeVariant = finalData?.variant || "blue";

  /*
  ===================================
  LOADING STATE
  ===================================
  */

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

  /*
  ===================================
  ERROR STATE
  ===================================
  */

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

  return (
    <Link
      href={safeHref}
      className={`
        ${styles.card}
        ${styles[safeVariant] || styles.blue}
      `}
    >
      {/* ICON */}
      <div className={styles.iconWrapper}>
        <IconComponent size={22} />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <h4>{finalData?.title || "Quick Action"}</h4>

        <p>{finalData?.description || "No description available"}</p>
      </div>

      {/* ARROW */}
      <div className={styles.arrow}>
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}
