"use client";

// ======================================================
// File: components/blog-detail/BlogPostNavigation/BlogPostNavigation.jsx
// Description: Previous / Next Blog Navigation
// ======================================================

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPostNavigation({ blog }) {
  // ======================================================
  // FALLBACK DATA
  // Replace with API data later
  // ======================================================

  const previousPost = blog?.previousPost || {
    title: "Top 7 Mistakes to Avoid Before Buying Farmland",
    slug: "/blog/top-7-mistakes",
    image: "/images/blog/blog-1.jpg",
  };

  const nextPost = blog?.nextPost || {
    title: "Farmland vs Plots: Which Investment is Better?",
    slug: "/blog/farmland-vs-plots",
    image: "/images/blog/blog-2.jpg",
  };

  // ======================================================
  // CARD
  // ======================================================

  const NavigationCard = ({ type, post }) => {
    const isPrev = type === "previous";

    return (
      <Link
        href={post.slug || "#"}
        className="group flex flex-1 items-center justify-between rounded-3xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-green-300 hover:shadow-md"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {isPrev && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition group-hover:bg-green-100">
              <ChevronLeft className="h-5 w-5 text-gray-700 group-hover:text-green-700" />
            </div>
          )}

          <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              {isPrev ? "Previous Post" : "Next Post"}
            </p>

            <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition group-hover:text-green-700 md:text-base">
              {post.title}
            </h3>
          </div>
        </div>

        {/* RIGHT ICON */}
        {!isPrev && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition group-hover:bg-green-100">
            <ChevronRight className="h-5 w-5 text-gray-700 group-hover:text-green-700" />
          </div>
        )}
      </Link>
    );
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NavigationCard type="previous" post={previousPost} />

        <NavigationCard type="next" post={nextPost} />
      </div>
    </section>
  );
}
