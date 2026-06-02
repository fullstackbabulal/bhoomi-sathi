"use client";

// ======================================================
// File: components/blog-detail/BlogAuthorCard/BlogAuthorCard.jsx
// Description: Blog Author Card
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import Image from "next/image";
import Link from "next/link";

import styles from "./BlogAuthorCard.module.css";

import { Facebook, Twitter, Linkedin, Globe } from "lucide-react";

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

  const safeName = author?.name?.trim?.() || "Bhoomi Sathi";

  const safeRole = author?.role?.trim?.() || "Real Estate Expert";

  const safeBio =
    author?.bio?.trim?.() ||
    "Helping property buyers, investors and homeowners make smarter real-estate decisions with expert insights and market knowledge.";

  const socialLinks = author?.socialLinks || {};

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
          {socialLinks.facebook && (
            <Link
              href={socialLinks.facebook}
              target="_blank"
              className={styles.socialButton}
            >
              <Facebook size={18} />
            </Link>
          )}

          {socialLinks.twitter && (
            <Link
              href={socialLinks.twitter}
              target="_blank"
              className={styles.socialButton}
            >
              <Twitter size={18} />
            </Link>
          )}

          {socialLinks.linkedin && (
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              className={styles.socialButton}
            >
              <Linkedin size={18} />
            </Link>
          )}

          {socialLinks.website && (
            <Link
              href={socialLinks.website}
              target="_blank"
              className={styles.socialButton}
            >
              <Globe size={18} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
