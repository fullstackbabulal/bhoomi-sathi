// ======================================================
// File: components/Landing/PriceList/PriceList.jsx
// Description: Plot Pricing Section
// ======================================================

import { ArrowRight, Star } from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";

import styles from "./PriceList.module.css";

const PLOTS = [
  {
    size: "945 Sq.ft",
    price: "₹14.5 Lakh",
    tag: "Starter",
  },
  {
    size: "1000 Sq.ft",
    price: "₹15.5 Lakh",
    tag: "Popular",
    featured: true,
  },
  {
    size: "1200 Sq.ft",
    price: "₹18.6 Lakh",
    tag: "Best Value",
  },
  {
    size: "1800 Sq.ft",
    price: "₹27.50 Lakh",
    tag: "Premium",
  },
];

export default function PriceList() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Pricing"
          title="Choose Your Plot Size"
          subtitle="Transparent pricing with immediate registry and bank loan support."
        />

        <div className={styles.grid}>
          {PLOTS.map((plot, index) => (
            <Card
              key={index}
              variant={plot.featured ? "outline" : "elevated"}
              padding="lg"
              className={`
                ${styles.card}
                ${plot.featured ? styles.featured : ""}
              `}
            >
              {plot.featured && (
                <div className={styles.ribbon}>
                  <Star size={14} />
                  Most Popular
                </div>
              )}

              <Badge variant="outline">{plot.tag}</Badge>

              <h3 className={styles.size}>{plot.size}</h3>

              <div className={styles.price}>{plot.price}</div>

              <ul className={styles.features}>
                <li>RERA Approved</li>
                <li>Registry Ready</li>
                <li>Bank Loan Available</li>
                <li>Road Facing Options</li>
              </ul>

              <Button fullWidth size="lg">
                View Details
                <ArrowRight size={18} />
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
