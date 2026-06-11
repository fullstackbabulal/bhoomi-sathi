"use client";

// ======================================================
// File: components/home/Hero.jsx
// Description: Plot in Patna Premium Hero
// Target UI Match
// ======================================================

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Hero.module.css";

const POPULAR_LOCATIONS = [
  "Patna",
  //"Siliguri",
  //"Kolkata",
  //"Delhi",
  //"Mumbai",
  //"Bangalore",
];

const STATS = [
  {
    value: "5+",
    label: "Properties Listed",
    icon: "🏠",
  },
  {
    value: "100+",
    label: "Happy Buyers",
    icon: "👥",
  },
  {
    value: "50+",
    label: "Verified Agents",
    icon: "🛡️",
  },
  {
    value: "100%",
    label: "Verified Listings",
    icon: "✅",
  },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

export default function Hero() {
  const router = useRouter();

  const [city, setCity] = useState("");

  const [propertyType, setPropertyType] = useState("");

  const [loading, setLoading] = useState(false);

  const trimmedCity = useMemo(() => city.trim(), [city]);

  // ======================================================
  // SEARCH
  // ======================================================
  const handleSearch = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();

      // city
      if (trimmedCity) {
        params.set("city", trimmedCity);
      }

      // type
      if (propertyType) {
        params.set("type", propertyType);
      }

      const query = params.toString();

      router.push(query ? `/properties?${query}` : "/properties");
    } finally {
      setLoading(false);
    }
  }, [loading, propertyType, router, trimmedCity]);

  // ======================================================
  // POPULAR LOCATION
  // ======================================================
  const handlePopularLocation = useCallback(
    (location) => {
      setCity(location);

      router.push(`/properties?city=${encodeURIComponent(location)}`);
    },
    [router],
  );

  // ======================================================
  // ENTER KEY
  // ======================================================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
        }}
      />

      {/* Overlay */}
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Badge */}
          <div className={styles.badge}>
            <span>🛡</span>
            <span>Trusted Real Estate Platform</span>
          </div>

          {/* Heading */}
          <h1 className={styles.title}>
            Find Your
            <br />
            Dream Property
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Buy, rent, and discover premium properties with verified listings
            across India.
          </p>

          {/* Search */}
          <div className={styles.searchCard}>
            {/* LOCATION */}
            <div className={styles.field}>
              <label className={styles.label}>Location</label>

              <input
                type="text"
                value={city}
                placeholder="Enter city or locality"
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
              />
            </div>

            {/* TYPE */}
            <div className={styles.field}>
              <label className={styles.label}>Property Type</label>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className={styles.select}
              >
                <option value="">Select type</option>

                <option value="plot">Plot</option>

                <option value="apartment">Apartment</option>

                <option value="house">House</option>

                <option value="villa">Villa</option>

                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* SEARCH */}
            <button
              type="button"
              disabled={loading}
              onClick={handleSearch}
              className={styles.searchButton}
            >
              {loading ? "Searching..." : "Search Property"}
            </button>
          </div>

          {/* Popular Locations */}
          <div className={styles.locations}>
            <span className={styles.locationsText}>Popular Locations:</span>

            {POPULAR_LOCATIONS.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => handlePopularLocation(location)}
                className={styles.locationButton}
              >
                {location}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => router.push("/properties")}
            >
              Explore Properties →
            </button>

            <button type="button" className={styles.secondaryBtn}>
              Post Your Property →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {STATS.map((item) => (
            <div key={item.label} className={styles.stat}>
              <div className={styles.statIcon}>{item.icon}</div>

              <h3 className={styles.statValue}>{item.value}</h3>

              <p className={styles.statLabel}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
