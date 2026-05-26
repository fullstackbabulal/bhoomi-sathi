"use client";

// ======================================================
// File: components/property/add/PropertyAmenitiesCard.jsx
// Description: Premium Property Amenities Section
// ======================================================

import {
  Sparkles,
  Wifi,
  Car,
  Shield,
  Dumbbell,
  Trees,
  Waves,
  Building2,
  Plus,
  X,
} from "lucide-react";

const DEFAULT_AMENITIES = [
  {
    label: "Parking",
    icon: Car,
  },
  {
    label: "WiFi",
    icon: Wifi,
  },
  {
    label: "Security",
    icon: Shield,
  },
  {
    label: "Gym",
    icon: Dumbbell,
  },
  {
    label: "Garden",
    icon: Trees,
  },
  {
    label: "Swimming Pool",
    icon: Waves,
  },
  {
    label: "Lift",
    icon: Building2,
  },
];

const PropertyAmenitiesCard = ({ formData, updateField }) => {
  // ======================================================
  // TOGGLE AMENITIES
  // ======================================================
  const toggleAmenity = (amenity) => {
    const exists = formData.amenities.includes(amenity);

    if (exists) {
      updateField(
        "amenities",
        formData.amenities.filter((item) => item !== amenity),
      );
    } else {
      updateField("amenities", [...formData.amenities, amenity]);
    }
  };

  // ======================================================
  // ADD CUSTOM AMENITY
  // ======================================================
  const addCustomAmenity = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value.trim();

    if (!value) return;

    if (formData.amenities.includes(value)) {
      e.target.value = "";
      return;
    }

    updateField("amenities", [...formData.amenities, value]);

    e.target.value = "";
  };

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      {/* =====================================
          HEADER
      ===================================== */}
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-50 text-orange-600">
            <Sparkles size={28} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-orange-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
                Section 05
              </span>

              <span className="rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold text-sky-700">
                Amenities
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Property Amenities
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select amenities that improve buyer confidence and listing
              visibility.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className="space-y-8 p-8">
        {/* =====================================
            DEFAULT AMENITIES
        ===================================== */}
        <div>
          <label className="mb-5 block text-sm font-semibold text-slate-800">
            Select Amenities
          </label>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {DEFAULT_AMENITIES.map((item, index) => {
              const Icon = item.icon;

              const active = formData.amenities.includes(item.label);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleAmenity(item.label)}
                  className={`group flex items-center gap-3 rounded-[26px] border p-5 text-left transition-all duration-200 ${
                    active
                      ? "border-orange-300 bg-orange-50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:border-orange-200 hover:bg-orange-50/40"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      active
                        ? "bg-orange-500 text-white"
                        : "bg-white text-orange-500"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.label}
                    </p>

                    <p className="text-xs text-slate-500">Add to listing</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================
            CUSTOM AMENITY
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Plus size={16} className="text-orange-600" />
            Add Custom Amenity
          </label>

          <input
            type="text"
            placeholder="Press Enter to add custom amenity"
            onKeyDown={addCustomAmenity}
            className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Example: Rooftop Garden, Kids Play Area, EV Charging
          </p>
        </div>

        {/* =====================================
            SELECTED AMENITIES
        ===================================== */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Selected Amenities
            </h3>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {formData.amenities.length} Selected
            </span>
          </div>

          {formData.amenities.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-500">No amenities selected</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {formData.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-5 py-3"
                >
                  <span className="text-sm font-medium text-slate-800">
                    {amenity}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className="rounded-full bg-white p-1 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyAmenitiesCard;
