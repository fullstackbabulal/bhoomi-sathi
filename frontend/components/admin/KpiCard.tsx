"use client";

// ======================================================
// File: components/admin/dashboard/KpiCard.tsx
// Description: KPI Statistics Card
// ======================================================

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  FileText,
  Mail,
  Users,
} from "lucide-react";

import styles from "./KpiCard.module.css";

// ======================================================
// TYPES
// ======================================================

export type KpiIconType =
  | "building"
  | "users"
  | "mail"
  | "blog"
  | "analytics"
  | string;

export interface KpiData {
  label?: string;
  value?: string | number;
  change?: string;
  icon?: string;
}

interface KpiCardProps {
  data?: KpiData | null;

  // Backward compatibility
  label?: string;
  value?: string | number;
  change?: string;
  icon?: KpiIconType;

  loading?: boolean;
  error?: string | null;
}

// ======================================================
// COMPONENT
// ======================================================

export default function KpiCard({
  data = null,

  label,
  value,
  change,
  icon,

  loading = false,
  error = null,
}: KpiCardProps) {
  // ====================================================
  // FALLBACK DATA
  // ====================================================

  const mockData: KpiData = {
    label: "Total Properties",
    value: 120,
    change: "+12%",
    icon: "building",
  };

  // ====================================================
  // SAFE DATA
  // ====================================================

  const safeData: KpiData =
    data ||
    ({
      label,
      value,
      change,
      icon,
    } as KpiData);

  const finalData =
    safeData?.label || safeData?.value || safeData?.change
      ? safeData
      : mockData;

  // ====================================================
  // ICONS
  // ====================================================

  const iconMap = {
    building: Building2,
    users: Users,
    mail: Mail,
    blog: FileText,
    analytics: Activity,
  };

  const IconComponent =
    iconMap[(finalData?.icon || "building") as keyof typeof iconMap] ||
    Building2;

  // ====================================================
  // HELPERS
  // ====================================================

  const formatValue = (val: string | number | undefined) => {
    if (val === null || val === undefined || val === "") {
      return "0";
    }

    if (typeof val === "number") {
      return new Intl.NumberFormat("en-IN").format(val);
    }

    return val;
  };

  const safeChange = finalData?.change || "0%";

  const isNegative = safeChange.startsWith("-");

  const TrendIcon = isNegative ? ArrowDownRight : ArrowUpRight;

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.iconWrapper}>
            <Activity size={24} />
          </div>

          <div className={styles.content}>
            <p className={styles.label}>Loading...</p>

            <h3 className={styles.value}>--</h3>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (error) {
    return (
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.iconWrapper}>
            <Activity size={24} />
          </div>

          <div className={styles.content}>
            <p className={styles.label}>Data unavailable</p>

            <h3 className={styles.value}>--</h3>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconWrapper}>
          <IconComponent size={26} />
        </div>

        <div className={styles.content}>
          <p className={styles.label}>{finalData?.label || "Untitled KPI"}</p>

          <h3 className={styles.value}>{formatValue(finalData?.value)}</h3>

          <div
            className={`${styles.change} ${
              isNegative ? styles.down : styles.up
            }`}
          >
            <TrendIcon size={16} />

            <span>{safeChange}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
