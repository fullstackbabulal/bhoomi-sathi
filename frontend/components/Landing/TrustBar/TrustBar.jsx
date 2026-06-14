// ======================================================
// File: components/Landing/TrustBar/TrustBar.jsx
// Description: Project Trust Indicators
// ======================================================

import {
  ShieldCheck,
  Landmark,
  FileCheck,
  Home,
  Route,
  Building2,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import IconBox from "@/components/ui/IconBox/IconBox";

import styles from "./TrustBar.module.css";

const TRUST_ITEMS = [
  {
    icon: <ShieldCheck size={30} />,
    title: "RERA Approved",
    description: "Fully legal and verified project",
  },
  {
    icon: <Landmark size={30} />,
    title: "Bank Loan",
    description: "Easy financing available",
  },
  {
    icon: <FileCheck size={30} />,
    title: "Ready to Registry",
    description: "Immediate registration process",
  },
  {
    icon: <Home size={30} />,
    title: "Possession Ready",
    description: "Plots available for immediate use",
  },
  {
    icon: <Route size={30} />,
    title: "40, 30 Ft Roads",
    description: "Wide branch road network",
  },
  {
    icon: <Building2 size={30} />,
    title: "Gated Township",
    description: "Safe and secure community",
  },
];

export default function TrustBar() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {TRUST_ITEMS.map((item, index) => (
            <IconBox
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              variant="green"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
