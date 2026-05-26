"use client";

// ======================================================
// File: components/property/add/PropertyLocationCard.jsx
// Description: Premium Property Location Section
// ======================================================

import {
  MapPin,
  Globe,
  Building,
  Landmark,
  Navigation,
  LocateFixed,
} from "lucide-react";

const PropertyLocationCard = ({ formData, updateNestedField }) => {
  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      {/* =====================================
          HEADER
      ===================================== */}
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
            <MapPin size={28} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Section 03
              </span>

              <span className="rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold text-sky-700">
                Location
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Property Location
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add property address, city, pincode and geo-location for map
              visibility and local SEO.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className="space-y-8 p-8">
        {/* =====================================
            FULL ADDRESS
        ===================================== */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Navigation size={16} className="text-emerald-600" />
            Full Address *
          </label>

          <textarea
            rows={4}
            value={formData.location.address}
            onChange={(e) =>
              updateNestedField("location", "address", e.target.value)
            }
            placeholder="Enter full property address..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Accurate address improves discoverability and Google Maps
            visibility.
          </p>
        </div>

        {/* =====================================
            CITY + STATE
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* CITY */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Building size={16} className="text-emerald-600" />
              City *
            </label>

            <input
              type="text"
              value={formData.location.city}
              onChange={(e) =>
                updateNestedField("location", "city", e.target.value)
              }
              placeholder="Patna"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          {/* STATE */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Landmark size={16} className="text-emerald-600" />
              State *
            </label>

            <input
              type="text"
              value={formData.location.state}
              onChange={(e) =>
                updateNestedField("location", "state", e.target.value)
              }
              placeholder="Bihar"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* =====================================
            COUNTRY + PINCODE
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* COUNTRY */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Globe size={16} className="text-emerald-600" />
              Country
            </label>

            <input
              type="text"
              value={formData.location.country}
              onChange={(e) =>
                updateNestedField("location", "country", e.target.value)
              }
              placeholder="India"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          {/* PINCODE */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <LocateFixed size={16} className="text-emerald-600" />
              Pincode
            </label>

            <input
              type="text"
              value={formData.location.pincode}
              onChange={(e) =>
                updateNestedField("location", "pincode", e.target.value)
              }
              placeholder="800001"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* =====================================
            LATITUDE + LONGITUDE
        ===================================== */}
        <div>
          <div className="mb-5">
            <h3 className="text-base font-semibold text-slate-900">
              Geo Coordinates
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Used for maps, nearby search and geo-indexing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* LATITUDE */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-800">
                Latitude
              </label>

              <input
                type="number"
                step="any"
                value={formData.location.coordinates.coordinates?.[1]}
                onChange={(e) => {
                  const lng =
                    formData.location.coordinates.coordinates?.[0] || 0;

                  updateNestedField("location", "coordinates", {
                    type: "Point",
                    coordinates: [lng, Number(e.target.value)],
                  });
                }}
                placeholder="25.5941"
                className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* LONGITUDE */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-800">
                Longitude
              </label>

              <input
                type="number"
                step="any"
                value={formData.location.coordinates.coordinates?.[0]}
                onChange={(e) => {
                  const lat =
                    formData.location.coordinates.coordinates?.[1] || 0;

                  updateNestedField("location", "coordinates", {
                    type: "Point",
                    coordinates: [Number(e.target.value), lat],
                  });
                }}
                placeholder="85.1376"
                className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyLocationCard;
