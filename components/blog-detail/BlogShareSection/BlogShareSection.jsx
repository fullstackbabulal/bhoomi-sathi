"use client";

// ======================================================
// File: components/blog-detail/BlogShareSection/BlogShareSection.jsx
// Description: Blog Share Section
// UI Match: Bhoomi Sathi Blog Detail Page
// Fixed:
// - Hydration-safe implementation
// - No nested button issues
// - Stable share URL generation
// - Clipboard fallback support
// - Native share fallback support
// ======================================================

import { useMemo, useState } from "react";
import styles from "./BlogShareSection.module.css";

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
  // SHARE URL
  // ====================================================

  const shareUrl = useMemo(() => {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000";

    if (url && typeof url === "string") {
      return url;
    }

    return `${siteUrl}/blog/${slug}`;
  }, [slug, url]);

  // ====================================================
  // COPY LINK
  // ====================================================

  const handleCopy = async () => {
    try {
      if (typeof window === "undefined") return;

      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy Error:", error);
    }
  };

  // ====================================================
  // NATIVE SHARE
  // ====================================================

  const handleNativeShare = async () => {
    try {
      if (
        typeof window !== "undefined" &&
        navigator.share &&
        typeof navigator.share === "function"
      ) {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        });

        return;
      }

      await handleCopy();
    } catch (error) {
      if (error?.name === "AbortError") return;

      console.error("Native Share Error:", error);
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.section}>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Share2 size={22} />
        </div>

        <div>
          <h3 className={styles.title}>Share This Article</h3>
          <p className={styles.subtitle}>Help others discover this content.</p>
        </div>
      </div>

      {/* ================================================= */}
      {/* SHARE BUTTONS */}
      {/* ================================================= */}

      <div className={styles.buttons}>
        {/* FACEBOOK */}

        <FacebookShareButton
          url={shareUrl}
          hashtag="#realestate"
          className={styles.button}
        >
          <FacebookIcon size={18} round />
          <span>Facebook</span>
        </FacebookShareButton>

        {/* X / TWITTER */}

        <XShareButton url={shareUrl} title={title} className={styles.button}>
          <XIcon size={18} round />
          <span>X / Twitter</span>
        </XShareButton>

        {/* LINKEDIN */}

        <LinkedinShareButton
          url={shareUrl}
          title={title}
          summary={excerpt}
          className={styles.button}
        >
          <LinkedinIcon size={18} round />
          <span>LinkedIn</span>
        </LinkedinShareButton>

        {/* WHATSAPP */}

        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=" - "
          className={styles.button}
        >
          <WhatsappIcon size={18} round />
          <span>WhatsApp</span>
        </WhatsappShareButton>

        {/* COPY LINK */}

        <button
          type="button"
          aria-label="Copy blog link"
          className={styles.button}
          onClick={handleCopy}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span>{copied ? "Copied" : "Copy Link"}</span>
        </button>

        {/* NATIVE SHARE */}

        <button
          type="button"
          aria-label="Share article"
          className={styles.primaryButton}
          onClick={handleNativeShare}
        >
          <Share2 size={18} />
          <span>Share Now</span>
        </button>
      </div>
    </section>
  );
}
