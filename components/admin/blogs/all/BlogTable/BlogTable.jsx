"use client";

// ======================================================
// File: admin/blogs/all/BlogTable/BlogTable.jsx
// Description: Blog Listing Table
// ======================================================

import BlogTableRow from "./BlogTableRow";

import styles from "./BlogTable.module.css";

export default function BlogTable({ blogs = [], onRefresh }) {
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        {/* ==========================================
            TABLE HEAD
        ========================================== */}

        <thead>
          <tr>
            <th>Thumbnail</th>

            <th>Title</th>

            <th>Category</th>

            <th>Author</th>

            <th>Status</th>

            <th>Views</th>

            <th>Published</th>

            <th>Actions</th>
          </tr>
        </thead>

        {/* ==========================================
            TABLE BODY
        ========================================== */}

        <tbody>
          {safeBlogs.length > 0 ? (
            safeBlogs.map((blog) => (
              <BlogTableRow key={blog._id} blog={blog} onRefresh={onRefresh} />
            ))
          ) : (
            <tr>
              <td colSpan={8} className={styles.emptyCell}>
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
