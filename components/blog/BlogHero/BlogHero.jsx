"use client";

// ======================================================
// File: components/blog/BlogHero/BlogHero.jsx
// Description: Blog Hero Section
// UI Match: Bhoomi Sathi Blog Page
// ======================================================

import Image from "next/image";
import styles from "./BlogHero.module.css";

import { Search } from "lucide-react";

// ======================================================
// SAMPLE DATA
// ======================================================

const TOPICS = ["Investment", "Buying Guide", "Home Loan", "Market Trends"];

// ======================================================
// COMPONENT
// ======================================================

export default function BlogHero({
  title = "Real Insights.",
  highlight = "Better Decisions.",
  description = "Expert tips, real estate trends, investment guides and more to help you make smarter property decisions.",

  searchPlaceholder = "Search articles, topics, or keywords...",

  image = "https://images.unsplash.com/photo-1600585154526-990dced4db0?q=80&w=1600&auto=format&fit=crop",

  topics = TOPICS,

  onSearch = () => {},
}) {
  return (
    <section className={styles.hero}>
      {/* BACKGROUND IMAGE */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt="Blog Hero"
          fill
          priority
          className={styles.image}
          unoptimized
        />
      </div>

      {/* DARK OVERLAY */}
      <div className={styles.overlay} />

      {/* CONTENT */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* LABEL */}
          <span className={styles.badge}>Our Blog</span>

          {/* TITLE */}
          <h1 className={styles.title}>
            {title} <span className={styles.highlight}>{highlight}</span>
          </h1>

          {/* DESCRIPTION */}
          <p className={styles.description}>{description}</p>

          {/* SEARCH */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={styles.searchInput}
            />

            <button
              type="button"
              className={styles.searchButton}
              onClick={onSearch}
            >
              <Search size={20} />
            </button>
          </div>

          {/* TOPICS */}
          <div className={styles.topicWrapper}>
            <span className={styles.topicLabel}>Popular Topics:</span>

            <div className={styles.topicList}>
              {topics.map((topic, index) => (
                <button key={index} className={styles.topicButton}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
