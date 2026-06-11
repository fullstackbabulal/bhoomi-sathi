// ======================================================
// File: components/Landing/Testimonials/Testimonials.jsx
// Description: Customer Testimonials Section
// ======================================================

import { Star, Quote } from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Card from "@/components/ui/Card/Card";

import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Plot Buyer",
    image: "/images/testimonials/user-1.jpg",
    review:
      "The project location is excellent and the documentation process was completely transparent. Highly recommended for long-term investment.",
  },
  {
    id: 2,
    name: "Anjali Singh",
    role: "Investor",
    image: "/images/testimonials/user-2.jpg",
    review:
      "We purchased two plots here because of the airport and ring road development. The appreciation potential looks very strong.",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Home Builder",
    image: "/images/testimonials/user-3.jpg",
    review:
      "Wide roads, legal approvals and excellent connectivity. Perfect place to build a future home.",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Testimonials"
          title="What Our Buyers Say"
          subtitle="Real experiences from plot owners and investors who trusted our project."
        />

        <div className={styles.grid}>
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.id}
              variant="elevated"
              padding="lg"
              className={styles.card}
            >
              <Quote size={40} className={styles.quote} />

              <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <p className={styles.review}>{item.review}</p>

              <div className={styles.user}>
                <div className={styles.avatar}>
                  {item.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4>{item.name}</h4>

                  <span>{item.role}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
