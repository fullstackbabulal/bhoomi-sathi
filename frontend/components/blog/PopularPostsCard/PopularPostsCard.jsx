"use client";

// ======================================================
// File: components/blog/PopularPostsCard/PopularPostsCard.jsx
// Description: Popular Posts Sidebar Card
// UI Match: Plot in Patna Blog Page
// ======================================================

import Image from "next/image";
import Link from "next/link";
import styles from "./PopularPostsCard.module.css";

import { CalendarDays, ArrowUpRight } from "lucide-react";

// ======================================================
// SAMPLE DATA
// ======================================================

const DEFAULT_POSTS = [
  {
    id: 1,
    slug: "why-real-estate-is-a-smart-investment",

    title: "Why Real Estate is a Smart Investment",

    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",

    date: "May 30, 2026",
  },

  {
    id: 2,
    slug: "property-buying-guide",

    title: "Top Things to Check Before Buying Property",

    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0?q=80&w=1200&auto=format&fit=crop",

    date: "May 26, 2026",
  },

  {
    id: 3,
    slug: "home-loan-guide",

    title: "Home Loan Guide for First-Time Buyers",

    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",

    date: "May 20, 2026",
  },

  {
    id: 4,
    slug: "luxury-property-guide",

    title: "Luxury Property Buying Guide",

    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",

    date: "May 15, 2026",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function PopularPostsCard({
  title = "Popular Posts",

  posts = DEFAULT_POSTS,
}) {
  return (
    <div className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {/* POSTS */}
      <div className={styles.list}>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={styles.post}
          >
            {/* IMAGE */}
            <div className={styles.imageWrapper}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={styles.image}
                unoptimized
              />
            </div>

            {/* CONTENT */}
            <div className={styles.content}>
              {/* DATE */}
              <div className={styles.date}>
                <CalendarDays size={14} />

                <span>{post.date}</span>
              </div>

              {/* TITLE */}
              <h4 className={styles.postTitle}>{post.title}</h4>

              {/* LINK */}
              <span className={styles.readMore}>
                Read More
                <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
