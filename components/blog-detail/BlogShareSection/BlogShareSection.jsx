"use client";

// ======================================================
// File: components/blog-detail/BlogShareSection/BlogShareSection.jsx
// Description: Blog Share Section
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import { useState } from "react";

import styles from "./BlogShareSection.module.css";

import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogShareSection({
  title = "Why Real Estate is the Smartest Investment",

  slug = "real-estate-investment",

  excerpt = "Learn smarter real estate strategies and investment insights.",

  url = "",
}) {
  const [copied, setCopied] = useState(false);

  // ====================================================
  // URL
  // ====================================================

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const shareUrl = url || `${siteUrl}/blog/${slug}`;

  // ====================================================
  // SHARE LINKS
  // ====================================================

  const encodedUrl = encodeURIComponent(shareUrl);

  const encodedTitle = encodeURIComponent(title);

  const encodedExcerpt = encodeURIComponent(excerpt);

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const whatsappShare = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  // ====================================================
  // HANDLERS
  // ====================================================

  const openShareWindow = (shareUrl) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=700,height=600");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        });
      }
    } catch (error) {
      console.error(error);
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
        <button
          type="button"
          className={styles.button}
          onClick={() => openShareWindow(facebookShare)}
        >
          <Facebook size={18} />
          Facebook
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => openShareWindow(twitterShare)}
        >
          <Twitter size={18} />X / Twitter
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => openShareWindow(linkedinShare)}
        >
          <Linkedin size={18} />
          LinkedIn
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => openShareWindow(whatsappShare)}
        >
          <MessageCircle size={18} />
          WhatsApp
        </button>

        <button type="button" className={styles.button} onClick={handleCopy}>
          {copied ? <Check size={18} /> : <Copy size={18} />}

          {copied ? "Copied" : "Copy Link"}
        </button>

        {/* MOBILE NATIVE SHARE */}
        <button
          type="button"
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
