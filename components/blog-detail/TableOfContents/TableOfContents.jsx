"use client";

// ======================================================
// File: components/blog-detail/TableOfContents/TableOfContents.jsx
// Description: Blog Table Of Contents
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import { useEffect, useState } from "react";

import styles from "./TableOfContents.module.css";

import { ListTree, ChevronRight } from "lucide-react";

// ======================================================
// COMPONENT
// ======================================================

export default function TableOfContents({
  content = "",
  title = "Table of Contents",
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
  // ACTIVE SECTION OBSERVER
  // ====================================================

  useEffect(() => {
    const elements = document.querySelectorAll("h2[id], h3[id]");

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

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [content]);

  // ====================================================
  // SCROLL HANDLER
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
  // EMPTY STATE
  // ====================================================

  if (!headings.length) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <aside className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <ListTree size={20} />
        </div>

        <h3 className={styles.title}>{title}</h3>
      </div>

      {/* LINKS */}
      <nav className={styles.nav}>
        {headings.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            type="button"
            onClick={() => handleScroll(item.id)}
            className={`${styles.link}
              ${activeId === item.id ? styles.active : ""}
              ${item.level === "h3" ? styles.child : ""}`}
          >
            <ChevronRight size={16} />

            <span>{item.text}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
