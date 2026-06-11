// ======================================================
// File: components/Landing/CTASection/CTASection.jsx
// Description: Final Conversion CTA Section
// ======================================================

import { Phone, MessageCircle, Download, ArrowRight } from "lucide-react";

import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";

import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />

      <Container>
        <div className={styles.content}>
          <Badge variant="warning">Limited Plots Available</Badge>

          <h2 className={styles.title}>Book Your Site Visit Today</h2>

          <p className={styles.description}>
            Don't miss the opportunity to invest in one of Patna's
            fastest-growing locations. Visit the site, explore available plots,
            and secure your future investment.
          </p>

          <div className={styles.highlights}>
            <div>✓ RERA Approved</div>

            <div>✓ Registry Ready</div>

            <div>✓ Bank Loan Available</div>

            <div>✓ Immediate Booking</div>
          </div>

          <div className={styles.actions}>
            <Button size="lg">
              <Phone size={18} />
              Call Now
            </Button>

            <Button variant="outline" size="lg">
              <MessageCircle size={18} />
              WhatsApp
            </Button>

            <Button variant="secondary" size="lg">
              <Download size={18} />
              Brochure
            </Button>
          </div>

          <div className={styles.footerText}>
            Starting From ₹14.5 Lakh
            <ArrowRight size={16} />
            Limited Inventory Remaining
          </div>
        </div>
      </Container>
    </section>
  );
}
