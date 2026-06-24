// ======================================================
// File: components/Landing/InvestmentHighlights/InvestmentHighlights.jsx
// Description: Investment Growth Section
// ======================================================

import {
  Plane,
  Route,
  Building2,
  Hospital,
  TrendingUp,
  Landmark,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";

import styles from "./InvestmentHighlights.module.css";

const HIGHLIGHTS = [
  {
    icon: <Plane size={30} />,
    title: "Bihta International Airport",
    description:
      "Massive infrastructure development expected around the airport corridor.",
  },
  {
    icon: <Route size={30} />,
    title: "Ring Road Connectivity",
    description:
      "Direct access to major transportation routes and business hubs.",
  },
  {
    icon: <Hospital size={30} />,
    title: "AIIMS Growth Zone",
    description:
      "Strong residential demand driven by healthcare infrastructure.",
  },
  {
    icon: <Building2 size={30} />,
    title: "Smart Urban Expansion",
    description: "Rapid residential and commercial development in the region.",
  },
];

const STATS = [
  {
    value: "15-25%",
    label: "Expected Annual Appreciation",
  },
  {
    value: "₹5000+ Cr",
    label: "Infrastructure Investment",
  },
  {
    value: "1800+",
    label: "Premium Plots",
  },
  {
    value: "10 Years",
    label: "Long-Term Growth Potential",
  },
];

export default function InvestmentHighlights() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Investment Opportunity"
          title="Why Invest In This Location?"
          subtitle="Benefit from Patna's fastest-growing infrastructure corridor with strong appreciation and future demand."
        />

        <div className={styles.layout}>
          {/* ==========================
              Left Side
          ========================== */}

          <div>
            <div className={styles.cardsGrid}>
              {HIGHLIGHTS.map((item, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  padding="lg"
                  className={styles.highlightCard}
                >
                  <div className={styles.icon}>{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* ==========================
              Right Side
          ========================== */}

          <div className={styles.rightSection}>
            <Card variant="outline" padding="xl" hover={false}>
              <div className={styles.chartHeader}>
                <TrendingUp size={30} />

                <h3>Growth Potential</h3>
              </div>

              <p className={styles.chartDescription}>
                Strategic location advantages and ongoing infrastructure
                projects make this one of the strongest investment opportunities
                around Patna.
              </p>

              <div className={styles.statsGrid}>
                {STATS.map((stat, index) => (
                  <div key={index} className={styles.statCard}>
                    <strong>{stat.value}</strong>

                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" fullWidth>
                Download Investment Report
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
