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
  Compass,
  Car,
  Layers3,
  CalendarDays,
  Home,
  Landmark,
} from "lucide-react";

import styles from "./PropertySpecificationCard.module.css";

const PropertySpecificationCard = ({
  formData,
  updateField,
  updateNestedField,
}) => {
  return (
    <section className={styles.card}>
      {/* =====================================
          HEADER
      ===================================== */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <Building2 size={28} />
          </div>

          <div className={styles.headingArea}>
            <div className={styles.badges}>
              <span className={styles.sectionBadge}>Section 02</span>

              <span className={styles.infoBadge}>Property Specs</span>
            </div>

            <h2 className={styles.title}>Property Specifications</h2>

            <p className={styles.subtitle}>
              Configure pricing, listing type, property measurements, ownership,
              floors, parking and legal details.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* ==========================
            PRICE / EMI / STATUS / LISTING
        ========================== */}
        <div className={styles.grid}>
          {/* PRICE */}
          <div className={styles.field}>
            <label className={styles.label}>
              <IndianRupee size={16} className={styles.labelIcon} />
              Property Price
              <span className={styles.required}>*</span>
            </label>

            <input
              type="number"
              placeholder="4500000"
              value={formData.price || ""}
              onChange={(e) => updateField("price", e.target.value)}
              className={styles.input}
            />
          </div>

          {/* EMI */}
          <div className={styles.field}>
            <label className={styles.label}>
              <IndianRupee size={16} className={styles.labelIcon} />
              EMI
            </label>

            <input
              type="number"
              placeholder="25000"
              value={formData.emi || ""}
              onChange={(e) => updateField("emi", e.target.value)}
              className={styles.input}
            />
          </div>

          {/* STATUS */}
          <div className={styles.field}>
            <label className={styles.label}>
              <LayoutGrid size={16} className={styles.labelIcon} />
              Property Status
            </label>

            <select
              value={formData.status || "available"}
              onChange={(e) => updateField("status", e.target.value)}
              className={styles.select}
            >
              <option value="available">Available</option>

              <option value="pending">Pending</option>

              <option value="sold">Sold</option>
            </select>
          </div>

          {/* LISTING TYPE */}
          <div className={styles.field}>
            <label className={styles.label}>
              <Home size={16} className={styles.labelIcon} />
              Listing Type
            </label>

            <select
              value={formData.listingType || "sale"}
              onChange={(e) => updateField("listingType", e.target.value)}
              className={styles.select}
            >
              <option value="sale">Sale</option>

              <option value="rent">Rent</option>

              <option value="lease">Lease</option>
            </select>
          </div>
        </div>

        {/* ==========================
            BEDROOM / BATHROOM / PARKING / FACING
        ========================== */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>
              <BedDouble size={16} className={styles.labelIcon} />
              Bedrooms
            </label>

            <input
              type="number"
              min={0}
              value={formData.bedrooms || 0}
              onChange={(e) => updateField("bedrooms", Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Bath size={16} className={styles.labelIcon} />
              Bathrooms
            </label>

            <input
              type="number"
              min={0}
              value={formData.bathrooms || 0}
              onChange={(e) => updateField("bathrooms", Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Car size={16} className={styles.labelIcon} />
              Parking
            </label>

            <input
              type="number"
              min={0}
              value={formData.parking || 0}
              onChange={(e) => updateField("parking", Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Compass size={16} className={styles.labelIcon} />
              Facing
            </label>

            <select
              value={formData.facing || ""}
              onChange={(e) => updateField("facing", e.target.value)}
              className={styles.select}
            >
              <option value="">Select Facing</option>

              <option value="North">North</option>

              <option value="South">South</option>

              <option value="East">East</option>

              <option value="West">West</option>

              <option value="North-East">North-East</option>

              <option value="North-West">North-West</option>

              <option value="South-East">South-East</option>

              <option value="South-West">South-West</option>
            </select>
          </div>
        </div>

        {/* ==========================
            FLOOR / YEAR / POSSESSION / OWNERSHIP
        ========================== */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>
              <Layers3 size={16} className={styles.labelIcon} />
              Floor
            </label>

            <input
              type="number"
              min={0}
              value={formData.floor || 0}
              onChange={(e) => updateField("floor", Number(e.target.value))}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Layers3 size={16} className={styles.labelIcon} />
              Total Floors
            </label>

            <input
              type="number"
              min={0}
              value={formData.totalFloors || 0}
              onChange={(e) =>
                updateField("totalFloors", Number(e.target.value))
              }
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <CalendarDays size={16} className={styles.labelIcon} />
              Construction Year
            </label>

            <input
              type="number"
              placeholder="2026"
              value={formData.constructionYear || ""}
              onChange={(e) => updateField("constructionYear", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Home size={16} className={styles.labelIcon} />
              Possession
            </label>

            <input
              type="text"
              placeholder="Ready To Move"
              value={formData.possession || ""}
              onChange={(e) => updateField("possession", e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        {/* ==========================
            AREA DETAILS
        ========================== */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>
              <Ruler size={16} className={styles.labelIcon} />
              Area Size
            </label>

            <input
              type="number"
              value={formData.area?.value || ""}
              onChange={(e) =>
                updateNestedField("area", "value", e.target.value)
              }
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Ruler size={16} className={styles.labelIcon} />
              Area Unit
            </label>

            <select
              value={formData.area?.unit || "kattha"}
              onChange={(e) =>
                updateNestedField("area", "unit", e.target.value)
              }
              className={styles.select}
            >
              <option value="kattha">Kattha</option>
              <option value="sqft">Square Feet</option>
              <option value="sqm">Square Meter</option>
              <option value="bigha">Bigha</option>
              <option value="acre">Acre</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Ruler size={16} className={styles.labelIcon} />
              Carpet Area
            </label>

            <input
              type="number"
              value={formData.carpetArea || ""}
              onChange={(e) => updateField("carpetArea", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Ruler size={16} className={styles.labelIcon} />
              Super Built-Up Area
            </label>

            <input
              type="number"
              value={formData.superBuiltUpArea || ""}
              onChange={(e) => updateField("superBuiltUpArea", e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        {/* ==========================
            OWNERSHIP
        ========================== */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>
              <Landmark size={16} className={styles.labelIcon} />
              Ownership Type
            </label>

            <select
              value={formData.ownershipType || "freehold"}
              onChange={(e) => updateField("ownershipType", e.target.value)}
              className={styles.select}
            >
              <option value="freehold">Freehold</option>

              <option value="leasehold">Leasehold</option>

              <option value="co-operative">Co-operative</option>

              <option value="power-of-attorney">Power Of Attorney</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySpecificationCard;
