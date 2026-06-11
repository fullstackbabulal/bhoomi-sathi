// ======================================================
// File: components/Landing/ProjectOverview/ProjectOverview.jsx
// Description: Project Overview Section
// ======================================================

import Image from "next/image";
import {
  MapPin,
  FileBadge,
  LayoutGrid,
  Route,
  Building2,
  CheckCircle2,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

import styles from "./ProjectOverview.module.css";

const PROJECT_INFO = [
  {
    icon: <MapPin size={22} />,
    label: "Location",
    value: "Bihta, Patna",
  },
  {
    icon: <FileBadge size={22} />,
    label: "RERA Number",
    value: "BRERAP00496-4/676/R-369/2019",
  },
  {
    icon: <LayoutGrid size={22} />,
    label: "Total Plots",
    value: "10+",
  },
  {
    icon: <Route size={22} />,
    label: "Road Width",
    value: "40 & 60 Ft",
  },
  {
    icon: <Building2 size={22} />,
    label: "Project Area",
    value: "400 Bigha",
  },
  {
    icon: <CheckCircle2 size={22} />,
    label: "Status",
    value: "Registry Ready",
  },
];

export default function ProjectOverview() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Project Overview"
          title="A Secure & Smart Investment Destination"
          subtitle="Premium residential plots designed for modern living with excellent connectivity and future appreciation potential."
        />

        <div className={styles.grid}>
          {/* =====================================
              Left Content
          ===================================== */}

          <div>
            <Badge variant="success">RERA Approved Township</Badge>

            <h3 className={styles.projectName}>Patna Green Valley Township</h3>

            <p className={styles.description}>
              Located in the rapidly growing Bihta region, this township offers
              residential plots with wide roads, legal documentation,
              future-ready infrastructure, and excellent connectivity to AIIMS
              Patna, Bihta Airport, and Ring Road.
            </p>

            <div className={styles.infoGrid}>
              {PROJECT_INFO.map((item, index) => (
                <Card
                  key={index}
                  padding="md"
                  hover={false}
                  className={styles.infoCard}
                >
                  <div className={styles.icon}>{item.icon}</div>

                  <div>
                    <span className={styles.label}>{item.label}</span>

                    <h4 className={styles.value}>{item.value}</h4>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* =====================================
              Right Image
          ===================================== */}

          <div className={styles.imageWrapper}>
            <Image
              src="/images/project/master-plan.jpg"
              alt="Project Master Plan"
              fill
              className={styles.image}
            />

            <div className={styles.overlay}>Master Plan Preview</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
