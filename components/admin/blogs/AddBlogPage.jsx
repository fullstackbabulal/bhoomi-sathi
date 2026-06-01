"use client";

// ======================================================
// File: components/admin/blogs/AddBlogPage.jsx
// Description: Add Blog Page
// ======================================================

import { useState } from "react";

import AddBlogLayout from "@/components/admin/blogs/AddBlogLayout/AddBlogLayout";

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

  const [featuredImage, setFeaturedImage] = useState(null);

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

  const resetForm = () => {
    setFormData(getInitialFormData());

    setFeaturedImage(null);
  };

  const buildFormData = (status) => {
    const payload = new FormData();

    payload.append("title", formData.title);

    payload.append("slug", formData.slug);

    payload.append("excerpt", formData.excerpt);

    payload.append("content", formData.content);

    payload.append("status", status);

    payload.append("category", formData.category);

    payload.append("tags", formData.tags);

    payload.append("publishDate", formData.publishDate);

    payload.append("metaTitle", formData.metaTitle);

    payload.append("metaDescription", formData.metaDescription);

    payload.append("focusKeyword", formData.focusKeyword);

    if (featuredImage) {
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

      return updated;
    });
  };

  // ====================================================
  // IMAGE HANDLERS
  // ====================================================

  const handleImageChange = (file) => {
    setFeaturedImage(file);
  };

  const handleImageRemove = () => {
    setFeaturedImage(null);
  };

  // ====================================================
  // SAVE DRAFT
  // ====================================================

  const handleSaveDraft = async () => {
    try {
      setLoading(true);

      console.log("🔥 SAVE DRAFT CLICKED");

      const payload = buildFormData("draft");

      const response = await createBlog(payload);

      console.log("✅ Draft Response:", response);

      alert(response.message || "Draft saved successfully");

      // Keep form for draft
    } catch (error) {
      console.error("❌ Draft Error:", error);

      alert(error?.message || "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // PUBLISH BLOG
  // ====================================================

  const handlePublish = async () => {
    try {
      setLoading(true);

      console.log("🔥 PUBLISH CLICKED");

      // Validation
      if (!formData.title || !formData.content || !formData.category) {
        alert("Title, content and category are required.");

        return;
      }

      const payload = buildFormData("published");

      console.log("📦 Payload Ready");

      const response = await createBlog(payload);

      console.log("✅ Publish Response:", response);

      alert(response.message || "Blog published successfully");

      // Clear form after publish
      resetForm();
    } catch (error) {
      console.error("❌ Publish Error:", error);

      alert(error?.message || "Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
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
  );
}
