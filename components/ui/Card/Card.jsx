// ======================================================
// File: components/ui/Card/Card.jsx
// Description: Reusable Card Component
// ======================================================

import styles from "./Card.module.css";

export default function Card({
  children,
  variant = "default",
  padding = "md",
  hover = true,
  className = "",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        ${styles.card}
        ${styles[variant]}
        ${styles[padding]}
        ${hover ? styles.hover : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
