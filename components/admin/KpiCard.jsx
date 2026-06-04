"use client";

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

export default function KpiCard({
  data = null,

  // Optional direct props (backward compatibility)
  label,
  value,
  change,
  icon,

  loading = false,
  error = null,
}) {
  /*
  ===================================
  MOCK / STATIC FALLBACK
  ===================================
  */

  const mockData = {
    label: "Total Properties",
    value: 120,
    change: "+12%",
    icon: "building",
  };

  /*
  ===================================
  SAFE DATA
  API → STATIC FALLBACK
  ===================================
  */

  const safeData = data || {
    label,
    value,
    change,
    icon,
  };

  const finalData =
    safeData?.label || safeData?.value || safeData?.change
      ? safeData
      : mockData;

  /*
  ===================================
  ICON MAPPER
  ===================================
  */

  const iconMap = {
    building: Building2,
    users: Users,
    mail: Mail,
    blog: FileText,
    analytics: Activity,
  };

  const IconComponent = iconMap[finalData?.icon] || Building2;

  /*
  ===================================
  FORMATTERS
  ===================================
  */

  const formatValue = (val) => {
    if (val === null || val === undefined || val === "") {
      return "0";
    }

    if (typeof val === "number") {
      return new Intl.NumberFormat("en-IN").format(val);
    }

    return val;
  };

  /*
  ===================================
  CHANGE STATE
  ===================================
  */

  const safeChange = finalData?.change || "0%";

  const isNegative = safeChange.toString().startsWith("-");

  const TrendIcon = isNegative ? ArrowDownRight : ArrowUpRight;

  /*
  ===================================
  LOADING STATE
  ===================================
  */

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

  /*
  ===================================
  ERROR SAFE
  ===================================
  */

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
