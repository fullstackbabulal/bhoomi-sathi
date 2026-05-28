"use client";

// ======================================================
// File: components/property/details/PropertySimilar.jsx
// Description: Similar Properties Section
// UI Match: Bhoomi Sathi Property Details Design
// Styling: CSS Modules + Lucide React
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./PropertySimilar.module.css";

import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  Heart,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export default function PropertySimilar({ properties = [] }) {
  const fallbackProperties = [
    {
      _id: "1",
      title: "Luxury 3 BHK Apartment",
      location: "Sevoke Road, Siliguri",
      price: 8500000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1650,
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db55?w=1000&q=80",
      verified: true,
      featured: true,
    },
    {
      _id: "2",
      title: "Premium Villa in Prime Area",
      location: "Matigara, Siliguri",
      price: 14500000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2600,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80",
      verified: true,
    },
    {
      _id: "3",
      title: "Modern Residential Flat",
      location: "Pradhan Nagar, Siliguri",
      price: 6200000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1240,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80",
      verified: true,
    },
  ];

  const similarProperties =
    properties.length > 0 ? properties : fallbackProperties;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <section className={styles.section}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Similar Properties</h2>

          <p className={styles.subText}>
            Discover more properties similar to this one.
          </p>
        </div>

        <Link href="/properties" className={styles.viewAll}>
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* ===================== */}
      {/* Cards */}
      {/* ===================== */}
      <div className={styles.grid}>
        {similarProperties.map((property) => (
          <article key={property._id} className={styles.card}>
            {/* Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={property.image}
                alt={property.title}
                fill
                className={styles.image}
                sizes="(max-width:768px) 100vw, 33vw"
              />

              {/* Badges */}
              <div className={styles.badges}>
                {property.featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}

                {property.verified && (
                  <span className={styles.verifiedBadge}>
                    <BadgeCheck size={14} />
                    Verified
                  </span>
                )}
              </div>

              {/* Save */}
              <button type="button" className={styles.saveButton}>
                <Heart size={18} />
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              <h3 className={styles.title}>{property.title}</h3>

              <div className={styles.location}>
                <MapPin size={16} />

                <span>{property.location}</span>
              </div>

              <h4 className={styles.price}>₹{formatPrice(property.price)}</h4>

              {/* Meta */}
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <BedDouble size={16} />
                  <span>{property.bedrooms} Beds</span>
                </div>

                <div className={styles.metaItem}>
                  <Bath size={16} />
                  <span>{property.bathrooms} Bath</span>
                </div>

                <div className={styles.metaItem}>
                  <Square size={16} />
                  <span>{property.area} sqft</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/properties/${property._id}`}
                className={styles.button}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
