// ======================================================
// File: app/blog/[slug]/page.tsx
// Description: Single Blog Detail Page
// UI Match: Bhoomi Sathi Blog Detail Page
// ======================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import BlogPostHero from "@/components/blog-detail/BlogPostHero/BlogPostHero";
import BlogPostLayout from "@/components/blog-detail/BlogPostLayout/BlogPostLayout";

import { getBlogBySlug, getRelatedBlogs } from "@/services/blog.service";

// ======================================================
// TYPES
// ======================================================

type Props = {
  params: {
    slug: string;
  };
};

// ======================================================
// FETCH BLOG
// ======================================================

async function getBlog(slug: string) {
  try {
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
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog | Bhoomi Sathi",
    };
  }

  return {
    title: `${blog.title} | Bhoomi Sathi`,

    description:
      blog.metaDescription ||
      blog.excerpt ||
      "Read expert real estate insights.",

    openGraph: {
      title: blog.title,

      description: blog.metaDescription || blog.excerpt,

      images: [blog.featuredImage || blog.coverImage],
    },
  };
}

// ======================================================
// PAGE
// ======================================================

export default async function BlogDetailPage({ params }: Props) {
  // ====================================================
  // FETCH DATA
  // ====================================================

  const blog = await getBlog(params.slug);

  if (!blog) {
    return (
      <div
        style={{
          padding: "6rem 2rem",
          textAlign: "center",
        }}
      >
        <h1>Blog not found</h1>

        <p>The article you are looking for does not exist.</p>
      </div>
    );
  }

  const relatedPosts = await getRelated(blog._id);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* BLOG HERO */}
      <BlogPostHero
        slug={blog.slug}
        category={blog.category}
        title={blog.title}
        excerpt={blog.excerpt}
        featuredImage={blog.featuredImage || blog.coverImage}
        publishedAt={blog.publishedAt || blog.createdAt}
        readTime={blog.readTime}
        author={blog.author}
      />

      {/* BLOG LAYOUT */}
      <BlogPostLayout blog={blog} relatedPosts={relatedPosts} />

      {/* FOOTER */}
      <Footer />

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",

            "@type": "BlogPosting",

            headline: blog.title,

            image: blog.featuredImage || blog.coverImage,

            datePublished: blog.publishedAt || blog.createdAt,

            author: {
              "@type": "Person",

              name: blog?.author?.name || "Bhoomi Sathi",
            },

            description: blog.metaDescription || blog.excerpt,
          }),
        }}
      />
    </>
  );
}
