import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  params: {
    slug: string;
  };
};

// 🔷 Fetch Property Data (SSR)
async function getProperty(slug: string) {
  const res = await fetch(`${API_URL}/properties/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  return res.json();
}

// 🔷 SEO Metadata
export async function generateMetadata({ params }: Props) {
  const property = await getProperty(params.slug);

  return {
    title: `${property.title} | Bhoomi Sathi`,
    description: property.description?.slice(0, 150),
    openGraph: {
      title: property.title,
      description: property.description,
      images: [property.images?.[0]],
    },
  };
}

// 🔷 Page Component
export default async function PropertyDetailPage({ params }: Props) {
  const property = await getProperty(params.slug);

  return (
    <div className="container py-4">
      {/* 🔷 Title */}
      <h1 className="mb-3">{property.title}</h1>

      {/* 🔷 Image Gallery */}
      <div className="row mb-4">
        {property.images?.map((img: string, i: number) => (
          <div key={i} className="col-md-4 mb-3">
            <Image
              src={img}
              alt={property.title}
              width={400}
              height={300}
              className="img-fluid rounded"
            />
          </div>
        ))}
      </div>

      {/* 🔷 Price + Info */}
      <div className="card p-3 mb-4">
        <h3 className="text-primary">₹ {property.price}</h3>
        <p>
          <strong>Location:</strong> {property.city}
        </p>
        <p>
          <strong>Type:</strong> {property.type}
        </p>
        <p>
          <strong>Area:</strong> {property.area} sq.ft
        </p>
      </div>

      {/* 🔷 Description */}
      <div className="mb-4">
        <h4>Description</h4>
        <p>{property.description}</p>
      </div>

      {/* 🔷 CTA Buttons */}
      <div className="d-flex gap-3 mb-4">
        <a
          href={`https://wa.me/91${property.contactNumber}?text=I am interested in ${property.title}`}
          target="_blank"
          className="btn btn-success"
        >
          WhatsApp
        </a>

        <a href={`tel:${property.contactNumber}`} className="btn btn-primary">
          Call Now
        </a>
      </div>

      {/* 🔷 Enquiry Form */}
      <div className="card p-3">
        <h4>Send Enquiry</h4>

        <form method="POST" action={`${API_URL}/enquiry`}>
          <input
            type="hidden"
            name="propertyId"
            value={property._id}
          />

          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="message"
              placeholder="Message"
              className="form-control"
              rows={3}
            />
          </div>

          <button className="btn btn-dark w-100">Submit</button>
        </form>
      </div>

      {/* 🔷 Back Link */}
      <div className="mt-4">
        <Link href="/properties">← Back to Properties</Link>
      </div>

      {/* 🔷 Structured Data (SEO Boost) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: property.title,
            description: property.description,
            image: property.images,
            offers: {
              "@type": "Offer",
              price: property.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </div>
  );
}