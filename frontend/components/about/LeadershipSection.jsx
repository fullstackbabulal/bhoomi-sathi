"use client";

// ======================================================
// File: components/about/LeadershipSection/LeadershipSection.jsx
// Description: Leadership Section
// ======================================================

import Image from "next/image";
import Link from "next/link";

import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import styles from "./LeadershipSection.module.css";

export default function LeadershipSection({ data = {}, loading = false }) {
  const {
    badge = "Our Leadership",
    title = "Meet the People Behind Plot in Patna",
    founderMessage = {},
    team = [],
  } = data;

  // ======================================================
  // SAFE DATA
  // ======================================================

  const safeTeam = Array.isArray(team) ? team : [];

  // ======================================================
  // IMAGE ERROR DEBUGGING
  // ======================================================

  const handleImageError = (imageUrl, personName) => {
    console.error("❌ Image Failed:", imageUrl);

    console.error("❌ Person:", personName);

    console.error("❌ Verify file exists inside public folder");
  };

  return (
    <section className={styles.section} aria-labelledby="leadership-title">
      <div className={styles.container}>
        {/* ======================================
            HEADING
        ====================================== */}

        <div className={styles.heading}>
          {badge && <span className={styles.badge}>{badge}</span>}

          <h2 id="leadership-title" className={styles.title}>
            {title}
          </h2>
        </div>

        {/* ======================================
            MAIN GRID
        ====================================== */}

        <div className={styles.leadershipGrid}>
          {/* ======================================
              FOUNDER CARD
          ====================================== */}

          <article className={styles.founderCard}>
            <div className={styles.founderImageWrapper}>
              <Image
                src={founderMessage?.image?.url || "/images/about/founder.webp"}
                alt={founderMessage?.image?.alt || "Founder of Plot in Patna"}
                fill
                priority
                className={styles.founderImage}
                sizes="(max-width:768px) 100vw, 50vw"
                onError={() =>
                  handleImageError(
                    founderMessage?.image?.url,
                    founderMessage?.name,
                  )
                }
              />
            </div>

            <div className={styles.founderContent}>
              <h3 className={styles.founderName}>
                {founderMessage?.name || "Founder Name"}
              </h3>

              <p className={styles.designation}>
                {founderMessage?.designation || "Founder & CEO"}
              </p>

              <p className={styles.message}>
                {founderMessage?.message ||
                  "Our mission is to simplify the property journey through trust, transparency, and innovation."}
              </p>
            </div>
          </article>

          {/* ======================================
              TEAM MEMBERS
          ====================================== */}

          <div className={styles.teamGrid}>
            {safeTeam.length > 0
              ? safeTeam.map((member, index) => {
                  const imageUrl =
                    member?.image?.url ||
                    `/images/about/team-${(index % 3) + 1}.png`;

                  return (
                    <article
                      key={member?._id || member?.id || index}
                      className={styles.card}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={imageUrl}
                          alt={
                            member?.image?.alt || member?.name || "Team Member"
                          }
                          fill
                          className={styles.image}
                          sizes="(max-width:768px) 100vw, 18vw"
                          onError={() =>
                            handleImageError(imageUrl, member?.name)
                          }
                        />
                      </div>

                      <div className={styles.content}>
                        <h3 className={styles.name}>
                          {member?.name || "Team Member"}
                        </h3>

                        <p className={styles.role}>
                          {member?.designation || "Designation"}
                        </p>

                        <div className={styles.socials}>
                          {member?.socialLinks?.linkedin &&
                            member.socialLinks.linkedin !== "#" && (
                              <Link
                                href={member.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={`LinkedIn profile of ${member?.name}`}
                              >
                                <FaLinkedinIn size={14} />
                              </Link>
                            )}

                          {member?.socialLinks?.twitter &&
                            member.socialLinks.twitter !== "#" && (
                              <Link
                                href={member.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={`Twitter profile of ${member?.name}`}
                              >
                                <FaXTwitter size={14} />
                              </Link>
                            )}
                        </div>
                      </div>
                    </article>
                  );
                })
              : !loading &&
                [1, 2, 3].map((item) => (
                  <article key={item} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={`/images/about/team-${item}.png`}
                        alt={`Team Member ${item}`}
                        fill
                        className={styles.image}
                        sizes="(max-width:768px) 100vw, 18vw"
                        onError={() =>
                          handleImageError(
                            `/images/about/team-${item}.png`,
                            `Fallback Team ${item}`,
                          )
                        }
                      />
                    </div>

                    <div className={styles.content}>
                      <h3 className={styles.name}>Team Member</h3>

                      <p className={styles.role}>Designation</p>

                      <div className={styles.socials}>
                        <span className={styles.socialLink}>
                          <FaLinkedinIn size={14} />
                        </span>

                        <span className={styles.socialLink}>
                          <FaXTwitter size={14} />
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
