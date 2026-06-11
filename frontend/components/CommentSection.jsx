"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    message: "",
    parent: null,
  });

  const isDisabled = useMemo(
    () => submitting || !form.message.trim(),
    [submitting, form.message],
  );

  const fetchComments = useCallback(async () => {
    if (!blogId || !API_URL) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/comments/${blogId}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();

      setComments(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error(err);

      setError("Unable to load comments.");
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const resetForm = useCallback(() => {
    setForm({
      name: "",
      message: "",
      parent: null,
    });
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const message = form.message.trim();

      if (!message || !blogId) {
        return;
      }

      try {
        setSubmitting(true);

        const response = await fetch(`${API_URL}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blogPost: blogId,
            content: message,
            parent: form.parent,
            name: form.name.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to post comment");
        }

        resetForm();

        await fetchComments();
      } catch (err) {
        console.error(err);

        setError("Failed to submit comment.");
      } finally {
        setSubmitting(false);
      }
    },
    [blogId, fetchComments, form, resetForm],
  );

  const handleLike = useCallback(
    async (commentId) => {
      try {
        await fetch(`${API_URL}/comments/like/${commentId}`, {
          method: "POST",
        });

        await fetchComments();
      } catch (err) {
        console.error(err);
      }
    },
    [fetchComments],
  );

  return (
    <section className="mt-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold mb-2">Comments</h3>

        <p className="text-muted mb-0">
          Share your thoughts and engage in discussion.
        </p>
      </div>

      {/* Error */}
      {error && <div className="alert alert-danger rounded-4">{error}</div>}

      {/* Form */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium">Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                maxLength={50}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Comment</label>

              <textarea
                rows={4}
                required
                className="form-control"
                placeholder="Write your comment..."
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="btn btn-dark rounded-pill px-4"
            >
              {submitting
                ? "Posting..."
                : form.parent
                  ? "Post Reply"
                  : "Post Comment"}
            </button>
          </form>
        </div>
      </div>

      {/* Loading */}
      {loading && <div className="text-muted">Loading comments...</div>}

      {/* Empty State */}
      {!loading && comments.length === 0 && (
        <div className="text-center border rounded-4 bg-light py-5">
          <div className="fs-1 mb-3">💬</div>

          <h5 className="fw-semibold mb-2">No Comments Yet</h5>

          <p className="text-muted mb-0">
            Be the first to start the discussion.
          </p>
        </div>
      )}

      {/* Comments */}
      <div className="d-flex flex-column gap-3">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onReply={(message, parent) =>
              setForm({
                name: "",
                message,
                parent,
              })
            }
            onLike={handleLike}
          />
        ))}
      </div>
    </section>
  );
}

const CommentItem = memo(function CommentItem({
  comment,
  onReply,
  onLike,
  level = 0,
}) {
  const [showReply, setShowReply] = useState(false);

  const [reply, setReply] = useState("");

  const handleReply = useCallback(
    (event) => {
      event.preventDefault();

      const text = reply.trim();

      if (!text) return;

      onReply(text, comment._id);

      setReply("");
      setShowReply(false);
    },
    [comment._id, onReply, reply],
  );

  const replies = Array.isArray(comment?.replies) ? comment.replies : [];

  return (
    <div className={`${level > 0 ? "ms-4" : ""}`}>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <h6 className="fw-bold mb-1">{comment?.name || "Anonymous"}</h6>

              <p className="mb-2 text-muted">{comment?.content}</p>
            </div>

            <button
              className="btn btn-sm btn-outline-danger rounded-pill"
              onClick={() => onLike(comment._id)}
            >
              ❤️ {comment?.likes || 0}
            </button>
          </div>

          <button
            className="btn btn-link btn-sm p-0 text-decoration-none"
            onClick={() => setShowReply((prev) => !prev)}
          >
            Reply
          </button>

          {/* Reply Form */}
          {showReply && (
            <form onSubmit={handleReply} className="mt-3">
              <textarea
                rows={2}
                className="form-control mb-2"
                placeholder="Write a reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              />

              <button className="btn btn-sm btn-dark rounded-pill">
                Add Reply
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mt-3 d-flex flex-column gap-3">
          {replies.map((replyItem) => (
            <CommentItem
              key={replyItem._id}
              comment={replyItem}
              onReply={onReply}
              onLike={onLike}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
});
