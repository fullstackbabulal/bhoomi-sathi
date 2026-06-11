"use client";

// ======================================================
// File: components/admin/blogs/AddBlogLayout/AddBlogLayout.tsx
// Description: Add Blog Page Layout Wrapper
// ======================================================

import styles from "./AddBlogLayout.module.css";

import BlogPageHeader from "../BlogPageHeader/BlogPageHeader";
import BlogDetailsCard from "../BlogDetailsCard/BlogDetailsCard";
import FeaturedImageUpload from "../FeaturedImageUpload/FeaturedImageUpload";
import BlogEditor from "../BlogEditor/BlogEditor";
import PublishSettings from "../PublishSettings/PublishSettings";
import SEOSettings from "../SEOSettings/SEOSettings";

// ======================================================
// TYPES
// ======================================================

export interface BlogFormData {
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

interface AddBlogLayoutProps {
  formData: BlogFormData;

  categories: string[];

  loading?: boolean;

  featuredImage?: File | string | null;

  onChange?: (field: keyof BlogFormData, value: string) => void;

  onImageChange?: (file: any) => void;

  onImageRemove?: () => void;

  onSaveDraft?: () => void | Promise<void>;

  onPublish?: () => void | Promise<void>;
}

// ======================================================
// COMPONENT
// ======================================================

export default function AddBlogLayout({
  formData,
  categories,
  loading = false,
  featuredImage = null,

  onChange = () => {},
  onImageChange = () => {},
  onImageRemove = () => {},

  onSaveDraft = () => {},
  onPublish = () => {},
}: AddBlogLayoutProps) {
  // ====================================================
  // FIELD CHANGE HANDLER
  // ====================================================

  const handleFieldChange = (field: keyof BlogFormData, value: string) => {
    onChange(field, value);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* ==========================================
            PAGE HEADER
        ========================================== */}
        <BlogPageHeader
          loading={loading}
          onSaveDraft={onSaveDraft}
          onPublish={onPublish}
        />

        {/* ==========================================
            CONTENT
        ========================================== */}
        <div className={styles.layout}>
          {/* ======================================
              LEFT COLUMN
          ====================================== */}
          <div className={styles.leftColumn}>
            <BlogDetailsCard formData={formData} onChange={handleFieldChange} />

            <BlogEditor
              content={formData.content}
              onChange={(value: string) => handleFieldChange("content", value)}
            />

            <SEOSettings formData={formData} onChange={handleFieldChange} />
          </div>

          {/* ======================================
              RIGHT COLUMN
          ====================================== */}
          <aside className={styles.rightColumn}>
            <FeaturedImageUpload
              image={featuredImage}
              title={formData?.title}
              slug={formData?.slug}
              onChange={onImageChange}
              onRemove={onImageRemove}
            />

            <PublishSettings
              formData={formData}
              categories={categories}
              onChange={handleFieldChange}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
