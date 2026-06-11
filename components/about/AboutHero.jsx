"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./AboutHero.module.css";

export default function AboutHero({ data = {} }) {
  const badge = data?.badge || "About Us";

  const title = data?.title || "About Plot in Patna";

  const subtitle = data?.subtitle || "Building Trust. Delivering Value.";

  const description =
    data?.description ||
    "Plot in Patna is a trusted real estate platform that connects buyers, sellers, and investors with verified properties across India.";

  const primaryButton = {
    label: data?.primaryButton?.label || "Explore Properties",
    href: data?.primaryButton?.href || "/properties",
  };

  const secondaryButton = {
    label: data?.secondaryButton?.label || "Contact Us",
    href: data?.secondaryButton?.href || "/contact",
  };

  const imageUrl = data?.image?.url?.trim() || "images/about/about-hero.png";

  const imageAlt =
    data?.image?.alt ||
    "Luxury residential property showcased by Plot in Patna";

  return (
    <section className={styles.hero} aria-label="About Plot in Patna">
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.content}>
          <span className={styles.badge}>{badge}</span>

          <h1 className={styles.title}>{title}</h1>

          <h2 className={styles.subtitle}>{subtitle}</h2>

          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Link href={primaryButton.href} className={styles.primaryBtn}>
              <span>{primaryButton.label}</span>

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link href={secondaryButton.href} className={styles.secondaryBtn}>
              <span>{secondaryButton.label}</span>

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C10.51 20.92 2 12.41 2 1.92C2 1.37 2.45 0.92 3 0.92H6C6.55 0.92 7 1.37 7 1.92V4.92C7 5.29 6.8 5.63 6.48 5.8L4.91 6.58C5.9 10.08 8.84 13.02 12.34 14.01L13.12 12.44C13.29 12.12 13.63 11.92 14 11.92H17C17.55 11.92 18 12.37 18 12.92V15.92C18 16.47 18.45 16.92 19 16.92H22Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.imageSection}>
          <div className={styles.imageCurve} />

          <div className={styles.imageWrapper}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
