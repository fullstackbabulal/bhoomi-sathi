import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/comments/CommentSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  params: {
    slug: string;
  };
};

// 🔷 Fetch Blog Data (SSR)
async function getBlog(slug: string) {
  const res = await fetch(`${API_URL}/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

// 🔷 SEO Metadata
export async function generateMetadata({ params }: Props) {
  const blog = await getBlog(params.slug);

  return {
    title: `${blog.title} | Bhoomi Sathi`,
    description: blog.metaDescription || blog.content?.slice(0, 150),
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      images: [blog.coverImage],
    },
  };
}

// 🔷 Page Component
export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlog(params.slug);

  return (
    <div className="container py-4">
      {/* 🔷 Title */}
      <h1 className="mb-3">{blog.title}</h1>

      {/* 🔷 Cover Image */}
      {blog.coverImage && (
        <div className="mb-4">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            width={800}
            height={400}
            className="img-fluid rounded"
          />
        </div>
      )}

      {/* 🔷 Meta Info */}
      <p className="text-muted">
        By {blog.author || "Admin"} |{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {/* 🔷 Content */}
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* 🔷 Tags */}
      {blog.tags?.length > 0 && (
        <div className="mb-4">
          <strong>Tags: </strong>
          {blog.tags.map((tag: string, i: number) => (
            <span key={i} className="badge bg-secondary me-2">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 🔷 CTA (Lead Capture for Real Estate Blog) */}
      <div className="card p-3 mb-4">
        <h5>Interested in Property?</h5>
        <p>Contact Bhoomi Sathi for best deals.</p>

        <div className="d-flex gap-2">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            className="btn btn-success"
          >
            WhatsApp
          </a>

          <a href="tel:9876543210" className="btn btn-primary">
            Call Now
          </a>
        </div>
        <div className="d-flex gap-2">
          <CommentSection blogId={blog._id} />
        </div>
      </div>

      {/* 🔷 Back to Blog */}
      <Link href="/blog">← Back to Blog</Link>

      {/* 🔷 Structured Data (SEO Boost) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: blog.coverImage,
            datePublished: blog.createdAt,
            author: {
              "@type": "Person",
              name: blog.author || "Admin",
            },
            description: blog.metaDescription,
          }),
        }}
      />
    </div>
  );
}