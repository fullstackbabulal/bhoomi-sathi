"use client";

// ======================================================
// File: components/admin/blogs/FeaturedImageUpload/FeaturedImageUpload.jsx
// Description: Featured Image Upload Card
// ======================================================

import { useRef } from "react";
import Image from "next/image";
import styles from "./FeaturedImageUpload.module.css";

import { ImagePlus, Upload, Trash2, RefreshCcw } from "lucide-react";

export default function FeaturedImageUpload({
  image = null,
  onChange,
  onRemove,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (onChange) {
      onChange(file);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const previewUrl = image instanceof File ? URL.createObjectURL(image) : image;

  return (
    <section className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <ImagePlus size={22} />
        </div>

        <div>
          <h2 className={styles.title}>Featured Image</h2>

          <p className={styles.subtitle}>
            Upload a featured image for your blog post
          </p>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {previewUrl ? (
        <div className={styles.previewWrapper}>
          <div className={styles.preview}>
            <Image
              src={previewUrl}
              alt="Featured Preview"
              fill
              className={styles.image}
              unoptimized
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={openFilePicker}
            >
              <RefreshCcw size={18} />
              Replace
            </button>

            <button
              type="button"
              className={styles.removeBtn}
              onClick={onRemove}
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.uploadBox} onClick={openFilePicker}>
          <div className={styles.uploadIcon}>
            <Upload size={28} />
          </div>

          <h3 className={styles.uploadTitle}>Upload Blog Image</h3>

          <p className={styles.uploadText}>
            Drag & drop image or click to browse
          </p>

          <button type="button" className={styles.uploadButton}>
            Choose Image
          </button>
        </div>
      )}

      {/* INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </section>
  );
}
