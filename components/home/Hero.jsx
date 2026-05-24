"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Hero.module.css";

const POPULAR_LOCATIONS = [
  "Patna",
  "Siliguri",
  "Kolkata",
  "Delhi",
  "Mumbai",
  "Bangalore",
];

const STATS = [
  {
    value: "10K+",
    label: "Properties Listed",
    icon: "🏠",
  },
  {
    value: "2K+",
    label: "Happy Buyers",
    icon: "👥",
  },
  {
    value: "500+",
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

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const trimmedLocation = useMemo(() => location.trim(), [location]);

  const handleSearch = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (trimmedLocation) {
        params.set("location", trimmedLocation);
      }

      if (propertyType) {
        params.set("type", propertyType);
      }

      if (budget) {
        params.set("budget", budget);
      }

      const query = params.toString();

      router.push(query ? `/properties?${query}` : "/properties");
    } finally {
      setLoading(false);
    }
  }, [budget, loading, propertyType, router, trimmedLocation]);

  const handlePopularLocation = useCallback(
    (city) => {
      setLocation(city);

      router.push(`/properties?location=${encodeURIComponent(city)}`);
    },
    [router],
  );

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

          {/* Search Panel */}
          <div className={styles.searchCard}>
            <div className={styles.field}>
              <label className={styles.label}>Location</label>

              <input
                type="text"
                value={location}
                placeholder="Enter city or locality"
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Property Type</label>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className={styles.select}
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Budget</label>

              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={styles.select}
              >
                <option value="">Select budget</option>
                <option value="25">Under 25 Lakh</option>
                <option value="50">Under 50 Lakh</option>
                <option value="100">Under 1 Cr</option>
                <option value="100+">Above 1 Cr</option>
              </select>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleSearch}
              className={styles.searchButton}
            >
              {loading ? "Searching..." : "🔍 Search Property"}
            </button>
          </div>

          {/* Popular Locations */}
          <div className={styles.locations}>
            <span className={styles.locationsText}>Popular Locations:</span>

            {POPULAR_LOCATIONS.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handlePopularLocation(city)}
                className={styles.locationButton}
              >
                {city}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={styles.actions}>
            <button type="button" className={styles.primaryBtn}>
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
