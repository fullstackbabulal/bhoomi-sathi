"use client";

// ======================================================
// File: components/blog-detail/BlogMetaBar/BlogMetaBar.jsx
// Description: Blog Meta Bar
// UI Match:
// Author • Publish Date • Read Time • Category
// ======================================================

import Image from "next/image";
import { CalendarDays, Clock3, FolderOpen } from "lucide-react";

export default function BlogMetaBar({ blog }) {
  // ======================================================
  // SAFE FALLBACKS
  // ======================================================

  const author = blog?.author || blog?.authorName || {};

  const authorName = author?.name || "Plot in Patna";

  const authorRole = author?.designation || "Founder & CEO, Plot in Patna";

  const authorImage =
    author?.avatar || author?.image || "/images/avatar-placeholder.png";

  const publishDate = blog?.publishedAt || blog?.createdAt;

  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "May 20, 2025";

  const category = blog?.category?.name || blog?.category || "Real Estate";

  const readTime =
    blog?.readTime ||
    `${Math.max(
      1,
      Math.ceil(
        (blog?.content?.replace(/<[^>]*>/g, "") || "").split(/\s+/).length /
          200,
      ),
    )} min read`;

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 py-6">
          {/* AUTHOR */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
              <Image
                src={authorImage}
                alt={authorName}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {authorName}
              </h3>

              <p className="text-sm text-gray-500">{authorRole}</p>
            </div>
          </div>

          {/* META */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600">
            {/* DATE */}
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />

              <span>{formattedDate}</span>
            </div>

            {/* READ TIME */}
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />

              <span>{readTime}</span>
            </div>

            {/* CATEGORY */}
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
              <FolderOpen className="h-4 w-4" />

              <span>{category}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
