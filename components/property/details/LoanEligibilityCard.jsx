"use client";

// ======================================================
// File: components/property/details/LoanEligibilityCard.jsx
// Description: Property Loan Eligibility Card
// ======================================================

import styles from "./LoanEligibilityCard.module.css";

export default function LoanEligibilityCard({
  title = "Loan Eligibility",
  subtitle = "Check estimated home loan eligibility for this property",
  propertyPrice = 0,
  eligibleAmount = null,
  downPayment = null,
  emi = null,
  tenure = "20 Years",
  interestRate = "8.5%",
}) {
  const formattedPrice = Number(propertyPrice || 0).toLocaleString("en-IN");

  const formattedEligibleAmount =
    eligibleAmount !== null
      ? Number(eligibleAmount).toLocaleString("en-IN")
      : Math.round(propertyPrice * 0.8).toLocaleString("en-IN");

  const formattedDownPayment =
    downPayment !== null
      ? Number(downPayment).toLocaleString("en-IN")
      : Math.round(propertyPrice * 0.2).toLocaleString("en-IN");

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Property Price</span>

          <strong className={styles.value}>₹{formattedPrice}</strong>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Eligible Loan Amount</span>

          <strong className={styles.value}>₹{formattedEligibleAmount}</strong>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Down Payment</span>

          <strong className={styles.value}>₹{formattedDownPayment}</strong>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Interest Rate</span>

          <strong className={styles.value}>{interestRate}</strong>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Loan Tenure</span>

          <strong className={styles.value}>{tenure}</strong>
        </div>

        {emi && (
          <div className={styles.infoItem}>
            <span className={styles.label}>Estimated EMI</span>

            <strong className={styles.value}>
              ₹{Number(emi).toLocaleString("en-IN")}
              /month
            </strong>
          </div>
        )}
      </div>
    </section>
  );
}
