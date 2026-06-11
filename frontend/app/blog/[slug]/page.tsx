// ======================================================
// File: app/blog/[slug]/page.tsx
// Description: Single Blog Detail Page
// UI Match: Plot in Patna Blog Detail Page
// ======================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import BlogSinglePage from "@/components/blog-detail/BlogSinglePage";

import { getBlogBySlug, getRelatedBlogs } from "@/services/blog.service";

// ======================================================
// TYPES
// ======================================================

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// ======================================================
// FETCH BLOG
// ======================================================

async function getBlog(slug: string) {
  try {
    if (!slug?.trim()) {
      return null;
    }

    const response = await getBlogBySlug(slug);

    return response?.data || response || null;
  } catch (error) {
    console.error("Blog Fetch Error:", error);

    return null;
  }
}

// ======================================================
// FETCH RELATED BLOGS
// ======================================================

async function getRelated(id: string) {
  try {
    if (!id) {
      return [];
    }

    const response = await getRelatedBlogs(id);

    return response?.data || response || [];
  } catch (error) {
    console.error("Related Blog Error:", error);

    return [];
  }
}

// ======================================================
// SEO METADATA
// ======================================================

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog | Plot in Patna",

      description: "Read expert real estate insights from Plot in Patna.",
    };
  }

  return {
    title: `${blog.title} | Plot in Patna`,

    description:
      blog.metaDescription ||
      blog.excerpt ||
      "Read expert real estate insights.",

    openGraph: {
      title: blog.title,

      description:
        blog.metaDescription ||
        blog.excerpt ||
        "Read expert real estate insights.",

      images: [blog.featuredImage || blog.coverImage || ""],
    },
  };
}

// ======================================================
// PAGE
// ======================================================

export default async function BlogDetailPage({ params }: Props) {
  // ====================================================
  // PARAMS
  // ====================================================

  const { slug } = await params;

  // ====================================================
  // FETCH BLOG
  // ====================================================

  const blog = await getBlog(slug);

  // ====================================================
  // NOT FOUND UI
  // ====================================================

  if (!blog) {
    return (
      <>
        {/* NAVBAR */}
        <Navbar />

        {/* EMPTY STATE */}
        <main
          style={{
            minHeight: "60vh",
            padding: "6rem 2rem",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1>Blog not found</h1>

          <p>The article you are looking for does not exist.</p>
        </main>

        {/* FOOTER */}
        <Footer />
      </>
    );
  }

  // ====================================================
  // FETCH RELATED POSTS
  // ====================================================

  const relatedPosts = await getRelated(blog._id);

  // ====================================================
  // COMMENTS
  // ====================================================

  const comments = blog.comments || [];

  // ====================================================
  // JSON-LD
  // ====================================================

  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "BlogPosting",

    headline: blog.title,

    image: blog.featuredImage || blog.coverImage || "",

    datePublished: blog.publishedAt || blog.createdAt || "",

    author: {
      "@type": "Person",

      name: blog?.author?.name || "Plot in Patna",
    },

    description: blog.metaDescription || blog.excerpt || "",
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* BLOG PAGE */}
      <BlogSinglePage
        blog={blog}
        relatedPosts={relatedPosts}
        comments={comments}
      />

      {/* FOOTER */}
      <Footer />

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}
