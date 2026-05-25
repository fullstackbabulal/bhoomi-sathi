"use client";

import Link from "next/link";
import styles from "./LatestBlog.module.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Locations to Invest in Property in 2024",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0c?auto=format&fit=crop&w=1200&q=80",
    date: "20 May 2024",
    slug: "/blog/top-10-locations-to-invest",
  },
  {
    id: 2,
    title: "Home Buying Guide for First-Time Buyers",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    date: "15 May 2024",
    slug: "/blog/home-buying-guide",
  },
  {
    id: 3,
    title: "Benefits of Investing in Residential Plots",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    date: "10 May 2024",
    slug: "/blog/residential-plot-investment",
  },
];

const LatestBlog = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Latest from Our Blog</h2>
          <p className={styles.subtitle}>
            Explore real estate insights, property tips, and investment
            strategies.
          </p>
        </div>

        <Link href="/blog" className={styles.viewAll}>
          View All Blogs
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className={styles.grid}>
        {blogPosts.map((blog) => (
          <article key={blog.id} className={styles.card}>
            <Link href={blog.slug} className={styles.imageWrapper}>
              <img
                src={blog.image}
                alt={blog.title}
                className={styles.image}
                loading="lazy"
              />
            </Link>

            <div className={styles.content}>
              <span className={styles.date}>{blog.date}</span>

              <Link href={blog.slug} className={styles.blogTitleLink}>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestBlog;
