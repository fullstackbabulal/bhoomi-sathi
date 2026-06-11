// ======================================================
// File: components/Landing/Hero/Hero.jsx
// Description: Premium Hero Section
// ======================================================

import Image from "next/image";
import {
  MapPin,
  ShieldCheck,
  BadgeIndianRupee,
  Phone,
  Download,
  CheckCircle2,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          {/* =====================================
              Left Content
          ===================================== */}

          <div className={styles.content}>
            <Badge variant="success">RERA Approved Project</Badge>

            <h1 className={styles.title}>Premium Residential Plots in Patna</h1>

            <p className={styles.subtitle}>
              Secure your future with legally approved, registry-ready
              residential plots in one of Patna's fastest-growing investment
              corridors.
            </p>

            <div className={styles.location}>
              <MapPin size={18} />

              <span>Near AIIMS Patna • Bihta Airport • Ring Road</span>
            </div>

            <div className={styles.priceBox}>
              <span className={styles.priceLabel}>Starting From</span>

              <h2 className={styles.price}>₹12.99 Lakh*</h2>
            </div>

            {/* =============================
                Features
            ============================= */}

            <div className={styles.features}>
              <div className={styles.feature}>
                <CheckCircle2 size={18} />
                <span>100% Legal Land</span>
              </div>

              <div className={styles.feature}>
                <CheckCircle2 size={18} />
                <span>Immediate Registry</span>
              </div>

              <div className={styles.feature}>
                <CheckCircle2 size={18} />
                <span>Bank Loan Available</span>
              </div>

              <div className={styles.feature}>
                <CheckCircle2 size={18} />
                <span>30 & 40 ft Roads</span>
              </div>
            </div>

            {/* =============================
                CTA Buttons
            ============================= */}

            <div className={styles.actions}>
              <Button size="lg">
                <Phone size={18} />
                Book Site Visit
              </Button>

              <Button variant="outline" size="lg">
                <Download size={18} />
                Download Brochure
              </Button>
            </div>

            {/* =============================
                Stats
            ============================= */}

            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>250+</strong>
                <span>Plots</span>
              </div>

              <div className={styles.stat}>
                <strong>40 ft</strong>
                <span>Road Width</span>
              </div>

              <div className={styles.stat}>
                <strong>100%</strong>
                <span>Approved</span>
              </div>
            </div>
          </div>

          {/* =====================================
              Right Side
          ===================================== */}

          <div className={styles.visual}>
            <div className={styles.imageCard}>
              <Image
                src="/images/project/hero.jpg"
                alt="RERA Approved Plot in Patna"
                fill
                priority
                className={styles.image}
              />
            </div>

            <div className={styles.floatingCard}>
              <ShieldCheck size={24} />

              <div>
                <h4>RERA Approved</h4>
                <p>Safe & Secure Investment</p>
              </div>
            </div>

            <div className={styles.floatingPrice}>
              <BadgeIndianRupee size={22} />

              <div>
                <h4>Best Price</h4>
                <p>Limited Launch Offer</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
