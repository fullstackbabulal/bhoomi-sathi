"use client";

import { useEffect, useState } from "react";

import styles from "./Testimonials.module.css";

import { getFeaturedTestimonials } from "@/services/Testimonials.service";

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Property Buyer",
    rating: 5,
    review:
      "Great experience! I found land quickly and the process felt smooth and transparent.",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Investor",
    rating: 5,
    review:
      "Highly professional experience with verified property listings and trusted guidance.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Home Buyer",
    rating: 5,
    review:
      "One of the best platforms for property search. Clean listings and a smooth experience.",
  },
];

function RatingStars({ rating = 5 }) {
  return (
    <div className={styles.rating} aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={styles.star}>
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function Testimonials({
  title = "What Our Clients Say",
  description = "Trusted by buyers, investors, and property seekers across India.",
}) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================================================
  // FETCH TESTIMONIALS
  // ======================================================

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        const response = await getFeaturedTestimonials();

        const apiTestimonials = response?.data || [];

        const normalizedTestimonials = apiTestimonials.map((item) => ({
          id: item._id,
          name: item.name,
          role: item.designation || item.company || "Customer",
          review: item.review,
          rating: item.rating || 5,
          image: item.image || "",
          location: item.location || "",
        }));

        setTestimonials(normalizedTestimonials);
      } catch (error) {
        console.error("Failed to load testimonials:", error);

        setTestimonials(DEFAULT_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const safeTestimonials =
    testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  const hasTestimonials = safeTestimonials.length > 0;

  return (
    <section
      className={styles.testimonialsSection}
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Testimonials</span>

          <h2 id="testimonials-heading" className={styles.title}>
            {title}
          </h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className={styles.emptyState}>
            <p>Loading testimonials...</p>
          </div>
        ) : !hasTestimonials ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>

            <h3 className={styles.emptyTitle}>No Testimonials Yet</h3>

            <p className={styles.emptyDescription}>
              Customer reviews and success stories will appear here soon.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {safeTestimonials.map((testimonial, index) => {
              const { id, name, role, review, rating, image } = testimonial;

              const initials =
                name
                  ?.split(" ")
                  ?.map((word) => word[0])
                  ?.join("")
                  ?.slice(0, 2)
                  ?.toUpperCase() || "U";

              return (
                <article key={id || index} className={styles.card}>
                  <div className={styles.cardContent}>
                    <RatingStars rating={rating} />

                    <blockquote className={styles.review}>
                      “{review || "Great property experience."}”
                    </blockquote>

                    <div className={styles.footer}>
                      <div className={styles.avatarWrapper}>
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className={styles.avatarImage}
                          />
                        ) : (
                          <div className={styles.avatar}>{initials}</div>
                        )}
                      </div>

                      <div className={styles.userInfo}>
                        <h3 className={styles.name}>
                          {name || "Anonymous User"}
                        </h3>

                        <p className={styles.role}>{role || "Customer"}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
