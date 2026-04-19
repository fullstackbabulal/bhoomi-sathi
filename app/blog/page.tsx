import { getBlogs } from "@/lib/api";

export default async function BlogPage() {
  const res = await getBlogs();
  const blogs = res.data.data;

  return (
    <div className="container mt-4">
      <h1>Blog</h1>

      {blogs.map((b: any) => (
        <div key={b._id} className="mb-3">
          <a href={`/blog/${b.slug}`}>
            <h3>{b.title}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}