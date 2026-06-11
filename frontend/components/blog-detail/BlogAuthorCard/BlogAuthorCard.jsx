"use client";

// ======================================================
// File: components/blog-detail/BlogAuthorCard/BlogAuthorCard.jsx
// Description: Blog Author Card
// UI Match: Plot in Patna Blog Detail Page
// ======================================================

import Image from "next/image";

import styles from "./BlogAuthorCard.module.css";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaGlobe,
} from "react-icons/fa6";

// ======================================================
// FALLBACKS
// ======================================================

const FALLBACK_AVATAR = "https://i.pravatar.cc/200?img=15";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogAuthorCard({ author = {} }) {
  // ====================================================
  // SAFE DATA
  // ====================================================

  const safeAvatar = author?.avatar?.trim?.() || FALLBACK_AVATAR;

  const safeName = author?.name?.trim?.() || "Plot in Patna";

  const safeRole = author?.role?.trim?.() || "Real Estate Expert";

  const safeBio =
    author?.bio?.trim?.() ||
    "Helping property buyers, investors and homeowners make smarter real-estate decisions with expert insights and market knowledge.";

  const socialLinks = author?.socialLinks || {};

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.card}>
      {/* LEFT */}
      <div className={styles.left}>
        {/* AVATAR */}
        <div className={styles.avatarWrapper}>
          <Image
            src={safeAvatar}
            alt={safeName}
            fill
            className={styles.avatar}
            unoptimized
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.content}>
        <span className={styles.label}>About the Author</span>

        <h3 className={styles.name}>{safeName}</h3>

        <p className={styles.role}>{safeRole}</p>

        <p className={styles.bio}>{safeBio}</p>

        {/* SOCIAL */}
        <div className={styles.socials}>
          {/* FACEBOOK */}
          {socialLinks.facebook && (
            <FacebookShareButton url={pageUrl} className={styles.socialButton}>
              <FaFacebookF size={18} />
            </FacebookShareButton>
          )}

          {/* X / TWITTER */}
          {socialLinks.twitter && (
            <TwitterShareButton
              url={pageUrl}
              title={safeName}
              className={styles.socialButton}
            >
              <FaXTwitter size={18} />
            </TwitterShareButton>
          )}

          {/* LINKEDIN */}
          {socialLinks.linkedin && (
            <LinkedinShareButton url={pageUrl} className={styles.socialButton}>
              <FaLinkedinIn size={18} />
            </LinkedinShareButton>
          )}

          {/* WEBSITE */}
          {socialLinks.website && (
            <a
              href={socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="Visit website"
            >
              <FaGlobe size={18} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
