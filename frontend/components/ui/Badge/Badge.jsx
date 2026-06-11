// ======================================================
// File: components/ui/Badge/Badge.jsx
// Description: Reusable Badge Component
// ======================================================

import styles from "./Badge.module.css";

export default function Badge({
  children,
  variant = "success",
  size = "md",
  rounded = true,
  className = "",
}) {
  return (
    <span
      className={`
        ${styles.badge}
        ${styles[variant]}
        ${styles[size]}
        ${rounded ? styles.rounded : ""}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
