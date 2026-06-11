"use client";

// ======================================================
// File: components/property/add/PropertyMediaCard.jsx
// Description: Property Media Upload Card
// ======================================================

import { useRef, useState } from "react";
import axios from "axios";
import {
  ImageIcon,
  Video,
  UploadCloud,
  Plus,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

import styles from "./PropertyMediaCard.module.css";

// ======================================================
// CONFIG
// ======================================================
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ======================================================
// COMPONENT
// ======================================================
const PropertyMediaCard = ({ formData, updateField }) => {
  const thumbnailRef = useRef(null);

  const galleryRef = useRef(null);

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const [uploadingGallery, setUploadingGallery] = useState(false);

  // ======================================================
  // SLUG GENERATOR
  // ======================================================
  const getSlug = () => {
    if (formData?.slug?.trim()) {
      return formData.slug.trim();
    }

    return (
      formData?.title
        ?.toLowerCase()
        ?.trim()
        ?.replace(/[^a-z0-9]+/g, "-")
        ?.replace(/(^-|-$)+/g, "") || "property"
    );
  };

  // ======================================================
  // THUMBNAIL PICK
  // ======================================================
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    updateField("thumbnail", {
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeThumbnail = () => {
    updateField("thumbnail", null);
  };

  // ======================================================
  // GALLERY PICK
  // ======================================================
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    updateField("images", [...(formData.images || []), ...newImages]);
  };

  const removeImage = (index) => {
    updateField(
      "images",
      (formData.images || []).filter((_, i) => i !== index),
    );
  };

  // ======================================================
  // UPLOAD THUMBNAIL
  // ======================================================
  const uploadThumbnail = async () => {
    try {
      if (!formData?.thumbnail?.file) {
        alert("Please select thumbnail.");
        return;
      }

      const slug = getSlug();

      setUploadingThumbnail(true);

      const form = new FormData();

      form.append("title", formData.title || "");

      form.append("slug", slug);

      form.append("thumbnail", formData.thumbnail.file);

      const response = await axios.post(
        `${API_URL}/api/properties/upload-media`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        updateField("slug", slug);

        updateField("uploadedThumbnail", response.data.data.thumbnail);

        alert("Thumbnail uploaded successfully");
      }
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Thumbnail upload failed");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  // ======================================================
  // UPLOAD GALLERY
  // ======================================================
  const uploadGallery = async () => {
    try {
      if (!formData?.images?.length) {
        alert("Please select gallery images.");
        return;
      }

      const slug = getSlug();

      setUploadingGallery(true);

      const form = new FormData();

      form.append("title", formData.title || "");

      form.append("slug", slug);

      (formData.images || []).forEach((image) => {
        if (image.file) {
          form.append("images", image.file);
        }
      });

      const response = await axios.post(
        `${API_URL}/api/properties/upload-media`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        updateField("slug", slug);

        updateField("uploadedImages", response.data.data.images);

        alert("Gallery uploaded successfully");
      }
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Gallery upload failed");
    } finally {
      setUploadingGallery(false);
    }
  };

  // ======================================================
  // VIDEOS
  // ======================================================
  const addVideo = () => {
    updateField("videos", [
      ...(formData.videos || []),
      {
        url: "",
      },
    ]);
  };

  const updateVideo = (index, value) => {
    const updatedVideos = [...(formData.videos || [])];

    updatedVideos[index].url = value;

    updateField("videos", updatedVideos);
  };

  const removeVideo = (index) => {
    updateField(
      "videos",
      (formData.videos || []).filter((_, i) => i !== index),
    );
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <ImageIcon size={28} />
          </div>

          <div className={styles.headingArea}>
            <h2 className={styles.title}>Media Gallery</h2>

            <p className={styles.subtitle}>
              Upload thumbnail and gallery images.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        {/* Thumbnail */}
        <div className={styles.section}>
          <label className={styles.label}>Thumbnail</label>

          {!formData.thumbnail ? (
            <button
              type="button"
              onClick={() => thumbnailRef.current?.click()}
              className={styles.uploadBoxLarge}
            >
              <UploadCloud size={42} />
              <h4>Upload Thumbnail</h4>
            </button>
          ) : (
            <div className={styles.thumbnailWrapper}>
              <img
                src={formData.thumbnail.preview}
                alt="thumbnail"
                className={styles.thumbnailImage}
              />

              <button
                type="button"
                onClick={removeThumbnail}
                className={styles.removeButton}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          <input
            hidden
            type="file"
            accept="image/*"
            ref={thumbnailRef}
            onChange={handleThumbnailUpload}
          />

          <button
            type="button"
            onClick={uploadThumbnail}
            disabled={uploadingThumbnail}
            className={styles.addVideoButton}
          >
            {uploadingThumbnail ? (
              <>
                <Loader2 size={16} />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={16} />
                Upload Thumbnail
              </>
            )}
          </button>
        </div>

        {/* Gallery */}
        <div className={styles.section}>
          <label className={styles.label}>Gallery Images</label>

          <div className={styles.galleryGrid}>
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              className={styles.uploadCard}
            >
              <UploadCloud size={24} />
              <span>Add Images</span>
            </button>

            {(formData.images || []).map((image, index) => (
              <div key={index} className={styles.galleryItem}>
                <img
                  src={image.preview}
                  alt="gallery"
                  className={styles.galleryImage}
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className={styles.removeImageButton}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <input
            hidden
            multiple
            type="file"
            ref={galleryRef}
            accept="image/*"
            onChange={handleGalleryUpload}
          />

          <button
            type="button"
            onClick={uploadGallery}
            disabled={uploadingGallery}
            className={styles.addVideoButton}
          >
            {uploadingGallery ? (
              <>
                <Loader2 size={16} />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={16} />
                Upload Gallery
              </>
            )}
          </button>
        </div>

        {/* Videos */}
        <div className={styles.section}>
          <div className={styles.videoHeader}>
            <div className={styles.videoTitleRow}>
              <Video size={18} />

              <label className={styles.label}>Videos</label>
            </div>

            <button
              type="button"
              onClick={addVideo}
              className={styles.addVideoButton}
            >
              <Plus size={16} />
              Add Video
            </button>
          </div>

          {(formData.videos || []).map((video, index) => (
            <div key={index} className={styles.videoRow}>
              <input
                type="text"
                value={video.url}
                placeholder="YouTube URL"
                onChange={(e) => updateVideo(index, e.target.value)}
                className={styles.input}
              />

              <button
                type="button"
                onClick={() => removeVideo(index)}
                className={styles.deleteButton}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyMediaCard;
