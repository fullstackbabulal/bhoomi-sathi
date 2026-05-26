"use client";

// ======================================================
// File: components/property/add/PropertySpecificationCard.jsx
// Description: Premium Property Specification Section
// ======================================================

import {
  Building2,
  IndianRupee,
  BedDouble,
  Bath,
  Ruler,
  LayoutGrid,
} from "lucide-react";

const PropertySpecificationCard = ({
  formData,
  updateField,
  updateNestedField,
}) => {
  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      {/* =====================================
          HEADER
      ===================================== */}
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-50 text-violet-600">
            <Building2 size={28} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-violet-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
                Section 02
              </span>

              <span className="rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold text-sky-700">
                Property Specs
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Property Specifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure pricing, size, bedrooms, bathrooms and property
              measurements.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className="space-y-8 p-8">
        {/* =====================================
            PRICE + STATUS
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* PRICE */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <IndianRupee size={16} className="text-violet-600" />
              Property Price *
            </label>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                ₹
              </span>

              <input
                type="number"
                placeholder="4500000"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 pl-11 pr-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Enter property market price.
            </p>
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <LayoutGrid size={16} className="text-violet-600" />
              Property Status
            </label>

            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            >
              <option value="available">Available</option>

              <option value="pending">Pending</option>

              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        {/* =====================================
            BEDROOM + BATHROOM
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* BEDROOM */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BedDouble size={16} className="text-violet-600" />
              Bedrooms
            </label>

            <input
              type="number"
              min={0}
              value={formData.bedrooms}
              onChange={(e) => updateField("bedrooms", Number(e.target.value))}
              placeholder="3"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {/* BATHROOM */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Bath size={16} className="text-violet-600" />
              Bathrooms
            </label>

            <input
              type="number"
              min={0}
              value={formData.bathrooms}
              onChange={(e) => updateField("bathrooms", Number(e.target.value))}
              placeholder="2"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>
        </div>

        {/* =====================================
            AREA
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* AREA VALUE */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Ruler size={16} className="text-violet-600" />
              Area Size *
            </label>

            <input
              type="number"
              placeholder="1200"
              value={formData.area.value}
              onChange={(e) =>
                updateNestedField("area", "value", e.target.value)
              }
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {/* AREA UNIT */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Ruler size={16} className="text-violet-600" />
              Area Unit
            </label>

            <select
              value={formData.area.unit}
              onChange={(e) =>
                updateNestedField("area", "unit", e.target.value)
              }
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            >
              <option value="sqft">Square Feet (sqft)</option>

              <option value="sqm">Square Meter (sqm)</option>

              <option value="bigha">Bigha</option>

              <option value="acre">Acre</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySpecificationCard;
