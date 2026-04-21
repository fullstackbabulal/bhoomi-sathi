import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  searchParams: {
    page?: string;
  };
};

// 🔷 Fetch Blogs (SSR with pagination)
async function getBlogs(page: number) {
  const res = await fetch(`${API_URL}/blogs?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

// 🔷 SEO Metadata
export async function generateMetadata() {
  return {
    title: "Real Estate Blog | Bhoomi Sathi",
    description:
      "Latest real estate tips, property investment guides, and land buying insights.",
  };
}

// 🔷 Page Component
export default async function BlogPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;

  const data = await getBlogs(currentPage);

  const blogs = data.blogs || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="container py-4">
      {/* 🔷 Heading */}
      <h1 className="mb-4">Real Estate Blog</h1>

      {/* 🔷 Blog Grid */}
      <div className="row">
        {blogs.map((blog: any) => (
          <div key={blog._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {/* Image */}
              {blog.coverImage && (
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="card-img-top"
                />
              )}

              {/* Content */}
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>

                <p className="card-text text-muted">
                  {blog.metaDescription?.slice(0, 100)}...
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="btn btn-primary btn-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔷 Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        {currentPage > 1 && (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className="btn btn-outline-dark"
          >
            Previous
          </Link>
        )}

        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className="btn btn-outline-dark"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}