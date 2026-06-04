"use client";

// ======================================================
// File: components/property/PropertyTypeSelect.jsx
// Description: Property Type Select Component
// ======================================================

import styles from "./PropertyTypeSelect.module.css";

const PROPERTY_TYPES = [
  "Apartment",
  "Flat",
  "Villa",
  "House",
  "Plot",
  "Commercial",
  "Office",
  "Shop",
  "Warehouse",
  "Farmhouse",
  "Penthouse",
];

export default function PropertyTypeSelect({
  label = "Property Type",
  value = "",
  onChange = () => {},
  placeholder = "Select Property Type",
  options = PROPERTY_TYPES,
  required = false,
  disabled = false,
  name = "propertyType",
}) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}

        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.selectWrapper}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.select}
        >
          <option value="">{placeholder}</option>

          {options.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
