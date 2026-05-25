"use client";

import styles from "./ContactCTA.module.css";
import { ArrowRight, PhoneCall } from "lucide-react";

const ContactCTA = ({ data = {} }) => {
  const title = data?.title || "Ready to Find Your Dream Property?";

  const description =
    data?.description ||
    "Connect with our property experts today and take the next step toward your perfect investment or dream home.";

  const buttonText = data?.buttonText || "Get Started";

  const buttonLink = data?.buttonLink || "/properties";

  const supportText = data?.supportText || "Need immediate assistance?";

  const phone = data?.phone || "+91 9876543210";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Left Content */}
          <div className={styles.content}>
            <span className={styles.badge}>Contact Bhoomi Sathi</span>

            <h2>{title}</h2>

            <p>{description}</p>

            <div className={styles.actions}>
              <a href={buttonLink} className={styles.primaryBtn}>
                <span>{buttonText}</span>
                <ArrowRight size={18} />
              </a>

              <a href={`tel:${phone}`} className={styles.secondaryBtn}>
                <PhoneCall size={18} />
                <span>{phone}</span>
              </a>
            </div>
          </div>

          {/* Right Support Box */}
          <div className={styles.supportCard}>
            <div className={styles.supportIcon}>
              <PhoneCall size={28} />
            </div>

            <div>
              <h3>{supportText}</h3>
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
