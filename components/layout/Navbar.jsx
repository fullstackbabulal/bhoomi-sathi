"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-3">
      <Link className="navbar-brand fw-bold" href="/">
        Bhoomi Sathi
      </Link>

      <div className="ms-auto">
        <Link href="/properties" className="btn btn-outline-primary">
          Browse Properties
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
