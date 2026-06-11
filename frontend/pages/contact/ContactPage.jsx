"use client";

import Navbar from "@/components/layout/Navbar";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import PropertyExperts from "@/components/contact/PropertyExperts";
import FaqSection from "@/components/contact/FaqSection";
import ContactCTA from "@/components/contact/ContactCTA";
import Footer from "@/components/layout/Footer";
const ContactPage = ({ data = {} }) => {
  return (
    <>
      <Navbar />

      <main>
        <ContactHero data={data} />

        <ContactFormSection data={data?.contactFormSection} />

        <PropertyExperts data={data?.propertyExperts} />

        <FaqSection data={data?.faqSection} />

        <ContactCTA data={data?.contactCTA} />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
