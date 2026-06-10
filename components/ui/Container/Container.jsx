// ======================================================
// File: components/ui/Container/Container.jsx
// Description: Reusable Layout Container
// ======================================================

import styles from "./Container.module.css";

export default function Container({ children, size = "lg", className = "" }) {
  return (
    <div
      className={`
        ${styles.container}
        ${styles[size]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
