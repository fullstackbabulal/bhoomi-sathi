"use client";

import styles from "./ContactHero.module.css";
import {
  Headphones,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

const ContactHero = ({ data }) => {
  const hero = data?.hero || {};
  const officeInfo = data?.officeInfo || {};
  const contactCards = data?.contactCards || [];

  return (
    <section className={styles.contactHeroSection}>
      <div className={styles.container}>
        {/* HERO */}
        <div className={styles.heroWrapper}>
          {/* Left Content */}
          <div className={styles.content}>
            <span className={styles.badge}>
              {hero?.badge || "We're Here to Help"}
            </span>

            <h1 className={styles.title}>{hero?.title || "Let's Connect"}</h1>

            <h2 className={styles.highlight}>
              {hero?.subtitle || "We’d Love to Hear from You!"}
            </h2>

            <p className={styles.description}>
              {hero?.description ||
                "Whether you have a question, need assistance, or want to explore opportunities, our team is ready to help you."}
            </p>

            <div className={styles.featureCards}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Headphones size={28} />
                </div>

                <div>
                  <h3>Quick Support</h3>
                  <p>We respond within 24 hours</p>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <ShieldCheck size={28} />
                </div>

                <div>
                  <h3>Trusted Service</h3>
                  <p>Your satisfaction is our top priority</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className={styles.imageWrapper}>
            <img
              src={hero?.image || "about-hero.png"}
              alt={hero?.title || "Contact Plot in Patna"}
              className={styles.heroImage}
            />
          </div>
        </div>

        {/* CONTACT INFO BAR */}
        <div className={styles.contactBar}>
          {contactCards.length > 0 ? (
            contactCards.map((item, index) => (
              <div className={styles.contactCard} key={item?._id || index}>
                <div className={styles.contactIcon}>
                  {item?.type === "office" && <MapPin size={28} />}
                  {item?.type === "phone" && <Phone size={28} />}
                  {item?.type === "email" && <Mail size={28} />}
                  {item?.type === "hours" && <Clock3 size={28} />}
                </div>

                <div className={styles.contactContent}>
                  <h3>{item?.title}</h3>

                  {Array.isArray(item?.details) ? (
                    item.details.map((text, i) => <p key={i}>{text}</p>)
                  ) : (
                    <p>{item?.details}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Office */}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <MapPin size={28} />
                </div>

                <div className={styles.contactContent}>
                  <h3>Our Office</h3>
                  <p>{officeInfo?.address || "123, Business Park,"}</p>
                  <p>{officeInfo?.city || "Patna, Bihar - 800001"}</p>
                  <p>{officeInfo?.country || "India"}</p>
                </div>
              </div>

              {/* Call */}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <Phone size={28} />
                </div>

                <div className={styles.contactContent}>
                  <h3>Call Us</h3>
                  <p>{officeInfo?.phone1 || "+91 9661655534"}</p>
                </div>
              </div>

              {/* Email */}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <Mail size={28} />
                </div>

                <div className={styles.contactContent}>
                  <h3>Email Us</h3>
                  <p>{officeInfo?.email1 || "info@bhoomisathi.com"}</p>
                  <p>{officeInfo?.email2 || "support@bhoomisathi.com"}</p>
                </div>
              </div>

              {/* Hours */}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <Clock3 size={28} />
                </div>

                <div className={styles.contactContent}>
                  <h3>Working Hours</h3>
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
