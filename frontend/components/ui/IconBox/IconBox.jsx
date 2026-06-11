// ======================================================
// File: components/ui/IconBox/IconBox.jsx
// Description: Reusable Icon Feature Card
// ======================================================

import styles from "./IconBox.module.css";

export default function IconBox({
  icon,
  title,
  description,
  align = "center",
  variant = "default",
  className = "",
}) {
  return (
    <div
      className={`
        ${styles.box}
        ${styles[variant]}
        ${styles[align]}
        ${className}
      `}
    >
      {icon && <div className={styles.iconWrapper}>{icon}</div>}

      {title && <h3 className={styles.title}>{title}</h3>}

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
