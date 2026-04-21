import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";

export default async function HomePage() {
  let properties: any[] = [];

  try {
    const res = await getProperties();

    // ✅ SAFE ACCESS
    properties = res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  return (
    <div className="container mt-4">
      <h2>Featured Properties</h2>

      <div className="row">
        {properties.length > 0 ? (
          properties.map((p: any) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <PropertyCard property={p} />
            </div>
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
}