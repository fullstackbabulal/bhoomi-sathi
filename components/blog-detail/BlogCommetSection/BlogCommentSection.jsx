"use client";

// ======================================================
// File: components/blog-detail/BlogCommentSection/BlogCommentSection.jsx
// Description: Blog Comment Section
// ======================================================

import { useEffect, useMemo, useState } from "react";
import {
  createComment,
  getCommentsBySlug,
  likeComment,
} from "@/services/comment.service";

export default function BlogCommentSection({ slug }) {
  // ======================================================
  // STATE
  // ======================================================

  const [comments, setComments] = useState([]);

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  // ======================================================
  // FETCH COMMENTS
  // ======================================================

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCommentsBySlug(slug);

      setComments(response?.data || []);
    } catch (err) {
      console.error("Comment Fetch Error:", err);

      setError(err?.message || "Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchComments();
    }
  }, [slug]);

  // ======================================================
  // COMMENT COUNT
  // ======================================================

  const totalComments = useMemo(() => {
    const countReplies = (items = []) => {
      return items.reduce((acc, item) => {
        return acc + 1 + countReplies(item.replies);
      }, 0);
    };

    return countReplies(comments);
  }, [comments]);

  // ======================================================
  // ADD COMMENT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return setError("Comment content is required.");
    }

    const optimisticComment = {
      _id: Date.now(),
      content: content.trim(),
      createdAt: new Date(),
      likes: 0,
      replies: [],
      isOptimistic: true,
      user: {
        name: "You",
      },
    };

    try {
      setSubmitting(true);
      setError("");

      // ==================================================
      // OPTIMISTIC UPDATE
      // ==================================================
      setComments((prev) => [optimisticComment, ...prev]);

      setContent("");

      const response = await createComment(slug, {
        content: optimisticComment.content,
      });

      const savedComment = response?.data;

      // Replace optimistic
      setComments((prev) =>
        prev.map((item) =>
          item._id === optimisticComment._id ? savedComment : item,
        ),
      );
    } catch (err) {
      console.error("Comment Submit Error:", err);

      // rollback optimistic update
      setComments((prev) =>
        prev.filter((item) => item._id !== optimisticComment._id),
      );

      setError(err?.message || "Failed to submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  // ======================================================
  // LIKE COMMENT
  // ======================================================

  const handleLike = async (commentId) => {
    try {
      setComments((prev) => updateLike(prev, commentId));

      await likeComment(commentId);
    } catch (likeError) {
      console.error(likeError);
    }
  };

  const updateLike = (items, commentId) => {
    return items.map((item) => {
      if (item._id === commentId) {
        return {
          ...item,
          likes: (item.likes || 0) + 1,
        };
      }

      if (item.replies?.length) {
        return {
          ...item,
          replies: updateLike(item.replies, commentId),
        };
      }

      return item;
    });
  };

  // ======================================================
  // COMMENT ITEM
  // ======================================================

  const CommentItem = ({ comment, level = 0 }) => {
    const author = comment?.user?.name || comment?.name || "Anonymous";

    return (
      <div
        className={`border border-gray-200 rounded-2xl p-5 bg-white ${
          level > 0 ? "ml-8 mt-4" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-semibold text-gray-900">{author}</h4>

            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => handleLike(comment._id)}
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            👍 {comment.likes || 0}
          </button>
        </div>

        <p className="mt-4 text-gray-700 leading-7">{comment.content}</p>

        {/* Replies */}
        {comment.replies?.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply._id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Comments ({totalComments})
        </h2>

        <p className="text-gray-500 mt-2">
          Share your thoughts about this article.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-3xl p-6 mb-8"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          rows={5}
          disabled={submitting}
          className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-green-500"
        />

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* COMMENTS */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 border rounded-3xl bg-gray-50 text-gray-500">
          No comments yet. Be the first to comment.
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </section>
  );
}
