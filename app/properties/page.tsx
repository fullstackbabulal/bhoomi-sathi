import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";

export default async function PropertiesPage() {
  const res = await getProperties();
  const properties = res.data.data;

  return (
    <div className="container mt-4">
      <h1>All Properties</h1>

      <div className="row">
        {properties.map((p: any) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </div>
  );
}