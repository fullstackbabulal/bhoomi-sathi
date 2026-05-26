"use client";

// ======================================================
// File: components/property/add/AddPropertyHeader.jsx
// Description: Premium Add Property Header
// ======================================================

import { Eye, Save, Sparkles, ArrowRight } from "lucide-react";

const AddPropertyHeader = ({ loading, onSubmit }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* =====================================
            LEFT CONTENT
        ===================================== */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
            <Sparkles size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Add New Property
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create and publish a premium property listing for Bhoomi Sathi.
            </p>
          </div>
        </div>

        {/* =====================================
            RIGHT ACTIONS
        ===================================== */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Save Draft */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <Save size={18} />

            <span>Save Draft</span>
          </button>

          {/* Preview */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            <Eye size={18} />

            <span>Preview Listing</span>
          </button>

          {/* Publish */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{loading ? "Publishing..." : "Publish Property"}</span>

            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AddPropertyHeader;
