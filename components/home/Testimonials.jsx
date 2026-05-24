/* frontend/components/home/Testimonials.jsx */

"use client";

import styles from "./Testimonials.module.css";

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
        <span key={index} className={styles.star} aria-hidden="true">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function Testimonials({
  testimonials = [],
  title = "What Our Clients Say",
  description = "Trusted by buyers, investors, and property seekers across India.",
}) {
  const safeTestimonials =
    Array.isArray(testimonials) && testimonials.length > 0
      ? testimonials.filter(Boolean)
      : DEFAULT_TESTIMONIALS;

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

        {/* Empty State */}
        {!hasTestimonials ? (
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
                    {/* Rating */}
                    <RatingStars rating={rating} />

                    {/* Review */}
                    <blockquote className={styles.review}>
                      “{review || "Great property experience."}”
                    </blockquote>

                    {/* Footer */}
                    <div className={styles.footer}>
                      {/* Avatar */}
                      <div className={styles.avatarWrapper}>
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className={styles.avatarImage}
                          />
                        ) : (
                          <div className={styles.avatar} aria-hidden="true">
                            {initials}
                          </div>
                        )}
                      </div>

                      {/* User Info */}
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
