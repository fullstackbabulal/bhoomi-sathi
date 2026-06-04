"use client";

// ======================================================
// File: admin/blogs/all/BlogStats/BlogStats.jsx
// Description: Blog Statistics Overview
// ======================================================

import { FiFileText, FiCheckCircle, FiEdit3, FiArchive } from "react-icons/fi";

import BlogStatCard from "./BlogStatCard";

import styles from "./BlogStats.module.css";

export default function BlogStats({ stats = {} }) {
  const { total = 0, published = 0, draft = 0, archived = 0 } = stats;

  const statItems = [
    {
      title: "Total Blogs",
      value: total,
      description: "All blog posts",
      icon: <FiFileText />,
    },
    {
      title: "Published",
      value: published,
      description: "Live blog posts",
      icon: <FiCheckCircle />,
    },
    {
      title: "Draft",
      value: draft,
      description: "Pending publication",
      icon: <FiEdit3 />,
    },
    {
      title: "Archived",
      value: archived,
      description: "Archived blog posts",
      icon: <FiArchive />,
    },
  ];

  return (
    <section className={styles.statsGrid} aria-label="Blog Statistics">
      {statItems.map((item) => (
        <BlogStatCard
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </section>
  );
}
