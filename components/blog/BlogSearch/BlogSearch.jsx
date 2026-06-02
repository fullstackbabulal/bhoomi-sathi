"use client";

// ======================================================
// File: components/blog/BlogSearch/BlogSearch.jsx
// Description: Blog Search
// UI Match: Bhoomi Sathi Blog Page
// ======================================================

import { useState } from "react";

import styles from "./BlogSearch.module.css";

import { Search, X } from "lucide-react";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogSearch({
  placeholder = "Search blogs, articles, topics...",

  defaultValue = "",

  buttonText = "Search",

  onSearch = () => {},
}) {
  // ====================================================
  // STATE
  // ====================================================

  const [query, setQuery] = useState(defaultValue);

  // ====================================================
  // HANDLERS
  // ====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");

    onSearch("");
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* SEARCH ICON */}
        <div className={styles.icon}>
          <Search size={20} />
        </div>

        {/* INPUT */}
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          className={styles.input}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* CLEAR BUTTON */}
        {query && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        {/* SEARCH BUTTON */}
        <button type="submit" className={styles.button}>
          <Search size={18} />

          <span>{buttonText}</span>
        </button>
      </form>
    </section>
  );
}
