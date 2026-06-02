"use client";

// ======================================================
// File: components/admin/blogs/AddBlogLayout/AddBlogLayout.jsx
// Description: Add Blog Page Layout Wrapper
// ======================================================

import styles from "./AddBlogLayout.module.css";

import BlogPageHeader from "../BlogPageHeader/BlogPageHeader";
import BlogDetailsCard from "../BlogDetailsCard/BlogDetailsCard";
import FeaturedImageUpload from "../FeaturedImageUpload/FeaturedImageUpload";
import BlogEditor from "../BlogEditor/BlogEditor";
import PublishSettings from "../PublishSettings/PublishSettings";
import SEOSettings from "../SEOSettings/SEOSettings";

export default function AddBlogLayout({
  formData = {},
  categories = [],

  loading = false,

  featuredImage = null,

  onChange = () => {},
  onImageChange = () => {},
  onImageRemove = () => {},

  onSaveDraft = () => {},
  onPublish = () => {},
}) {
  const handleFieldChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* PAGE HEADER */}
        <BlogPageHeader
          loading={loading}
          onSaveDraft={onSaveDraft}
          onPublish={onPublish}
        />

        {/* CONTENT */}
        <div className={styles.layout}>
          {/* LEFT COLUMN */}
          <div className={styles.leftColumn}>
            <BlogDetailsCard formData={formData} onChange={handleFieldChange} />

            <BlogEditor
              content={formData.content}
              onChange={(value) => handleFieldChange("content", value)}
            />

            <SEOSettings formData={formData} onChange={handleFieldChange} />
          </div>

          {/* RIGHT COLUMN */}
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
