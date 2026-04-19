import { getPropertyBySlug } from "@/lib/api";

export async function generateMetadata({ params }: any) {
  const res = await getPropertyBySlug(params.slug);
  const property = res.data.data;

  return {
    title: property.seo?.metaTitle || property.title,
    description: property.seo?.metaDescription || property.description,
  };
}

export default async function PropertyDetail({ params }: any) {
  const res = await getPropertyBySlug(params.slug);
  const property = res.data.data;

  return (
    <div className="container mt-4">
      <h1>{property.title}</h1>
      <img src={property.thumbnail} className="img-fluid" />

      <h3>₹ {property.price}</h3>
      <p>{property.description}</p>
    </div>
  );
}