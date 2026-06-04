"use client";

// ======================================================
// File: components/admin/blogs/FeaturedImageUpload/FeaturedImageUpload.jsx
// Description: Featured Image Upload Card
// Production Ready
// ======================================================

import { useMemo, useRef, useState } from "react";

import Image from "next/image";
import axios from "axios";

import styles from "./FeaturedImageUpload.module.css";

import {
  ImagePlus,
  Upload,
  Trash2,
  RefreshCcw,
  Loader2,
  CheckCircle2,
} from "lucide-react";

// ======================================================
// HELPERS
// ======================================================

const slugify = (text = "") => {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function FeaturedImageUpload({
  image = "",

  onChange,

  onRemove,

  title = "",

  slug = "",
}) {
  // ====================================================
  // STATE
  // ====================================================

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

  // ====================================================
  // ENV
  // ====================================================

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // ====================================================
  // SAFE BLOG DATA
  // prevents general-blog
  // ====================================================

  const safeTitle = String(title || "").trim();

  const safeSlug = String(slug || "").trim();

  const uploadSlug = safeSlug || slugify(safeTitle) || "general-blog";

  // ====================================================
  // HELPERS
  // ====================================================

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const resetState = () => {
    setSelectedFile(null);

    setUploadSuccess(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ====================================================
  // FILE CHANGE
  // ====================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadSuccess(false);

    setSelectedFile(file);
  };

  // ====================================================
  // REMOVE
  // ====================================================

  const handleRemove = () => {
    resetState();

    onRemove?.();
  };

  // ====================================================
  // UPLOAD
  // ====================================================

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");

      return;
    }

    try {
      setUploading(true);

      const payload = new FormData();

      // IMPORTANT:
      // order matters
      payload.append("entity", "blog");

      payload.append("title", safeTitle);

      payload.append("slug", uploadSlug);

      // file LAST
      payload.append("featuredImage", selectedFile);

      const response = await axios.post(
        `${API_URL}/api/blogs/upload-image`,
        payload,
        {
          withCredentials: true,
        },
      );

      const uploadedPath = response?.data?.data?.featuredImage;

      if (!uploadedPath) {
        throw new Error("Upload failed");
      }

      onChange?.(uploadedPath);

      setUploadSuccess(true);

      setSelectedFile(null);
    } catch (error) {
      console.error("Blog image upload error:", error);

      alert(
        error?.response?.data?.message ||
          error.message ||
          "Failed to upload image",
      );
    } finally {
      setUploading(false);
    }
  };

  // ====================================================
  // PREVIEW
  // ====================================================

  const previewUrl = useMemo(() => {
    // uploaded image
    if (image && typeof image === "string") {
      if (image.startsWith("http")) {
        return image;
      }

      return `${API_URL}${image}`;
    }

    // local file preview
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return null;
  }, [image, selectedFile, API_URL]);

  // ====================================================
  // RENDER
  // ====================================================

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

      {previewUrl ? (
        <div className={styles.previewWrapper}>
          <div className={styles.preview}>
            <Image
              src={previewUrl}
              alt="Featured Image"
              fill
              className={styles.image}
              unoptimized
            />
          </div>

          <div className={styles.actions}>
            {selectedFile && !image && (
              <button
                type="button"
                className={styles.uploadButton}
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload Image
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={openFilePicker}
              disabled={uploading}
            >
              <RefreshCcw size={18} />
              Replace
            </button>

            <button
              type="button"
              className={styles.removeBtn}
              onClick={handleRemove}
              disabled={uploading}
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>

          {uploadSuccess && image && (
            <div className={styles.success}>
              <CheckCircle2 size={18} />
              Image uploaded successfully
            </div>
          )}
        </div>
      ) : (
        <div className={styles.uploadBox} onClick={openFilePicker}>
          <div className={styles.uploadIcon}>
            <Upload size={28} />
          </div>

          <h3 className={styles.uploadTitle}>Upload Blog Image</h3>

          <p className={styles.uploadText}>
            Select an image and upload immediately
          </p>

          <button type="button" className={styles.uploadButton}>
            Choose Image
          </button>
        </div>
      )}

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
