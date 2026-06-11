"use client";

// ======================================================
// File: components/blog-detail/TableOfContents/TableOfContents.jsx
// Description: Blog Table Of Contents
// UI Match: Plot in Patna Blog Detail Page
// ======================================================

import { useEffect, useState } from "react";

import styles from "./TableOfContents.module.css";

// ======================================================
// COMPONENT
// ======================================================

export default function TableOfContents({
  content = "",
  title = "On This Page",
}) {
  const [headings, setHeadings] = useState([]);

  const [activeId, setActiveId] = useState("");

  // ====================================================
  // EXTRACT HEADINGS
  // ====================================================

  useEffect(() => {
    const parser = new DOMParser();

    const doc = parser.parseFromString(content, "text/html");

    const elements = Array.from(doc.querySelectorAll("h2, h3"));

    const formatted = elements.map((heading, index) => {
      const text = heading.textContent?.trim() || `Section ${index + 1}`;

      const level = heading.tagName.toLowerCase();

      const id = heading.id || text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      return {
        id,
        text,
        level,
      };
    });

    setHeadings(formatted);
  }, [content]);

  // ====================================================
  // ACTIVE SECTION
  // ====================================================

  useEffect(() => {
    const sections = document.querySelectorAll("h2[id], h3[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [content]);

  // ====================================================
  // SCROLL
  // ====================================================

  const handleScroll = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    window.scrollTo({
      top: element.offsetTop - 120,
      behavior: "smooth",
    });
  };

  // ====================================================
  // EMPTY
  // ====================================================

  if (!headings.length) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <aside className={styles.card}>
      <h3 className={styles.title}>{title}</h3>

      <nav className={styles.nav}>
        {headings.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            type="button"
            onClick={() => handleScroll(item.id)}
            className={`
              ${styles.link}
              ${activeId === item.id ? styles.active : ""}
              ${item.level === "h3" ? styles.child : ""}
            `}
          >
            <span className={styles.dot} />

            <span>{item.text}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
