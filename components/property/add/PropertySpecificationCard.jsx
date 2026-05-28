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
              Configure pricing, size, bedrooms, bathrooms and property
              measurements.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          BODY
      ===================================== */}
      <div className={styles.cardBody}>
        {/* PRICE + STATUS */}
        <div className={styles.grid}>
          {/* PRICE */}
          <div className={styles.field}>
            <label className={styles.label}>
              <IndianRupee size={16} className={styles.labelIcon} />
              Property Price
              <span className={styles.required}>*</span>
            </label>

            <div className={styles.priceWrapper}>
              <span className={styles.currency}>₹</span>

              <input
                type="number"
                placeholder="4500000"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                className={styles.input}
              />
            </div>

            <p className={styles.helperText}>Enter property market price.</p>
          </div>

          {/* STATUS */}
          <div className={styles.field}>
            <label className={styles.label}>
              <LayoutGrid size={16} className={styles.labelIcon} />
              Property Status
            </label>

            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              className={styles.select}
            >
              <option value="available">Available</option>

              <option value="pending">Pending</option>

              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        {/* BEDROOM + BATHROOM */}
        <div className={styles.grid}>
          {/* BEDROOM */}
          <div className={styles.field}>
            <label className={styles.label}>
              <BedDouble size={16} className={styles.labelIcon} />
              Bedrooms
            </label>

            <input
              type="number"
              min={0}
              placeholder="3"
              value={formData.bedrooms}
              onChange={(e) => updateField("bedrooms", Number(e.target.value))}
              className={styles.input}
            />
          </div>

          {/* BATHROOM */}
          <div className={styles.field}>
            <label className={styles.label}>
              <Bath size={16} className={styles.labelIcon} />
              Bathrooms
            </label>

            <input
              type="number"
              min={0}
              placeholder="2"
              value={formData.bathrooms}
              onChange={(e) => updateField("bathrooms", Number(e.target.value))}
              className={styles.input}
            />
          </div>
        </div>

        {/* AREA */}
        <div className={styles.grid}>
          {/* AREA VALUE */}
          <div className={styles.field}>
            <label className={styles.label}>
              <Ruler size={16} className={styles.labelIcon} />
              Area Size
              <span className={styles.required}>*</span>
            </label>

            <input
              type="number"
              placeholder="1200"
              value={formData.area.value}
              onChange={(e) =>
                updateNestedField("area", "value", e.target.value)
              }
              className={styles.input}
            />
          </div>

          {/* AREA UNIT */}
          <div className={styles.field}>
            <label className={styles.label}>
              <Ruler size={16} className={styles.labelIcon} />
              Area Unit
            </label>

            <select
              value={formData.area.unit}
              onChange={(e) =>
                updateNestedField("area", "unit", e.target.value)
              }
              className={styles.select}
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
