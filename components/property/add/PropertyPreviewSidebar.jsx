"use client";

// ======================================================
// File: components/property/add/PropertyPreviewSidebar.jsx
// Description: Premium Live Property Preview Sidebar
// ======================================================

import {
  BedDouble,
  Bath,
  MapPin,
  IndianRupee,
  Star,
  BadgeCheck,
  Building2,
  ImageIcon,
} from "lucide-react";

const PropertyPreviewSidebar = ({ formData }) => {
  const formatPrice = (price) => {
    if (!price) return "₹ 0";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <aside className="space-y-6">
      {/* =====================================
          LIVE PREVIEW CARD
      ===================================== */}
      <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Live Preview</h2>

              <p className="text-sm text-slate-500">
                Real-time listing preview
              </p>
            </div>

            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
              {formData.status}
            </span>
          </div>
        </div>

        {/* THUMBNAIL */}
        <div className="relative h-[280px] overflow-hidden bg-slate-100">
          {formData.thumbnail ? (
            <img
              src={formData.thumbnail}
              alt="Property"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-slate-400">
              <div className="flex h-20 w-20 items-center justify-center rounded-[30px] bg-slate-200">
                <ImageIcon size={36} />
              </div>

              <p className="text-sm font-medium">Thumbnail Preview</p>
            </div>
          )}

          {/* FEATURED */}
          {formData.isFeatured && (
            <div className="absolute left-5 top-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                <Star size={14} />
                Featured
              </span>
            </div>
          )}

          {/* VERIFIED */}
          {formData.isVerified && (
            <div className="absolute right-5 top-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                <BadgeCheck size={14} />
                Verified
              </span>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="space-y-6 p-6">
          {/* TITLE */}
          <div>
            <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-slate-900">
              {formData.title || "Luxury Villa in Patna"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {formData.overview ||
                "Your property overview preview will appear here."}
            </p>
          </div>

          {/* PRICE */}
          <div className="rounded-[28px] bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <IndianRupee size={22} />

              <div>
                <p className="text-xs uppercase tracking-wider text-indigo-100">
                  Property Price
                </p>

                <h3 className="text-3xl font-bold">
                  {formatPrice(formData.price)}
                </h3>
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex items-start gap-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-500">
              <MapPin size={20} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">
                Property Location
              </h4>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {formData.location.address || "Property address"}
                {formData.location.city && `, ${formData.location.city}`}
                {formData.location.state && `, ${formData.location.state}`}
              </p>
            </div>
          </div>

          {/* PROPERTY INFO */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <BedDouble size={20} />
              </div>

              <h4 className="mt-3 text-xl font-bold text-slate-900">
                {formData.bedrooms}
              </h4>

              <p className="text-xs text-slate-500">Bedrooms</p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Bath size={20} />
              </div>

              <h4 className="mt-3 text-xl font-bold text-slate-900">
                {formData.bathrooms}
              </h4>

              <p className="text-xs text-slate-500">Bathrooms</p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <Building2 size={20} />
              </div>

              <h4 className="mt-3 text-lg font-bold text-slate-900">
                {formData.area.value || 0}
              </h4>

              <p className="text-xs text-slate-500">{formData.area.unit}</p>
            </div>
          </div>

          {/* AMENITIES */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Amenities</h4>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {formData.amenities.length}
              </span>
            </div>

            {formData.amenities.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">
                No amenities selected
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default PropertyPreviewSidebar;
