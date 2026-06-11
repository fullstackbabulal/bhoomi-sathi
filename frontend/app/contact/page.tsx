import ContactPage from "@/pages/contact/ContactPage";
import { getContactPageData } from "@/services/contactService";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bhoomisathi.com";

export async function generateMetadata() {
  try {
    const data: any = await getContactPageData();

    const seo = data?.seo || {};

    const title = seo?.metaTitle || "Contact Us | Plot in Patna";

    const description =
      seo?.metaDescription ||
      "Get in touch with Plot in Patna for property inquiries, support, investment guidance, and expert consultation.";

    const keywords =
      seo?.keywords?.join(", ") ||
      "contact bhoomi sathi, property support, real estate contact, bhoomi sathi help";

    const image = seo?.metaImage || "/images/contact/contact-seo.webp";

    return {
      title,
      description,
      keywords,

      alternates: {
        canonical: `${SITE_URL}/contact`,
      },

      openGraph: {
        title,
        description,
        url: `${SITE_URL}/contact`,
        siteName: "Plot in Patna",
        type: "website",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Contact Us | Plot in Patna",

      description:
        "Get in touch with Plot in Patna for property inquiries and support.",
    };
  }
}

export default async function Page() {
  let data: any = {};

  try {
    data = await getContactPageData();
  } catch (error) {
    console.error("Contact page data fetch error:", error);
  }

  const schemaData = {
    "@context": "https://schema.org",

    "@type": "RealEstateAgent",

    name: "Plot in Patna",

    url: SITE_URL,

    logo: `${SITE_URL}/logo.png`,

    image: `${SITE_URL}/images/contact/contact-seo.webp`,

    telephone: data?.officeInfo?.phone1 || "+919661655534",

    email: data?.officeInfo?.email1 || "info@bhoomisathi.com",

    address: {
      "@type": "PostalAddress",

      streetAddress: data?.officeInfo?.address || "Patna",

      addressLocality: data?.officeInfo?.city || "Patna",

      addressRegion: data?.officeInfo?.state || "Bihar",

      postalCode: data?.officeInfo?.pin || "800001",

      addressCountry: "IN",
    },

    contactPoint: {
      "@type": "ContactPoint",

      telephone: data?.officeInfo?.phone1 || "+919661655534",

      contactType: "customer support",

      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <ContactPage data={data} />
    </>
  );
}
