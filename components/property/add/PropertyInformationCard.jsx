"use client";

// ======================================================
// File: components/property/add/PropertyInformationCard.jsx
// Description: Premium Property Information Section
// ======================================================

import { FileText, Link2, Type, AlignLeft, BadgeInfo } from "lucide-react";

const PropertyInformationCard = ({ formData, updateField }) => {
  // ======================================================
  // AUTO SLUG GENERATOR
  // ======================================================
  const handleTitleChange = (value) => {
    updateField("title", value);

    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    updateField("slug", slug);
  };

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      {/* =====================================
          HEADER
      ===================================== */}
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <FileText size={28} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-indigo-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
                Section 01
              </span>

              <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
                Required
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Property Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your property details, title, description and custom listing
              URL.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className="space-y-8 p-8">
        {/* =====================================
            PROPERTY TITLE
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Type size={16} className="text-indigo-600" />
            Property Title *
          </label>

          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Luxury Villa in Patna with Garden"
            className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Use a descriptive SEO-friendly title.
          </p>
        </div>

        {/* =====================================
            CUSTOM URL + TYPE
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* SLUG */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Link2 size={16} className="text-indigo-600" />
              Custom URL Slug
            </label>

            <div className="overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
              <div className="flex items-center">
                <span className="border-r border-slate-200 bg-slate-100 px-4 py-4 text-sm text-slate-500">
                  bhoomisathi.com/property/
                </span>

                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="luxury-villa-patna"
                  className="h-14 flex-1 bg-transparent px-4 text-sm outline-none"
                />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              SEO-friendly custom listing URL.
            </p>
          </div>

          {/* TYPE */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BadgeInfo size={16} className="text-indigo-600" />
              Property Type *
            </label>

            <select
              value={formData.type}
              onChange={(e) => updateField("type", e.target.value)}
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option value="plot">Plot</option>

              <option value="apartment">Apartment</option>

              <option value="house">House</option>

              <option value="villa">Villa</option>

              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>

        {/* =====================================
            OVERVIEW
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <AlignLeft size={16} className="text-indigo-600" />
            Overview *
          </label>

          <textarea
            rows={4}
            value={formData.overview}
            onChange={(e) => updateField("overview", e.target.value)}
            placeholder="Short summary of property that appears in cards and previews..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Short description for cards, previews and SEO snippets.
          </p>
        </div>

        {/* =====================================
            DESCRIPTION
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <FileText size={16} className="text-indigo-600" />
            Full Description *
          </label>

          <textarea
            rows={8}
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Write complete property details, amenities, locality advantages, investment benefits, nearby places etc..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Detailed content improves conversions and search ranking.
            </p>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {formData.description.length} characters
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyInformationCard;
