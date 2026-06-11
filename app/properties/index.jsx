import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buildQuery } from "../../utils/queryParams";
import { fetchProperties } from "../../services/propertyApi";
import FilterSidebar from "../../components/FilterSidebar";
import { useRouter } from "next/router";

const PropertiesPage = () => {
  const filters = useSelector((state) => state.filters);
  const [properties, setProperties] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const query = buildQuery(filters);

    // URL Sync
    router.push(`/properties?${query}`, undefined, { shallow: true });

    const load = async () => {
      const data = await fetchProperties(query);
      setProperties(data);
    };

    const delay = setTimeout(load, 400); // debounce
    return () => clearTimeout(delay);
  }, [filters]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar />
        </div>

        <div className="col-md-9">
          <h5>{properties.length} Properties Found</h5>

          {properties.map((p) => (
            <div key={p._id} className="card mb-3">
              <div className="card-body">
                <h6>{p.title}</h6>
                <p>{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
