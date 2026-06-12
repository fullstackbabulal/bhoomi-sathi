// ======================================================
// File: app/privacy-policy/page.tsx
// Description: Privacy Policy Page
// ======================================================

import styles from "./PrivacyPolicy.module.css";

export const metadata = {
  title: "Privacy Policy | PlotInPatna",
  description:
    "Read the Privacy Policy of PlotInPatna to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>

      <p className={styles.updatedDate}>Last Updated: June 2026</p>

      <div className={styles.content}>
        <section className={styles.section}>
          <p>
            Welcome to PlotInPatna. Your privacy is important to us. This
            Privacy Policy explains how we collect, use, store, and protect your
            personal information when you visit our website and use our
            services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>1. Information We Collect</h2>

          <p>
            We may collect personal information such as your name, email
            address, mobile number, city, property preferences, and any other
            information you voluntarily provide while using our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Account Registration & User Consent</h2>

          <p>
            We collect your data only with your consent when you create an
            account on PlotInPatna.in. We do not sell, rent, or share your
            personal information with any third party.
          </p>

          <p>
            Your information is collected solely to provide a better user
            experience, improve our services, personalize property
            recommendations, facilitate communication, and help you find
            suitable properties more efficiently.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. How We Use Your Information</h2>

          <ul className={styles.list}>
            <li>Create and manage your account.</li>
            <li>Provide property listing and inquiry services.</li>
            <li>Respond to your requests and customer support queries.</li>
            <li>Improve website functionality and user experience.</li>
            <li>Send service updates and important notifications.</li>
            <li>Maintain security and prevent fraudulent activities.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Data Security</h2>

          <p>
            We implement appropriate technical and organizational security
            measures to safeguard your personal information against unauthorized
            access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Data Sharing and Disclosure</h2>

          <p>
            PlotInPatna does not sell, trade, rent, or share your personal
            information with third parties unless required by law, court order,
            or government authority.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Cookies and Analytics</h2>

          <p>
            Our website may use cookies, analytics tools, and similar
            technologies to improve performance, understand visitor behavior,
            and enhance the overall user experience.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Your Rights</h2>

          <p>
            You have the right to access, update, correct, or request deletion
            of your personal information, subject to applicable laws and
            regulations.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Third-Party Links</h2>

          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those external
            websites.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Changes to This Privacy Policy</h2>

          <p>
            We reserve the right to modify or update this Privacy Policy at any
            time. Any changes will be posted on this page along with the updated
            revision date.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Contact Us</h2>

          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please contact us through the contact information
            available on PlotInPatna.in.
          </p>
        </section>
      </div>
    </main>
  );
}
