"use client";

// ======================================================
// File: components/property/add/PropertyProgressCard.jsx
// Description: Premium Property Progress Card
// ======================================================

import { CircleCheckBig, LoaderCircle, TrendingUp } from "lucide-react";

const PropertyProgressCard = ({ progress = 0 }) => {
  const getStatus = () => {
    if (progress >= 90)
      return {
        label: "Ready to Publish",
        color: "text-emerald-700",
        bg: "bg-emerald-100",
      };

    if (progress >= 50)
      return {
        label: "Almost Complete",
        color: "text-amber-700",
        bg: "bg-amber-100",
      };

    return {
      label: "In Progress",
      color: "text-indigo-700",
      bg: "bg-indigo-100",
    };
  };

  const status = getStatus();

  return (
    <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
      {/* =====================================
          HEADER
      ===================================== */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Form Progress</h2>

            <p className="text-sm text-slate-500">Track listing completion</p>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${status.bg} ${status.color}`}
          >
            {progress >= 90 ? (
              <CircleCheckBig size={14} />
            ) : (
              <LoaderCircle size={14} />
            )}

            {status.label}
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className="space-y-6 p-6">
        {/* PROGRESS VALUE */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Completion</p>

            <h3 className="mt-1 text-4xl font-bold text-slate-900">
              {progress}%
            </h3>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-indigo-50 text-indigo-600">
            <TrendingUp size={34} />
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Listing Progress
            </span>

            <span className="text-sm font-semibold text-slate-900">
              {progress}/100
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* CHECKLIST */}
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
          <h4 className="mb-4 text-sm font-semibold text-slate-900">
            Publishing Checklist
          </h4>

          <div className="space-y-3">
            <ChecklistItem
              label="Property Information"
              complete={progress >= 20}
            />

            <ChecklistItem
              label="Property Location"
              complete={progress >= 40}
            />

            <ChecklistItem label="Media Uploaded" complete={progress >= 60} />

            <ChecklistItem label="SEO Optimized" complete={progress >= 80} />

            <ChecklistItem label="Ready to Publish" complete={progress >= 95} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ======================================================
// CHECKLIST ITEM
// ======================================================
const ChecklistItem = ({ label, complete }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          complete
            ? "bg-emerald-100 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        <CircleCheckBig size={16} />
      </div>
    </div>
  );
};

export default PropertyProgressCard;
