"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    message: "",
    parent: null,
  });

  // 🔷 Fetch Comments
  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/comments/${blogId}`);
      const data = await res.json();
      setComments(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 🔷 Submit Comment / Reply
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.message) return;

    try {
      setLoading(true);

      await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogPost: blogId,
          content: form.message,
          parent: form.parent,
          name: form.name,
        }),
      });

      // Reset form
      setForm({ name: "", message: "", parent: null });

      await fetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔷 Like Comment
  const handleLike = async (id) => {
    await fetch(`${API_URL}/comments/like/${id}`, {
      method: "POST",
    });

    fetchComments();
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">💬 Comments</h4>

      {/* 🔷 Main Comment Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="form-control mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Write your comment..."
          className="form-control mb-2"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        <button className="btn btn-dark" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* 🔷 Comments List */}
      {loading && <p>Loading comments...</p>}

      {!loading && comments.length === 0 && (
        <p>No comments yet. Be the first!</p>
      )}

      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          setForm={setForm}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}

// ==========================================
// 🔷 COMMENT ITEM (Recursive)
// ==========================================
function CommentItem({ comment, setForm, onLike }) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  const handleReply = (e) => {
    e.preventDefault();

    setForm({
      name: "",
      message: reply,
      parent: comment._id,
    });

    setReply("");
    setShowReply(false);
  };

  return (
    <div className="mb-3 border-start ps-3">
      {/* 🔷 Comment Content */}
      <div className="bg-light p-2 rounded">
        <strong>{comment.name || "User"}</strong>
        <p className="mb-1">{comment.content}</p>

        <div className="d-flex gap-3">
          {/* Reply */}
          <button
            className="btn btn-sm btn-link"
            onClick={() => setShowReply(!showReply)}
          >
            Reply
          </button>

          {/* Like */}
          <button
            className="btn btn-sm btn-link text-danger"
            onClick={() => onLike(comment._id)}
          >
            ❤️ {comment.likes || 0}
          </button>
        </div>
      </div>

      {/* 🔷 Reply Box */}
      {showReply && (
        <form onSubmit={handleReply} className="mt-2">
          <textarea
            className="form-control mb-2"
            rows={2}
            placeholder="Write reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            required
          />

          <button className="btn btn-sm btn-dark">Reply</button>
        </form>
      )}

      {/* 🔷 Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-2 ms-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              setForm={setForm}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
