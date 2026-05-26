"use client";

// ======================================================
// File: components/property/add/PropertyStatusCard.jsx
// Description: Premium Property Status Section
// ======================================================

import {
  ShieldCheck,
  BadgeCheck,
  Star,
  CircleCheckBig,
  Clock3,
  Ban,
} from "lucide-react";

const PropertyStatusCard = ({ formData, updateField }) => {
  const STATUS_OPTIONS = [
    {
      label: "Available",
      value: "available",
      icon: CircleCheckBig,
      description: "Visible for buyers and ready to sell",
    },
    {
      label: "Pending",
      value: "pending",
      icon: Clock3,
      description: "Transaction is in progress",
    },
    {
      label: "Sold",
      value: "sold",
      icon: Ban,
      description: "Property has already been sold",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      {/* =====================================
          HEADER
      ===================================== */}
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-50 text-violet-600">
            <ShieldCheck size={28} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-violet-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
                Section 07
              </span>

              <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
                Listing Status
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Listing Status & Visibility
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure property availability, featured listing visibility and
              verification settings.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className="space-y-8 p-8">
        {/* =====================================
            STATUS SELECTOR
        ===================================== */}
        <div>
          <label className="mb-5 block text-sm font-semibold text-slate-800">
            Property Status
          </label>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {STATUS_OPTIONS.map((item) => {
              const Icon = item.icon;

              const active = formData.status === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateField("status", item.value)}
                  className={`rounded-[28px] border p-5 text-left transition-all duration-200 ${
                    active
                      ? "border-violet-300 bg-violet-50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:border-violet-200 hover:bg-violet-50/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        active
                          ? "bg-violet-600 text-white"
                          : "bg-white text-violet-600"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.label}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================
            FEATURED + VERIFIED
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* FEATURED */}
          <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-100 text-amber-600">
                  <Star size={24} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Featured Listing
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Highlight property on homepage and premium sections.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateField("isFeatured", !formData.isFeatured)}
                className={`relative h-8 w-14 rounded-full transition-all ${
                  formData.isFeatured ? "bg-amber-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${
                    formData.isFeatured ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* VERIFIED */}
          <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">
                  <BadgeCheck size={24} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Verified Property
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Mark this listing as trusted and verified by Bhoomi Sathi.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateField("isVerified", !formData.isVerified)}
                className={`relative h-8 w-14 rounded-full transition-all ${
                  formData.isVerified ? "bg-emerald-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${
                    formData.isVerified ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyStatusCard;
