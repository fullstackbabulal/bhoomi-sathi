const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema(
  {
    hero: {
      badge: {
        type: String,
        default: "We're Here to Help",
      },

      title: {
        type: String,
        default: "Let's Connect",
      },

      subtitle: {
        type: String,
        default: "We’d Love to Hear from You!",
      },

      description: {
        type: String,
        default:
          "Whether you have a question, need assistance, or want to explore opportunities, our team is ready to help you.",
      },

      image: {
        type: String,
        default: "/images/contact/contact-hero.png",
      },
    },

    officeInfo: {
      address: {
        type: String,
        default: "Business Park Road",
      },

      city: {
        type: String,
        default: "Patna",
      },

      state: {
        type: String,
        default: "Bihar",
      },

      pin: {
        type: String,
        default: "800001",
      },

      country: {
        type: String,
        default: "India",
      },

      phone1: {
        type: String,
        default: "9876543210",
      },

      phone2: {
        type: String,
        default: "9123456789",
      },

      email1: {
        type: String,
        default: "info@bhoomisathi.com",
      },

      email2: {
        type: String,
        default: "support@bhoomisathi.com",
      },
    },

    contactCards: [
      {
        type: {
          type: String,
          enum: ["office", "phone", "email", "hours"],
          default: "office",
        },

        title: {
          type: String,
        },

        details: [
          {
            type: String,
          },
        ],
      },
    ],

    contactFormSection: {
      title: {
        type: String,
        default: "Send Us a Message",
      },

      description: {
        type: String,
        default: "Fill out the form and our team will get back to you shortly.",
      },

      mapEmbedUrl: {
        type: String,
        default: "https://www.google.com/maps?q=Patna,Bihar&output=embed",
      },
    },

    propertyExperts: {
      title: {
        type: String,
        default: "Meet Our Property Experts",
      },

      subtitle: {
        type: String,
        default:
          "Our experienced team is here to guide you through every step of your property journey.",
      },

      experts: [
        {
          name: {
            type: String,
          },

          role: {
            type: String,
          },

          image: {
            type: String,
          },

          phone: {
            type: String,
          },

          email: {
            type: String,
          },
        },
      ],
    },

    faqSection: {
      title: {
        type: String,
        default: "Frequently Asked Questions",
      },

      subtitle: {
        type: String,
        default:
          "Find answers to common questions about our services, properties, and support.",
      },

      faqs: [
        {
          question: {
            type: String,
          },

          answer: {
            type: String,
          },
        },
      ],
    },

    contactCTA: {
      title: {
        type: String,
        default: "Ready to Find Your Dream Property?",
      },

      description: {
        type: String,
        default:
          "Connect with our property experts today and take the next step toward your perfect investment or dream home.",
      },

      buttonText: {
        type: String,
        default: "Get Started",
      },

      buttonLink: {
        type: String,
        default: "/properties",
      },

      supportText: {
        type: String,
        default: "Need immediate assistance?",
      },

      phone: {
        type: String,
        default: "9661655534",
      },
    },

    seo: {
      metaTitle: {
        type: String,
        default: "Contact Us | Bhoomi Sathi",
      },

      metaDescription: {
        type: String,
        default:
          "Get in touch with Bhoomi Sathi for property inquiries, support, and consultation.",
      },

      metaImage: {
        type: String,
        default: "/images/contact/contact-seo.webp",
      },

      keywords: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ContactSettings =
  mongoose.models.ContactSettings ||
  mongoose.model("ContactSettings", contactSettingsSchema);

module.exports = ContactSettings;
