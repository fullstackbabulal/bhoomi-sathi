"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Hero = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    router.push(`/properties?location=${location}`);
  };

  return (
    <div className="bg-dark text-white text-center py-5">
      <h1>Find Your Dream Property</h1>
      <p>Search plots, flats, and homes in your area</p>

      <div className="d-flex justify-content-center mt-3">
        <input
          type="text"
          placeholder="Enter location..."
          className="form-control w-50 me-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;
