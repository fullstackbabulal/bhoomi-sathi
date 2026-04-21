import PropertyCard from "@/components/PropertyCard";

const FeaturedProperties = ({ properties }) => {
  // ✅ safety guard
  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    <div className="container mt-5">
      <h3>Featured Properties</h3>

      <div className="row">
        {safeProperties.slice(0, 6).map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
