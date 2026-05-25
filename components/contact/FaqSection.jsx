"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";
import { ChevronDown } from "lucide-react";

const FaqSection = ({ data = {} }) => {
  const title = data?.title || "Frequently Asked Questions";

  const subtitle =
    data?.subtitle ||
    "Find answers to common questions about our services, properties, and support.";

  const faqs = data?.faqs || [
    {
      _id: "1",
      question: "How can I contact Bhoomi Sathi?",
      answer:
        "You can contact us through our contact form, phone number, email, or office visit during working hours.",
    },
    {
      _id: "2",
      question: "Do you help with property verification?",
      answer:
        "Yes, we provide assistance for property verification, legal checks, and complete guidance before purchasing.",
    },
    {
      _id: "3",
      question: "Can I schedule a property consultation?",
      answer:
        "Absolutely. Our property experts are available for consultation to help you make informed decisions.",
    },
    {
      _id: "4",
      question: "How long does it take to receive a response?",
      answer:
        "Our team generally responds within 24 business hours after receiving your inquiry.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>FAQ</span>

          <h2>{title}</h2>

          <p>{subtitle}</p>
        </div>

        {/* FAQ List */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={faq?._id || index}
                className={`${styles.faqCard} ${isActive ? styles.active : ""}`}
              >
                <button
                  className={styles.question}
                  onClick={() => toggleFaq(index)}
                  type="button"
                >
                  <span>{faq?.question}</span>

                  <ChevronDown
                    size={22}
                    className={isActive ? styles.rotate : ""}
                  />
                </button>

                <div
                  className={`${styles.answerWrapper} ${
                    isActive ? styles.open : ""
                  }`}
                >
                  <p>{faq?.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
