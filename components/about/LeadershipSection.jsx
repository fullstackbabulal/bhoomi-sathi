"use client";

import Image from "next/image";
import Link from "next/link";
import { linkedin, twitter } from "lucide-react";
import styles from "./LeadershipSection.module.css";

export default function LeadershipSection({ data = {}, loading = false }) {
  const {
    badge = "Our Leadership",
    title = "Meet the People Behind Plot in Patna",
    founderMessage = {},
    team = [],
  } = data;

  // Safely ensure team is an array to prevent mapping errors
  const safeTeam = Array.isArray(team) ? team : [];

  return (
    <section className={styles.section} aria-labelledby="leadership-title">
      <div className={styles.container}>
        {/* Heading Section */}
        <div className={styles.heading}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h2 id="leadership-title" className={styles.title}>
            {title}
          </h2>
        </div>

        {/* Main Leadership Layout */}
        <div className={styles.leadershipGrid}>
          {/* 1. Founder Card */}
          <article className={styles.founderCard}>
            <div className={styles.founderImageWrapper}>
              <Image
                src={founderMessage?.image?.url || "/images/about/founder.png"}
                alt={founderMessage?.image?.alt || "Founder of Plot in Patna"}
                fill
                priority
                className={styles.founderImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }} // Ensures image covers the wrapper
              />
            </div>

            <div className={styles.founderContent}>
              <h3 className={styles.founderName}>
                {founderMessage?.name || "Founder Name"}
              </h3>
              <p className={styles.founderRole}>
                {founderMessage?.designation || "Founder & CEO"}
              </p>
              <p className={styles.founderText}>
                {founderMessage?.message ||
                  "Welcome to Plot in Patna. Our mission is to simplify your real estate journey with trust and transparency."}
              </p>
            </div>
          </article>

          {/* 2. Team Grid */}
          <div className={styles.teamGrid}>
            {/* Render actual team data if available */}
            {safeTeam.length > 0
              ? safeTeam.map((item, index) => (
                  <article key={index} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={
                          item?.image?.url ||
                          `/images/about/team-${(index % 3) + 1}.png`
                        }
                        alt={item?.name || "Team member"}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 18vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className={styles.content}>
                      <h3 className={styles.name}>
                        {item?.name || "Team Member"}
                      </h3>
                      <p className={styles.role}>
                        {item?.designation || "Designation"}
                      </p>

                      <div className={styles.socials}>
                        {item?.linkedin && (
                          <Link
                            href={item.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label={`LinkedIn of ${item?.name || "Team Member"}`}
                          >
                            <linkedin size={14} />
                          </Link>
                        )}
                        {item?.twitter && (
                          <Link
                            href={item.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label={`Twitter of ${item?.name || "Team Member"}`}
                          >
                            <twitter size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              : /* 3. Render Fallback/Skeleton cards if no data and not loading */
                !loading &&
                [1, 2, 3].map((item) => (
                  <article key={item} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={`/images/about/team-${item}.png`}
                        alt="Default Team member"
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 18vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className={styles.content}>
                      <h3 className={styles.name}>Team Member</h3>
                      <p className={styles.role}>Designation</p>

                      <div className={styles.socials}>
                        <span className={styles.socialLink}>
                          <Linkedin size={14} />
                        </span>
                        <span className={styles.socialLink}>
                          <Twitter size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
