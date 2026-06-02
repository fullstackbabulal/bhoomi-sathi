"use client";

// ======================================================
// File: app/admin/blogs/add/page.tsx
// Description: Add Blog Page
// ======================================================

import { useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AddBlogLayout from "@/components/admin/blogs/AddBlogLayout/AddBlogLayout";

import { createBlog } from "@/services/blog.service";

// ======================================================
// TYPES
// ======================================================

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  status: string;
  category: string;
  tags: string;
  publishDate: string;

  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
}

// ======================================================
// HELPERS
// ======================================================

const getInitialFormData = (): BlogFormData => ({
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
// PAGE
// ======================================================

export default function Page() {
  // ====================================================
  // STATE
  // ====================================================

  const [loading, setLoading] = useState(false);

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<BlogFormData>(getInitialFormData());

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

  const generateSlug = (value = ""): string => {
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

  const buildFormData = (status: string): FormData => {
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

  const handleChange = (field: keyof BlogFormData, value: string): void => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      if (field === "title" && !prev.slug) {
        updated.slug = generateSlug(value);
      }

      if (field === "title" && !prev.metaTitle) {
        updated.metaTitle = value;
      }

      if (field === "excerpt" && !prev.metaDescription) {
        updated.metaDescription = value;
      }

      return updated;
    });
  };

  // ====================================================
  // IMAGE HANDLERS
  // ====================================================

  const handleImageChange = (file: File): void => {
    setFeaturedImage(file);
  };

  const handleImageRemove = (): void => {
    setFeaturedImage(null);
  };

  // ====================================================
  // SAVE DRAFT
  // ====================================================

  const handleSaveDraft = async (): Promise<void> => {
    try {
      setLoading(true);

      const payload = buildFormData("draft");

      const response = await createBlog(payload);

      alert(response.message || "Draft saved successfully");
    } catch (error: any) {
      console.error(error);

      alert(error?.message || "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // PUBLISH BLOG
  // ====================================================

  const handlePublish = async (): Promise<void> => {
    try {
      setLoading(true);

      if (!formData.title || !formData.content || !formData.category) {
        alert("Title, content and category are required.");

        return;
      }

      const payload = buildFormData("published");

      const response = await createBlog(payload);

      alert(response.message || "Blog published successfully");

      resetForm();
    } catch (error: any) {
      console.error(error);

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
