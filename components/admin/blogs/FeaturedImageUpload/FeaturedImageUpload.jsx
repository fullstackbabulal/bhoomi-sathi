"use client";

// ======================================================
// File: components/admin/blogs/FeaturedImageUpload/FeaturedImageUpload.jsx
// Description: Featured Image Upload Card
// ======================================================

import { useRef, useState, useMemo } from "react";

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

export default function FeaturedImageUpload({
  image = "",
  onChange,
  onRemove,
  title = "",
  slug = "",
}) {
  // ======================================================
  // STATE
  // ======================================================

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

  // ======================================================
  // ENV
  // ======================================================

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // ======================================================
  // HELPERS
  // ======================================================

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const resetLocalState = () => {
    setSelectedFile(null);

    setUploadSuccess(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Reset success state
    setUploadSuccess(false);

    // Local preview only
    setSelectedFile(file);
  };

  const handleRemove = () => {
    resetLocalState();

    if (onRemove) {
      onRemove();
    }
  };

  // ======================================================
  // IMMEDIATE IMAGE UPLOAD
  // ======================================================

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");

      return;
    }

    try {
      setUploading(true);

      const payload = new FormData();

      /**
       * IMPORTANT
       * entity=blog
       */
      payload.append("entity", "blog");

      payload.append("title", title || "");

      payload.append("slug", slug || "");

      payload.append("featuredImage", selectedFile);

      /**
       * IMPORTANT
       * Cookie auth support
       *
       * Backend uses:
       * HttpOnly token cookie
       *
       * So:
       * withCredentials=true
       */
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

      /**
       * Return uploaded path
       *
       * Example:
       * /uploads/images/blog/my-blog/image.webp
       */
      if (onChange) {
        onChange(uploadedPath);
      }

      setUploadSuccess(true);

      alert(response?.data?.message || "Image uploaded successfully");
    } catch (error) {
      console.error("Blog image upload error:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload image",
      );
    } finally {
      setUploading(false);
    }
  };

  // ======================================================
  // PREVIEW URL
  // ======================================================

  const previewUrl = useMemo(() => {
    /**
     * Uploaded image path
     * string support
     */
    if (image && typeof image === "string") {
      if (image.startsWith("http")) {
        return image;
      }

      return `${API_URL}${image}`;
    }

    /**
     * Local file preview
     */
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return null;
  }, [image, selectedFile, API_URL]);

  // ======================================================
  // RENDER
  // ======================================================

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

      {/* PREVIEW */}
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
            {/* Upload button only before upload */}
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
