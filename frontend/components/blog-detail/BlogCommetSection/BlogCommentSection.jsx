"use client";

// ======================================================
// File: components/blog-detail/BlogCommentSection/BlogCommentSection.jsx
// Description: Blog Comment Section
// ======================================================

import { useEffect, useState } from "react";

import styles from "./BlogCommentSection.module.css";

import { getCommentsBySlug, createComment } from "@/services/comment.service";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogCommentSection({
  blog = {},
  comments: initialComments = [],
}) {
  // ====================================================
  // BLOG SLUG
  // ====================================================

  const slug = blog?.slug || "";

  // ====================================================
  // STATE
  // ====================================================

  const [comments, setComments] = useState(initialComments);

  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  // ====================================================
  // LOAD COMMENTS
  // ====================================================

  const loadComments = async () => {
    try {
      if (!slug) return;

      setLoading(true);
      setError("");

      const response = await getCommentsBySlug(slug);

      setComments(response?.data || []);
    } catch (err) {
      console.error(err);

      setError(err?.message || "Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    if (slug) {
      loadComments();
    }
  }, [slug]);

  // ====================================================
  // CHANGE HANDLER
  // ====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!slug) {
        setError("Blog slug not found.");
        return;
      }

      setSubmitting(true);
      setError("");
      setSuccess("");

      await createComment(slug, {
        name: formData.name,
        email: formData.email,
        content: formData.content,
      });

      setSuccess("Comment submitted successfully.");

      setFormData({
        name: "",
        email: "",
        content: "",
      });

      await loadComments();
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          err?.response?.data?.message ||
          "Failed to submit comment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ====================================================
  // VALIDATION
  // ====================================================

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.content.trim();

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

      {/* ERROR */}

      {error && (
        <div
          style={{
            color: "#dc2626",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div
          style={{
            color: "#16a34a",
            marginBottom: "20px",
          }}
        >
          {success}
        </div>
      )}

      {/* LOADING */}

      {loading ? (
        <div className={styles.emptyState}>
          <p>Loading comments...</p>
        </div>
      ) : comments.length > 0 ? (
        <div className={styles.comments}>
          {comments.map((comment, index) => {
            const author = comment?.user?.name || comment?.name || "Anonymous";

            const avatarLetter = author.charAt(0).toUpperCase();

            return (
              <article key={comment?._id || index} className={styles.comment}>
                <div className={styles.avatar}>{avatarLetter}</div>

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
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Comment</label>

            <textarea
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your comment..."
              className={styles.textarea}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className={styles.submitButton}
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
