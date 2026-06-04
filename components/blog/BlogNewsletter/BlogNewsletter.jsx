"use client";

// ======================================================
// File: components/blog/BlogNewsletter/BlogNewsletter.jsx
// Description: Blog Newsletter Card
// UI Match: Plot in Patna Blog Page
// ======================================================

import { useState } from "react";

import styles from "./BlogNewsletter.module.css";

import { Mail, SendHorizonal } from "lucide-react";

// ======================================================
// COMPONENT
// ======================================================

export default function BlogNewsletter({
  title = "Subscribe to Our Newsletter",

  subtitle = "Get real estate insights, investment tips, property trends and expert guidance delivered straight to your inbox.",

  buttonText = "Subscribe",

  onSubscribe = () => {},
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    onSubscribe(email);

    setEmail("");
  };

  return (
    <section className={styles.card}>
      {/* ICON */}
      <div className={styles.iconBox}>
        <Mail size={32} />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* FORM */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          <span>{buttonText}</span>

          <SendHorizonal size={18} />
        </button>
      </form>
    </section>
  );
}
