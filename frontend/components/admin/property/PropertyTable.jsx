"use client";

// ======================================================
// File: frontend/components/admin/property/PropertyTable.jsx
// Description: Property Table
// ======================================================

import styles from "./PropertyTable.module.css";

import PropertyTableRow from "./PropertyTableRow";

export default function PropertyTable({
  properties,
  onDelete,
  onToggleStatus,
}) {
  return (
    <section className={styles.tableSection}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          {/* Table Head */}
          <thead className={styles.tableHead}>
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Listed On</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className={styles.tableBody}>
            {properties?.map((property) => (
              <PropertyTableRow
                key={property._id}
                property={property}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
