"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Properties",
    href: "/properties",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

const propertyTypes = [
  {
    label: "Apartment",
    href: "/properties?type=apartment",
  },
  {
    label: "Villa",
    href: "/properties?type=villa",
  },
  {
    label: "Residential Plot",
    href: "/properties?type=residential-plot",
  },
  {
    label: "Commercial",
    href: "/properties?type=commercial",
  },
  {
    label: "Office Space",
    href: "/properties?type=office-space",
  },
];

const companyLinks = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    label: "Sitemap",
    href: "/sitemap",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: "f",
  },
  {
    label: "Twitter",
    href: "#",
    icon: "𝕏",
  },
  {
    label: "Instagram",
    href: "#",
    icon: "◎",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: "in",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* BRAND COLUMN */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logoWrapper}>
              <div className={styles.logoIcon}>🏠</div>

              <div>
                <h2 className={styles.logoTitle}>Plot in Patna</h2>

                <p className={styles.logoTagline}>
                  Your Property, Our Priority
                </p>
              </div>
            </Link>

            <p className={styles.description}>
              Plot in Patna is your trusted partner in finding, buying, and
              selling properties across India.
            </p>

            <div className={styles.socialLinks}>
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className={styles.socialButton}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className={styles.columnTitle}>Quick Links</h3>

            <ul className={styles.linkList}>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PROPERTY TYPES */}
          <div>
            <h3 className={styles.columnTitle}>Property Types</h3>

            <ul className={styles.linkList}>
              {propertyTypes.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className={styles.columnTitle}>Company</h3>

            <ul className={styles.linkList}>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className={styles.columnTitle}>Contact Us</h3>

            <div className={styles.contactList}>
              <p className={styles.contactItem}>
                <span>📞</span>
                +91 9661655534
              </p>

              <p className={styles.contactItem}>
                <span>✉️</span>
                info@plotinpatna.in
              </p>

              <p className={styles.contactItem}>
                <span>📍</span>
                123, Business Park, Patna, Bihar - 800001
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Plot in Patna. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
