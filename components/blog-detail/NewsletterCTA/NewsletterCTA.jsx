"use client";

// ======================================================
// File: components/blog-detail/NewsletterCTA/NewsletterCTA.jsx
// Description: Newsletter CTA Section
// UI Match:
// Blog detail bottom newsletter subscribe card
// ======================================================

import { Mail } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <section className="mt-16 mb-20">
      <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-green-950 via-green-900 to-green-800 px-6 py-8 shadow-xl md:px-10 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <Mail className="h-8 w-8 text-white" />
            </div>

            <div>
              <h2 className="max-w-md text-2xl font-bold leading-tight text-white md:text-3xl">
                Stay Updated with
                <br />
                Latest Insights
              </h2>

              <p className="mt-3 text-sm text-green-100 md:text-base">
                Subscribe to our newsletter and never miss an update about
                farmland, investment trends, and real estate opportunities.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <form
            className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="h-14 flex-1 rounded-2xl border border-white/20 bg-white px-5 text-gray-900 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-500/20"
            />

            <button
              type="submit"
              className="h-14 rounded-2xl bg-green-600 px-8 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
