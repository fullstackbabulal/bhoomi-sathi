"use client";

// ======================================================
// File: frontend/components/admin/property/PropertyTableRow.jsx
// Description: Single Property Table Row
// ======================================================

import Image from "next/image";
import styles from "./PropertyTableRow.module.css";

import PropertyStatusBadge from "./PropertyStatusBadge";
import PropertyActionButtons from "./PropertyActionButtons";

export default function PropertyTableRow({
  property,
  onDelete,
  onToggleStatus,
}) {
  // ======================================================
  // SAFE PROPERTY DATA
  // ======================================================

  const title =
    property?.title || property?.propertyTitle || "Untitled Property";

  const propertyId = property?._id || "";

  const city = property?.location?.city || property?.city || "N/A";

  const state = property?.location?.state || property?.state || "";

  const fullLocation = state && state !== city ? `${city}, ${state}` : city;

  const type = property?.type || property?.propertyType || "Property";

  const price = property?.price || 0;

  const status = property?.status || "pending";

  const createdAt = property?.createdAt || property?.listedOn;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  // ======================================================
  // SAFE IMAGE
  // ======================================================

  const image =
    property?.thumbnail ||
    property?.featuredImage ||
    property?.coverImage ||
    property?.images?.[0]?.url ||
    property?.images?.[0] ||
    property?.gallery?.[0]?.url ||
    property?.gallery?.[0] ||
    "/images/property/property-placeholder.webp";

  const safeImage =
    typeof image === "string" && image.trim()
      ? image
      : "/images/property/property-placeholder.webp";

  // ======================================================
  // FORMAT PRICE
  // ======================================================

  const formattedPrice = Number(price).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <tr className={styles.row}>
      {/* PROPERTY */}
      <td className={styles.propertyCell}>
        <div className={styles.propertyInfo}>
          <div className={styles.imageWrapper}>
            <Image
              src={safeImage}
              alt={title}
              fill
              className={styles.image}
              sizes="80px"
            />
          </div>

          <div className={styles.propertyContent}>
            <h4 className={styles.title}>{title}</h4>

            <p className={styles.id}>ID: {propertyId.slice(-8) || "N/A"}</p>
          </div>
        </div>
      </td>

      {/* LOCATION */}
      <td className={styles.cell}>
        <span className={styles.location}>{fullLocation}</span>
      </td>

      {/* TYPE */}
      <td className={styles.cell}>
        <span className={styles.type}>{type}</span>
      </td>

      {/* PRICE */}
      <td className={styles.cell}>
        <span className={styles.price}>{formattedPrice}</span>
      </td>

      {/* STATUS */}
      <td className={styles.cell}>
        <PropertyStatusBadge status={status} />
      </td>

      {/* DATE */}
      <td className={styles.cell}>
        <span className={styles.date}>{formattedDate}</span>
      </td>

      {/* ACTIONS */}
      <td className={styles.cell}>
        <PropertyActionButtons
          property={property}
          onDelete={() => onDelete(propertyId)}
          onToggleStatus={() => onToggleStatus(propertyId, status)}
        />
      </td>
    </tr>
  );
}
