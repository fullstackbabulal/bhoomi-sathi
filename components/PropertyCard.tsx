import Image from "next/image";
import Link from "next/link";

interface Property {
  _id?: string;
  title?: string;
  slug?: string;
  thumbnail?: string;
  images?: string[];
  price?: number | string;
  location?: string;
  city?: string;
  state?: string;
  type?: string;
  area?: number | string;
}

interface PropertyCardProps {
  property?: Property;
}

const FALLBACK_IMAGE = "https://placehold.co/600x400?text=No+Image+Available";

function formatPrice(price?: number | string): string {
  if (price === null || price === undefined || price === "") {
    return "Price on Request";
  }

  const numericPrice = typeof price === "string" ? Number(price) : price;

  if (Number.isNaN(numericPrice)) {
    return "Price on Request";
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  if (!property) return null;

  const {
    _id,
    title,
    slug,
    thumbnail,
    images,
    price,
    location,
    city,
    state,
    type,
    area,
  } = property;

  const image = thumbnail || images?.[0] || FALLBACK_IMAGE;

  const propertyTitle = title?.trim() || "Untitled Property";

  const propertySlug = slug?.trim() || "";

  const propertyLocation =
    [location, city, state].filter(Boolean).join(", ") ||
    "Location not available";

  return (
    <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
      {/* Property Image */}
      <div
        className="position-relative"
        style={{
          height: "240px",
        }}
      >
        <Image
          src={image}
          alt={propertyTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-fit-cover"
          priority={false}
          unoptimized
        />

        {/* Property Type Badge */}
        {type && (
          <span className="badge bg-dark position-absolute top-0 start-0 m-3 text-capitalize">
            {type}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        {/* Title */}
        <h5
          className="card-title fw-semibold mb-2 text-truncate"
          title={propertyTitle}
        >
          {propertyTitle}
        </h5>

        {/* Location */}
        <p className="text-muted small mb-2" title={propertyLocation}>
          📍 {propertyLocation}
        </p>

        {/* Area */}
        {area ? (
          <p className="small text-secondary mb-3">
            Area: <strong>{area} sqft</strong>
          </p>
        ) : (
          <div className="mb-3" />
        )}

        {/* Footer */}
        <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
          <div>
            <p className="mb-0 text-muted small">Starting From</p>

            <h5 className="fw-bold text-primary mb-0">
              ₹ {formatPrice(price)}
            </h5>
          </div>

          <Link
            href={propertySlug ? `/properties/${propertySlug}` : "#"}
            className={`btn btn-primary rounded-pill px-4 ${
              !propertySlug ? "disabled pe-none" : ""
            }`}
            aria-label={`View details for ${propertyTitle}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
