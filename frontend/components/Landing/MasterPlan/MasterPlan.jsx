// ======================================================
// File: components/Landing/MasterPlan/MasterPlan.jsx
// Description: Township Master Plan Section
// ======================================================
"use client";
import Image from "next/image";
import {
  Maximize2,
  Trees,
  Route,
  Building2,
  ShieldCheck,
  Download,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";

import styles from "./MasterPlan.module.css";

const FEATURES = [
  {
    icon: <Route size={22} />,
    title: "40 & 60 Ft Roads",
  },
  {
    icon: <Trees size={22} />,
    title: "Green Park Zone",
  },
  {
    icon: <Building2 size={22} />,
    title: "Commercial Area",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Gated Community",
  },
];

export default function MasterPlan() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Master Plan"
          title="Well-Planned Township Layout"
          subtitle="Thoughtfully designed residential township with wide roads, green spaces, commercial zones and future-ready infrastructure."
        />

        <div className={styles.layout}>
          {/* ============================
              Left Side
          ============================ */}
          <div className={styles.content}>
            <h3 className={styles.heading}>Designed For Comfortable Living</h3>

            <p className={styles.description}>
              Our township master plan ensures efficient land utilization with
              residential plots, parks, commercial zones, internal roads,
              drainage systems and future expansion possibilities.
            </p>

            <div className={styles.features}>
              {FEATURES.map((item, index) => (
                <Card
                  key={`master-feature-${index}`}
                  padding="md"
                  hover={false}
                  className={styles.featureCard}
                >
                  <div className={styles.icon}>{item.icon}</div>
                  <span>{item.title}</span>
                </Card>
              ))}
            </div>

            <div className={styles.actions}>
              {/* Download Brochure Link */}
              <a
                href="/brochure/DDL_Woods_Brochure.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <Download size={18} />
                  Download Brochure
                </Button>
              </a>

              {/* View Full Layout PDF Button */}
              <Button
                onClick={() =>
                  window.open(
                    "/Master-Plan-Agrani-Woods.pdf",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                variant="outline"
                size="lg"
              >
                View Full Layout
              </Button>
            </div>
          </div>

          {/* ============================
              Right Side
          ============================ */}
          <div className={styles.imageWrapper}>
            <Image
              src="/images/project/master-plan.jpg"
              alt="Master Plan Layout Map"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className={styles.image}
            />

            <button
              className={styles.zoomBtn}
              aria-label="Zoom master plan layout"
            >
              <Maximize2 size={20} />
            </button>

            <div className={styles.overlayCard}>
              <strong>1800+ Premium Plots</strong>
              <span>Residential & Commercial</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
