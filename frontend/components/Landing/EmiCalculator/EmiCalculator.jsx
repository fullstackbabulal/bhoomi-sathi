"use client";

// ======================================================
// File: components/Landing/EmiCalculator/EmiCalculator.jsx
// Description: EMI Calculator Section
// ======================================================

import { useMemo, useState } from "react";
import { Calculator, IndianRupee } from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";

import styles from "./EmiCalculator.module.css";

export default function EmiCalculator() {
  const [plotPrice, setPlotPrice] = useState(2500000);

  const [downPayment, setDownPayment] = useState(500000);

  const [interestRate, setInterestRate] = useState(8.5);

  const [tenure, setTenure] = useState(15);

  const loanAmount = plotPrice - downPayment;

  const emi = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;

    const totalMonths = tenure * 12;

    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    return Math.round(emiValue);
  }, [loanAmount, interestRate, tenure]);

  const totalPayment = emi * tenure * 12;

  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN").format(value);
  };

  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="EMI Calculator"
          title="Plan Your Investment"
          subtitle="Calculate your estimated EMI and understand your affordability before booking your plot."
        />

        <div className={styles.layout}>
          {/* =======================
              Inputs
          ======================= */}

          <Card variant="elevated" padding="xl">
            <div className={styles.formHeader}>
              <Calculator size={28} />

              <h3>EMI Calculator</h3>
            </div>

            <div className={styles.field}>
              <label>Plot Price</label>

              <input
                type="range"
                min="500000"
                max="10000000"
                step="100000"
                value={plotPrice}
                onChange={(e) => setPlotPrice(Number(e.target.value))}
              />

              <span>₹{formatCurrency(plotPrice)}</span>
            </div>

            <div className={styles.field}>
              <label>Down Payment</label>

              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
              />
            </div>

            <div className={styles.field}>
              <label>Interest Rate (%)</label>

              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>

            <div className={styles.field}>
              <label>Loan Tenure (Years)</label>

              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
            </div>
          </Card>

          {/* =======================
              Result Card
          ======================= */}

          <Card variant="outline" padding="xl" hover={false}>
            <div className={styles.resultHeader}>
              <IndianRupee size={28} />

              <h3>EMI Summary</h3>
            </div>

            <div className={styles.result}>
              <div>
                <span>Loan Amount</span>

                <strong>₹{formatCurrency(loanAmount)}</strong>
              </div>

              <div>
                <span>Monthly EMI</span>

                <strong>₹{formatCurrency(emi)}</strong>
              </div>

              <div>
                <span>Total Interest</span>

                <strong>₹{formatCurrency(totalInterest)}</strong>
              </div>

              <div>
                <span>Total Payment</span>

                <strong>₹{formatCurrency(totalPayment)}</strong>
              </div>
            </div>

            <Button size="lg" fullWidth>
              Book Site Visit
            </Button>
          </Card>
        </div>
      </Container>
    </section>
  );
}
