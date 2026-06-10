// ======================================================
// File: components/ui/SectionTitle/SectionTitle.jsx
// Description: Reusable Section Heading Component
// ======================================================

import styles from "./SectionTitle.module.css";

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  return (
    <div
      className={`
        ${styles.wrapper}
        ${styles[align]}
        ${className}
      `}
    >
      {badge && <span className={styles.badge}>{badge}</span>}

      {title && <h2 className={styles.title}>{title}</h2>}

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
