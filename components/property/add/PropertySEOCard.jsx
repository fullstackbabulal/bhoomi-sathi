"use client";

// ======================================================
// File: components/property/add/PropertySEOCard.jsx
// Description: Premium SEO & Custom URL Section
// ======================================================

import {
  Search,
  Link2,
  Globe,
  ImageIcon,
  Tags,
  FileText,
  TrendingUp,
} from "lucide-react";

const PropertySEOCard = ({ formData, updateNestedField }) => {
  // ======================================================
  // KEYWORDS HANDLER
  // ======================================================
  const handleKeywordsChange = (value) => {
    const keywords = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateNestedField("seo", "keywords", keywords);
  };

  // ======================================================
  // SEO SCORE
  // ======================================================
  const seoScore = (() => {
    let score = 0;

    if (formData.seo.metaTitle) score += 20;

    if (formData.seo.metaDescription) score += 20;

    if (formData.seo.keywords.length) score += 20;

    if (formData.slug) score += 15;

    if (formData.seo.canonicalUrl) score += 10;

    if (formData.seo.ogImage) score += 15;

    return score;
  })();

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      {/* =====================================
          HEADER
      ===================================== */}
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600">
            <Search size={28} />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-cyan-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700">
                Section 06
              </span>

              <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
                SEO Optimized
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              SEO & Custom URL
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Optimize your listing for Google ranking, social media sharing and
              discoverability.
            </p>
          </div>

          {/* SEO SCORE */}
          <div className="rounded-[28px] border border-cyan-100 bg-cyan-50 px-6 py-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-cyan-600" />

              <div>
                <p className="text-xs font-medium text-slate-500">SEO Score</p>

                <h3 className="text-2xl font-bold text-slate-900">
                  {seoScore}%
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className="space-y-8 p-8">
        {/* =====================================
            META TITLE
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <FileText size={16} className="text-cyan-600" />
            SEO Meta Title
          </label>

          <input
            type="text"
            value={formData.seo.metaTitle}
            onChange={(e) =>
              updateNestedField("seo", "metaTitle", e.target.value)
            }
            placeholder="Luxury Villa in Patna | Buy Premium Property"
            className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />

          <div className="mt-2 flex justify-between text-xs">
            <span className="text-slate-500">
              Recommended: 50–60 characters
            </span>

            <span className="font-medium text-slate-600">
              {formData.seo.metaTitle.length}
              /60
            </span>
          </div>
        </div>

        {/* =====================================
            META DESCRIPTION
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <FileText size={16} className="text-cyan-600" />
            Meta Description
          </label>

          <textarea
            rows={4}
            value={formData.seo.metaDescription}
            onChange={(e) =>
              updateNestedField("seo", "metaDescription", e.target.value)
            }
            placeholder="Luxury villa in Patna with garden, parking, modern amenities and premium location..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-5 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />

          <div className="mt-2 flex justify-between text-xs">
            <span className="text-slate-500">
              Recommended: 150–160 characters
            </span>

            <span className="font-medium text-slate-600">
              {formData.seo.metaDescription.length}
              /160
            </span>
          </div>
        </div>

        {/* =====================================
            KEYWORDS
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Tags size={16} className="text-cyan-600" />
            SEO Keywords
          </label>

          <input
            type="text"
            value={formData.seo.keywords.join(", ")}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            placeholder="villa in patna, luxury house, patna property"
            className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Separate keywords with comma.
          </p>
        </div>

        {/* =====================================
            CANONICAL URL + OG IMAGE
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* CANONICAL */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Globe size={16} className="text-cyan-600" />
              Canonical URL
            </label>

            <div className="relative">
              <Link2
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={formData.seo.canonicalUrl}
                onChange={(e) =>
                  updateNestedField("seo", "canonicalUrl", e.target.value)
                }
                placeholder="https://bhoomisathi.com/property/luxury-villa-patna"
                className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 pl-11 pr-5 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
            </div>
          </div>

          {/* OG IMAGE */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <ImageIcon size={16} className="text-cyan-600" />
              OG Image URL
            </label>

            <input
              type="text"
              value={formData.seo.ogImage}
              onChange={(e) =>
                updateNestedField("seo", "ogImage", e.target.value)
              }
              placeholder="https://cdn.example.com/og-image.jpg"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </div>
        </div>

        {/* =====================================
            SEO PREVIEW
        ===================================== */}
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
          <p className="mb-4 text-sm font-semibold text-slate-800">
            Google Search Preview
          </p>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="truncate text-xs text-emerald-700">
              {formData.seo.canonicalUrl ||
                `https://bhoomisathi.com/property/${formData.slug}`}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-blue-700">
              {formData.seo.metaTitle ||
                formData.title ||
                "Your Property Title"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {formData.seo.metaDescription ||
                formData.overview ||
                "Your property description preview will appear here."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySEOCard;
