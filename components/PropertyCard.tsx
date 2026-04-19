import Link from "next/link";

export default function PropertyCard({ property }: any) {
  return (
    <div className="card shadow-sm">
      <img
        src={property.thumbnail}
        className="card-img-top"
        alt={property.title}
      />
      <div className="card-body">
        <h5>{property.title}</h5>
        <p>₹ {property.price}</p>
        <Link href={`/properties/${property.slug}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}