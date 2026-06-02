"use client";

// ======================================================
// File: components/blog-detail/BlogShareSection/BlogShareSection.jsx
// Description: Blog Share Section
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import { useMemo, useState } from "react";
import styles from "./BlogShareSection.module.css";

// Import custom buttons and round brand icons from react-share
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  XShareButton,
  XIcon,
} from "react-share";

// Import only the standard UI utility icons needed from lucide-react
import { Share2, Copy, Check } from "lucide-react";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogShareSection({
  title = "Why Real Estate is the Smartest Investment",
  slug = "real-estate-investment",
  excerpt = "Learn smarter real estate strategies and investment insights.",
  url = "",
}) {
  // ====================================================
  // STATE
  // ====================================================

  const [copied, setCopied] = useState(false);

  // ====================================================
  // URL GENERATION
  // ====================================================

  const shareUrl = useMemo(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return url || `${siteUrl}/blog/${slug}`;
  }, [slug, url]);

  // ====================================================
  // COPY LINK
  // ====================================================

  const handleCopy = async () => {
    try {
      if (typeof navigator === "undefined") return;

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy Error:", error);
    }
  };

  // ====================================================
  // MOBILE NATIVE SHARE
  // ====================================================

  const handleNativeShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        });
        return;
      }
      await handleCopy();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      console.error("Native Share Error:", error);
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Share2 size={22} />
        </div>

        <div>
          <h3 className={styles.title}>Share This Article</h3>
          <p className={styles.subtitle}>Help others discover this content.</p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className={styles.buttons}>
        {/* FACEBOOK */}
        <FacebookShareButton
          url={shareUrl}
          hashtag="#realestate"
          className={styles.button}
        >
          <FacebookIcon size={18} round />
          Facebook
        </FacebookShareButton>

        {/* X / TWITTER */}
        <XShareButton url={shareUrl} title={title} className={styles.button}>
          <XIcon size={18} round />X / Twitter
        </XShareButton>

        {/* LINKEDIN */}
        <LinkedinShareButton
          url={shareUrl}
          title={title}
          summary={excerpt}
          className={styles.button}
        >
          <LinkedinIcon size={18} round />
          LinkedIn
        </LinkedinShareButton>

        {/* WHATSAPP */}
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=" - "
          className={styles.button}
        >
          <WhatsappIcon size={18} round />
          WhatsApp
        </WhatsappShareButton>

        {/* COPY */}
        <button
          type="button"
          aria-label="Copy blog link"
          className={styles.button}
          onClick={handleCopy}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy Link"}
        </button>

        {/* MOBILE SHARE */}
        <button
          type="button"
          aria-label="Share article"
          className={styles.primaryButton}
          onClick={handleNativeShare}
        >
          <Share2 size={18} />
          Share Now
        </button>
      </div>
    </section>
  );
}
