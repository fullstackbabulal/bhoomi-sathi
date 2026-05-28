import Image from "next/image";
import Link from "next/link";

// ======================================================
// CONFIG
// ======================================================
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// ======================================================
// FETCH PROPERTY
// ======================================================
async function getProperty(slug: string) {
  const response = await fetch(`${API_URL}/api/properties/slug/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch property: ${response.status}`);
  }

  const data = await response.json();

  return data?.property || data;
}

// ======================================================
// SEO METADATA
// ======================================================
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const property = await getProperty(slug);

    return {
      title: `${property?.title || "Property"} | Bhoomi Sathi`,

      description:
        property?.description?.replace(/<[^>]*>/g, "")?.slice(0, 160) ||
        "Find premium properties on Bhoomi Sathi.",

      openGraph: {
        title: property?.title || "Property",

        description: property?.description?.replace(/<[^>]*>/g, "") || "",

        images: property?.images?.length > 0 ? property.images : [],
      },
    };
  } catch {
    return {
      title: "Property Not Found | Bhoomi Sathi",
    };
  }
}

// ======================================================
// PAGE COMPONENT
// ======================================================
export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;

  const property = await getProperty(slug);

  const images = property?.images || [];

  return (
    <div className="container py-4">
      {/* Title */}
      <h1 className="mb-4">{property?.title}</h1>

      {/* Image Gallery */}
      <div className="row mb-4">
        {images.length > 0 ? (
          images.map((img: string, index: number) => (
            <div key={index} className="col-md-4 mb-3">
              <Image
                src={img}
                alt={property?.title}
                width={400}
                height={300}
                className="img-fluid rounded"
                unoptimized
              />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Property Info */}
      <div className="card p-4 mb-4">
        <h3 className="text-primary">
          ₹ {property?.price?.toLocaleString?.() || 0}
        </h3>

        <p>
          <strong>Type:</strong> {property?.type || "N/A"}
        </p>

        <p>
          <strong>Status:</strong> {property?.status || "N/A"}
        </p>

        <p>
          <strong>Bedrooms:</strong> {property?.bedrooms ?? 0}
        </p>

        <p>
          <strong>Bathrooms:</strong> {property?.bathrooms ?? 0}
        </p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h4>Description</h4>

        <div
          dangerouslySetInnerHTML={{
            __html: property?.description || "",
          }}
        />
      </div>

      {/* CTA */}
      <div className="d-flex gap-3 mb-4">
        <a
          href={`https://wa.me/91${
            property?.contactNumber || ""
          }?text=I am interested in ${property?.title}`}
          target="_blank"
          className="btn btn-success"
        >
          WhatsApp
        </a>

        <a
          href={`tel:${property?.contactNumber || ""}`}
          className="btn btn-primary"
        >
          Call Now
        </a>
      </div>

      {/* Back */}
      <div className="mt-4">
        <Link href="/properties">← Back to Properties</Link>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: property?.title,
            description: property?.description,
            image: property?.images,
            offers: {
              "@type": "Offer",
              price: property?.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </div>
  );
}
