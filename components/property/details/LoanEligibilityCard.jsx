"use client";

// ======================================================
// File: components/property/details/LoanEligibilityCard.jsx
// Description: Property Loan Eligibility Card
// ======================================================

import styles from "./LoanEligibilityCard.module.css";

export default function LoanEligibilityCard({
  property = {},

  title = "Loan Eligibility",
  subtitle = "Check estimated home loan eligibility for this property",

  tenureYears = 20,
  interestRate = 8.5,
}) {
  // ======================================================
  // PROPERTY PRICE
  // ======================================================
  const propertyPrice =
    Number(
      property?.price ||
        property?.expectedPrice ||
        property?.priceDetails?.amount ||
        0,
    ) || 0;

  // ======================================================
  // CALCULATIONS
  // ======================================================
  const eligibleLoanAmount = Math.round(propertyPrice * 0.8);

  const downPayment = Math.round(propertyPrice * 0.2);

  // ======================================================
  // EMI CALCULATION
  // Formula:
  // EMI = P × r × (1+r)^n / ((1+r)^n -1)
  // ======================================================
  const monthlyRate = interestRate / 12 / 100;

  const totalMonths = tenureYears * 12;

  let estimatedEMI = 0;

  if (eligibleLoanAmount > 0) {
    estimatedEMI = Math.round(
      (eligibleLoanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1),
    );
  }

  // ======================================================
  // FORMATTERS
  // ======================================================
  const formatCurrency = (value) => Number(value).toLocaleString("en-IN");

  return (
    <section className={styles.card}>
      {/* ===================== */}
      {/* Header */}
      {/* ===================== */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* ===================== */}
      {/* Stats */}
      {/* ===================== */}
      <div className={styles.infoGrid}>
        {/* Property Price */}
        <div className={styles.infoItem}>
          <span className={styles.label}>Property Price</span>

          <strong className={styles.value}>
            ₹{formatCurrency(propertyPrice)}
          </strong>
        </div>

        {/* Loan Amount */}
        <div className={styles.infoItem}>
          <span className={styles.label}>Eligible Loan Amount</span>

          <strong className={styles.value}>
            ₹{formatCurrency(eligibleLoanAmount)}
          </strong>
        </div>

        {/* Down Payment */}
        <div className={styles.infoItem}>
          <span className={styles.label}>Down Payment</span>

          <strong className={styles.value}>
            ₹{formatCurrency(downPayment)}
          </strong>
        </div>

        {/* Interest Rate */}
        <div className={styles.infoItem}>
          <span className={styles.label}>Interest Rate</span>

          <strong className={styles.value}>{interestRate}%</strong>
        </div>

        {/* Tenure */}
        <div className={styles.infoItem}>
          <span className={styles.label}>Loan Tenure</span>

          <strong className={styles.value}>{tenureYears} Years</strong>
        </div>

        {/* EMI */}
        <div className={styles.infoItem}>
          <span className={styles.label}>Estimated EMI</span>

          <strong className={styles.value}>
            ₹{formatCurrency(estimatedEMI)}
            /month
          </strong>
        </div>
      </div>
    </section>
  );
}
