import AppNavbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";

export default async function HomePage() {
  const res = await getProperties({ limit: 6 });
  const properties = res.data.data;

  return (
    <>
      <AppNavbar />

      <div className="container mt-4">
        <h1>Find Your Dream Property</h1>

        <div className="row">
          {properties.map((p: any) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}