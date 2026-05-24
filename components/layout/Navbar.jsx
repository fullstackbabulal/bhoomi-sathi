"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();

  const { user, logout, isAuthenticated } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname?.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="position-sticky top-0 w-100"
        style={{
          zIndex: 1100,
          transition: "all 0.3s ease",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: scrolled
            ? "rgba(2,6,23,0.96)"
            : "linear-gradient(90deg, rgba(2,6,23,0.94) 0%, rgba(3,15,44,0.94) 50%, rgba(2,6,23,0.94) 100%)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 12px 30px rgba(0,0,0,0.22)" : "none",
        }}
      >
        <div className="container">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{
              minHeight: "78px",
              padding: "12px 0",
            }}
          >
            {/* LOGO */}
            <Link
              href="/"
              className="text-decoration-none d-flex align-items-center gap-2 gap-sm-3 flex-shrink-0"
            >
              <div
                className="rounded-4 d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
                style={{
                  width: "clamp(46px, 5vw, 58px)",
                  height: "clamp(46px, 5vw, 58px)",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 2 8h1v5a1 1 0 0 0 1 1h3v-3h2v3h3a1 1 0 0 0 1-1V8h1a.5.5 0 0 0 .354-.854l-6-6Z" />
                </svg>
              </div>

              <div style={{ minWidth: 0 }}>
                <h1
                  className="text-white fw-bold mb-0 text-truncate"
                  style={{
                    fontSize: "clamp(1.15rem, 2vw, 2rem)",
                    lineHeight: 1.1,
                  }}
                >
                  Bhoomi Sathi
                </h1>

                <small
                  className="d-none d-sm-block"
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "clamp(.72rem,1vw,.82rem)",
                  }}
                >
                  Your Property, Our Priority
                </small>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="d-none d-lg-flex align-items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="position-relative text-decoration-none fw-semibold"
                  style={{
                    color: isActive(link.href)
                      ? "#ffffff"
                      : "rgba(255,255,255,0.74)",
                    fontSize: "0.98rem",
                    transition: "0.25s ease",
                  }}
                >
                  {link.label}

                  {isActive(link.href) && (
                    <span
                      className="position-absolute start-50 translate-middle-x"
                      style={{
                        bottom: "-12px",
                        width: "28px",
                        height: "3px",
                        borderRadius: "999px",
                        background: "linear-gradient(90deg,#2563eb,#60a5fa)",
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* DESKTOP AUTH */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              {isAuthenticated ? (
                <>
                  <div className="text-end">
                    <small
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        display: "block",
                      }}
                    >
                      Welcome
                    </small>

                    <span className="text-white fw-semibold">
                      {user?.name || "User"}
                    </span>
                  </div>

                  <Link
                    href="/dashboard"
                    className="btn rounded-pill px-4 fw-semibold"
                    style={{
                      height: "46px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                    }}
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-danger rounded-pill px-4 fw-semibold"
                    style={{ height: "46px" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn rounded-pill px-4 fw-semibold"
                    style={{
                      minWidth: "110px",
                      height: "46px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#fff",
                      background: "transparent",
                    }}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="btn rounded-pill px-4 fw-semibold border-0"
                    style={{
                      minWidth: "120px",
                      height: "46px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                      color: "#fff",
                      boxShadow: "0 12px 30px rgba(37,99,235,.30)",
                    }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="d-lg-none border-0 bg-transparent p-0"
              aria-label="Toggle navigation"
            >
              <div
                className="d-flex flex-column justify-content-between"
                style={{
                  width: "28px",
                  height: "20px",
                }}
              >
                {[1, 2, 3].map((item) => (
                  <span
                    key={item}
                    style={{
                      height: "3px",
                      borderRadius: "999px",
                      background: "#fff",
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className="d-lg-none overflow-hidden"
        style={{
          maxHeight: mobileMenuOpen ? "700px" : "0px",
          transition: "all .35s ease",
          background: "linear-gradient(180deg,#020617,#07152f)",
          borderBottom: mobileMenuOpen
            ? "1px solid rgba(255,255,255,.08)"
            : "none",
        }}
      >
        <div className="container py-4">
          <div className="d-flex flex-column gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-decoration-none fw-semibold rounded-4 px-3 py-3"
                style={{
                  background: isActive(link.href)
                    ? "rgba(37,99,235,.12)"
                    : "transparent",
                  color: isActive(link.href) ? "#60a5fa" : "#fff",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="mt-3 pt-3"
              style={{
                borderTop: "1px solid rgba(255,255,255,.08)",
              }}
            >
              {isAuthenticated ? (
                <div className="d-grid gap-2">
                  <Link
                    href="/dashboard"
                    className="btn btn-primary rounded-pill py-3 fw-semibold"
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-danger rounded-pill py-3 fw-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <Link
                    href="/login"
                    className="btn btn-outline-light rounded-pill py-3 fw-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="btn btn-primary rounded-pill py-3 fw-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
