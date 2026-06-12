// ======================================================
// File: app/terms-conditions/page.tsx
// Description: Terms & Conditions Page
// ======================================================

import styles from "./TermsConditions.module.css";

export const metadata = {
  title: "Terms & Conditions | PlotInPatna",
  description:
    "Read the Terms & Conditions governing the use of PlotInPatna and its services.",
};

export default function TermsConditionsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Terms & Conditions</h1>

      <p className={styles.updatedDate}>Last Updated: June 2026</p>

      <div className={styles.content}>
        <section className={styles.section}>
          <p>
            Welcome to PlotInPatna. By accessing and using our website, you
            agree to comply with and be bound by the following Terms &
            Conditions. If you do not agree with any part of these terms, please
            discontinue using our website and services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>1. Acceptance of Terms</h2>

          <p>
            By accessing PlotInPatna.in, creating an account, submitting
            inquiries, or using any services available on the website, you agree
            to these Terms & Conditions and our Privacy Policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. User Accounts</h2>

          <p>
            Users may be required to create an account to access certain
            features of the website. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities
            that occur under your account.
          </p>

          <p>
            You agree to provide accurate, current, and complete information
            during registration and to keep such information updated.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Property Information</h2>

          <p>
            PlotInPatna strives to provide accurate property information.
            However, we do not guarantee the accuracy, completeness, legality,
            availability, pricing, or suitability of any property listed on the
            platform.
          </p>

          <p>
            Users are advised to independently verify all property details,
            documents, approvals, ownership records, and legal status before
            making any purchasing decisions.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Prohibited Activities</h2>

          <ul className={styles.list}>
            <li>Providing false or misleading information.</li>
            <li>Attempting unauthorized access to the website.</li>
            <li>Uploading malicious code, viruses, or harmful content.</li>
            <li>Using the platform for fraudulent or illegal activities.</li>
            <li>Violating any applicable laws or regulations.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Intellectual Property</h2>

          <p>
            All content available on PlotInPatna, including text, graphics,
            logos, images, designs, and software, is the property of PlotInPatna
            or its licensors and is protected by applicable intellectual
            property laws.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Limitation of Liability</h2>

          <p>
            PlotInPatna shall not be liable for any direct, indirect,
            incidental, consequential, special, or punitive damages arising from
            your use of the website or reliance on any information provided
            through the platform.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Third-Party Services</h2>

          <p>
            The website may contain links to third-party websites, services, or
            resources. PlotInPatna is not responsible for the content, policies,
            or practices of such third-party platforms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Account Suspension</h2>

          <p>
            We reserve the right to suspend, restrict, or terminate any user
            account without prior notice if we believe the user has violated
            these Terms & Conditions or applicable laws.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Changes to Terms</h2>

          <p>
            PlotInPatna reserves the right to modify these Terms & Conditions at
            any time. Updated versions will be published on this page with the
            revised effective date.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Governing Law</h2>

          <p>
            These Terms & Conditions shall be governed and interpreted in
            accordance with the laws of India. Any disputes arising from the use
            of this website shall be subject to the jurisdiction of the
            competent courts in Bihar, India.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Contact Us</h2>

          <p>
            If you have any questions regarding these Terms & Conditions, please
            contact us through the contact information available on
            PlotInPatna.in.
          </p>
        </section>
      </div>
    </main>
  );
}
