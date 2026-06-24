"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./Navbar.module.css";

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
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.navbar}>
            {/* Logo */}
            <Link href="/" className={styles.logoWrapper}>
              <div className={styles.logoImage}>
                <Image src="/logo.png" alt="Plot In Patna" fill priority />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${
                    isActive(link.href) ? styles.activeNavLink : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className={styles.desktopAuth}>
              {isAuthenticated ? (
                <>
                  <div className={styles.userInfo}>
                    <small>Welcome</small>
                    <span>{user?.name || "User"}</span>
                  </div>

                  <Link href="/dashboard" className={styles.secondaryButton}>
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={styles.dangerButton}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={styles.secondaryButton}>
                    Login
                  </Link>

                  <Link href="#" className={styles.primaryButton}>
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileMenuButton}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileDrawer} ${
          mobileMenuOpen ? styles.mobileDrawerOpen : ""
        }`}
      >
        <div className={styles.mobileContent}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${
                isActive(link.href) ? styles.mobileActive : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className={styles.mobileAuth}>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className={styles.primaryButton}>
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.dangerButton}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.secondaryButton}>
                  Login
                </Link>

                <Link href="#" className={styles.primaryButton}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
