import AboutPage from "@/pages/about/AboutPage";

import {
  getAboutSeoData,
  getAboutStructuredData,
} from "@/services/aboutService";

import aboutFallbackData from "@/data/aboutFallbackData";

/**
 * Dynamic SEO Metadata
 * -----------------------------------
 * Production-ready
 * API-driven
 * SEO optimized
 * Backward compatible
 *
 * Rule:
 * API → fallbackData
 */

export async function generateMetadata() {
  try {
    const seo = (await getAboutSeoData()) || aboutFallbackData.seo;

    return {
      title: seo?.metaTitle || aboutFallbackData.seo.metaTitle,

      description:
        seo?.metaDescription || aboutFallbackData.seo.metaDescription,

      keywords: seo?.keywords || aboutFallbackData.seo.keywords,

      robots: seo?.robots || aboutFallbackData.seo.robots,

      alternates: {
        canonical: seo?.canonicalUrl || aboutFallbackData.seo.canonicalUrl,
      },

      openGraph: {
        title: seo?.metaTitle || aboutFallbackData.seo.metaTitle,

        description:
          seo?.metaDescription || aboutFallbackData.seo.metaDescription,

        url: seo?.canonicalUrl || aboutFallbackData.seo.canonicalUrl,

        siteName: "Plot in Patna",

        type: "website",

        images: [
          {
            url: seo?.ogImage || aboutFallbackData.seo.ogImage,

            width: 1200,
            height: 630,

            alt: seo?.metaTitle || "About Plot in Patna",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",

        title: seo?.metaTitle || aboutFallbackData.seo.metaTitle,

        description:
          seo?.metaDescription || aboutFallbackData.seo.metaDescription,

        images: [seo?.twitterImage || aboutFallbackData.seo.twitterImage],
      },
    };
  } catch (error) {
    console.error("Failed to generate About metadata:", error);

    /**
     * Safe fallback metadata
     */
    return {
      title: aboutFallbackData.seo.metaTitle,

      description: aboutFallbackData.seo.metaDescription,
    };
  }
}

/**
 * About Route
 * -----------------------------------
 * Injects JSON-LD schema
 * Renders dynamic AboutPage
 */

export default async function Page() {
  const structuredData =
    (await getAboutStructuredData()) || aboutFallbackData.structuredData;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData?.organization || {}),
        }}
      />

      <AboutPage />
    </>
  );
}
