"use client";

// ======================================================
// File: components/blog-detail/BlogCommentSection/BlogCommentSection.jsx
// Description: Blog Comment Section
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import { useState } from "react";

import styles from "./BlogCommentSection.module.css";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogCommentSection({ comments = [] }) {
  // ====================================================
  // STATE
  // ====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  // ====================================================
  // HANDLERS
  // ====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Comment Submitted:", formData);

    setFormData({
      name: "",
      email: "",
      comment: "",
    });
  };

  // ====================================================
  // VALIDATION
  // ====================================================

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.comment.trim();

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      {/* HEADER */}

      <div className={styles.header}>
        <h2 className={styles.heading}>
          {comments.length} Comment
          {comments.length !== 1 ? "s" : ""}
        </h2>

        <p className={styles.subtitle}>
          Share your thoughts and engage in the discussion.
        </p>
      </div>

      {/* COMMENTS */}

      {comments.length > 0 ? (
        <div className={styles.comments}>
          {comments.map((comment, index) => {
            const author = comment?.user?.name || comment?.name || "Anonymous";

            const avatarLetter = author.charAt(0).toUpperCase();

            return (
              <article key={comment._id || index} className={styles.comment}>
                {/* AVATAR */}

                <div className={styles.avatar}>{avatarLetter}</div>

                {/* BODY */}

                <div className={styles.body}>
                  <div className={styles.top}>
                    <div className={styles.authorInfo}>
                      <h4 className={styles.author}>{author}</h4>

                      <span className={styles.date}>
                        {comment?.createdAt
                          ? new Date(comment.createdAt).toLocaleDateString()
                          : "Recently"}
                      </span>
                    </div>

                    <button type="button" className={styles.reply}>
                      Reply
                    </button>
                  </div>

                  <p className={styles.text}>{comment?.content || ""}</p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h4>No Comments Yet</h4>

          <p>Be the first person to share your thoughts on this article.</p>
        </div>
      )}

      {/* FORM */}

      <div className={styles.formCard}>
        <h3 className={styles.formTitle}>Leave a Comment</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* ROW */}

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          {/* COMMENT */}

          <div className={styles.field}>
            <label className={styles.label}>Comment</label>

            <textarea
              name="comment"
              placeholder="Write your comment..."
              value={formData.comment}
              onChange={handleChange}
              rows={6}
              className={styles.textarea}
            />
          </div>

          {/* ACTIONS */}

          <div className={styles.actions}>
            <button
              type="submit"
              disabled={!isFormValid}
              className={styles.submitButton}
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
