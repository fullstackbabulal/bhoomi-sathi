"use client";

// ======================================================
// File: components/admin/blogs/AddBlogPage.jsx
// Description: Add Blog Page
// Admin Protected
// ======================================================

import { useState } from "react";

import AddBlogLayout from "@/components/admin/blogs/AddBlogLayout/AddBlogLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { createBlog } from "@/services/blog.service";

// ======================================================
// HELPERS
// ======================================================

const getInitialFormData = () => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "",

  status: "draft",
  category: "",
  tags: "",
  publishDate: "",

  metaTitle: "",
  metaDescription: "",
  focusKeyword: "",
});

// ======================================================
// COMPONENT
// ======================================================

export default function AddBlogPage() {
  // ====================================================
  // STATE
  // ====================================================

  const [loading, setLoading] = useState(false);

  /**
   * IMPORTANT:
   * featuredImage is now
   * STRING PATH
   *
   * Example:
   * /uploads/images/blog/my-blog/image.webp
   */
  const [featuredImage, setFeaturedImage] = useState("");

  const [formData, setFormData] = useState(getInitialFormData());

  // ====================================================
  // CATEGORY DATA
  // ====================================================

  const categories = [
    "Real Estate",
    "Property Investment",
    "Buying Guide",
    "Selling Tips",
    "Home Loan",
    "Commercial Property",
  ];

  // ====================================================
  // HELPERS
  // ====================================================

  const generateSlug = (value = "") => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  };

  const validatePublish = () => {
    if (!formData.title?.trim()) {
      alert("Blog title is required.");

      return false;
    }

    if (!formData.content?.trim()) {
      alert("Blog content is required.");

      return false;
    }

    if (!formData.category?.trim()) {
      alert("Blog category is required.");

      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData(getInitialFormData());

    setFeaturedImage("");
  };

  const buildFormData = (status) => {
    const payload = new FormData();

    payload.append("title", formData.title?.trim() || "");

    payload.append(
      "slug",
      formData.slug?.trim() || generateSlug(formData.title),
    );

    payload.append("excerpt", formData.excerpt?.trim() || "");

    payload.append("content", formData.content || "");

    payload.append("status", status);

    payload.append("category", formData.category || "");

    payload.append("tags", formData.tags || "");

    payload.append("publishDate", formData.publishDate || "");

    payload.append("metaTitle", formData.metaTitle?.trim() || "");

    payload.append("metaDescription", formData.metaDescription?.trim() || "");

    payload.append("focusKeyword", formData.focusKeyword?.trim() || "");

    /**
     * IMPORTANT
     * entity=blog
     */
    payload.append("entity", "blog");

    /**
     * IMPORTANT
     * featuredImage
     * string path
     */
    if (featuredImage && typeof featuredImage === "string") {
      payload.append("featuredImage", featuredImage);
    }

    return payload;
  };

  // ====================================================
  // FORM HANDLERS
  // ====================================================

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = {
        ...prev,

        [field]: value,
      };

      // Auto slug
      if (field === "title" && !prev.slug) {
        updated.slug = generateSlug(value);
      }

      // Auto SEO title
      if (field === "title" && !prev.metaTitle) {
        updated.metaTitle = value;
      }

      // Auto meta description
      if (field === "excerpt" && !prev.metaDescription) {
        updated.metaDescription = value;
      }

      // Manual slug sanitize
      if (field === "slug") {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  // ====================================================
  // IMAGE HANDLERS
  // ====================================================

  /**
   * Receives uploaded
   * image path
   *
   * Example:
   * /uploads/images/blog/my-blog/image.webp
   */
  const handleImageChange = (uploadedImagePath) => {
    setFeaturedImage(uploadedImagePath || "");
  };

  const handleImageRemove = () => {
    setFeaturedImage("");
  };

  // ====================================================
  // SAVE DRAFT
  // ====================================================

  const handleSaveDraft = async () => {
    try {
      setLoading(true);

      const payload = buildFormData("draft");

      const response = await createBlog(payload);

      alert(response?.message || "Draft saved successfully");
    } catch (error) {
      console.error("Draft save error:", error);

      alert(error?.message || "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // PUBLISH BLOG
  // ====================================================

  const handlePublish = async () => {
    if (!validatePublish()) {
      return;
    }

    try {
      setLoading(true);

      const payload = buildFormData("published");

      const response = await createBlog(payload);

      alert(response?.message || "Blog published successfully");

      /**
       * Reset form
       * after publish
       */
      resetForm();
    } catch (error) {
      console.error("Publish error:", error);

      alert(error?.message || "Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AddBlogLayout
        formData={formData}
        categories={categories}
        loading={loading}
        featuredImage={featuredImage}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onImageRemove={handleImageRemove}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />
    </ProtectedRoute>
  );
}
