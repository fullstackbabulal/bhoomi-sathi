"use client";

// ======================================================
// File: components/property/add/PropertyStickyFooter.jsx
// Description: Premium Sticky Footer Action Bar
// ======================================================

import { Save, Eye, ArrowRight, Loader2 } from "lucide-react";

const PropertyStickyFooter = ({ loading = false, progress = 0, onSubmit }) => {
  return (
    <div className="sticky bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* =====================================
            LEFT CONTENT
        ===================================== */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900">
              Property Completion
            </h3>

            <span className="rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-700">
              {progress}% Complete
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Complete all required information before publishing your property
            listing.
          </p>

          {/* PROGRESS BAR */}
          <div className="mt-4 h-3 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* =====================================
            ACTION BUTTONS
        ===================================== */}
        <div className="flex flex-wrap items-center gap-3">
          {/* SAVE DRAFT */}
          <button
            type="button"
            className="inline-flex h-14 items-center gap-2 rounded-[22px] border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <Save size={18} />
            Save Draft
          </button>

          {/* PREVIEW */}
          <button
            type="button"
            className="inline-flex h-14 items-center gap-2 rounded-[22px] border border-indigo-200 bg-indigo-50 px-6 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            <Eye size={18} />
            Preview Listing
          </button>

          {/* PUBLISH */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="inline-flex h-14 items-center gap-2 rounded-[22px] bg-gradient-to-r from-indigo-600 to-violet-600 px-7 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                Publish Property
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyStickyFooter;
