import aboutFallbackData from "../data/aboutFallbackData";

/**
 * About Page Service
 * -----------------------------------------
 * Production-ready
 * API-driven
 * Backward compatible
 * SEO-ready
 *
 * Rule:
 * - Never break UI if API fails
 * - Always return normalized data
 * - Use fallback data during development
 * - Future-ready for CMS/Admin Panel
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const ABOUT_API_ENDPOINT = `${API_BASE_URL}/about`;

/**
 * Normalize API response
 * Ensures missing fields don't break UI
 */
const normalizeAboutData = (apiData = {}) => {
  return {
    seo: apiData?.seo || aboutFallbackData.seo,

    hero: {
      ...aboutFallbackData.hero,
      ...(apiData?.hero || {}),
    },

    whoWeAre: {
      ...aboutFallbackData.whoWeAre,
      ...(apiData?.whoWeAre || {}),
    },

    missionVision: {
      mission: {
        ...aboutFallbackData.missionVision.mission,
        ...(apiData?.missionVision?.mission || {}),
      },

      vision: {
        ...aboutFallbackData.missionVision.vision,
        ...(apiData?.missionVision?.vision || {}),
      },
    },

    whyChooseUs: {
      ...aboutFallbackData.whyChooseUs,
      ...(apiData?.whyChooseUs || {}),
    },

    process: {
      ...aboutFallbackData.process,
      ...(apiData?.process || {}),
    },

    stats: {
      ...aboutFallbackData.stats,
      ...(apiData?.stats || {}),
    },

    leadership: {
      ...aboutFallbackData.leadership,
      ...(apiData?.leadership || {}),
    },

    testimonials: {
      ...aboutFallbackData.testimonials,
      ...(apiData?.testimonials || {}),
    },

    cta: {
      ...aboutFallbackData.cta,
      ...(apiData?.cta || {}),
    },

    structuredData: apiData?.structuredData || aboutFallbackData.structuredData,
  };
};

/**
 * Fetch About Page Data
 *
 * Priority:
 * API → Fallback Data
 */
export const getAboutPageData = async () => {
  try {
    /**
     * Development fallback
     * If API URL not configured,
     * return fallback immediately
     */
    if (!API_BASE_URL) {
      console.warn(
        "NEXT_PUBLIC_API_BASE_URL missing. Using fallback about data.",
      );

      return normalizeAboutData(aboutFallbackData);
    }

    const response = await fetch(ABOUT_API_ENDPOINT, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },

      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`About API failed: ${response.status}`);

      return normalizeAboutData(aboutFallbackData);
    }

    const result = await response.json();

    /**
     * Flexible API structure
     *
     * Supports:
     * { success: true, data: {} }
     * OR direct object {}
     */
    const apiData = result?.data || result;

    return normalizeAboutData(apiData);
  } catch (error) {
    console.error("Failed to fetch about page data:", error);

    return normalizeAboutData(aboutFallbackData);
  }
};

/**
 * Get About SEO Data
 *
 * Used for:
 * generateMetadata()
 */
export const getAboutSeoData = async () => {
  const data = await getAboutPageData();

  return data?.seo || aboutFallbackData.seo;
};

/**
 * Get Structured Data
 *
 * Used for:
 * JSON-LD schema injection
 */
export const getAboutStructuredData = async () => {
  const data = await getAboutPageData();

  return data?.structuredData || aboutFallbackData.structuredData;
};

export default {
  getAboutPageData,
  getAboutSeoData,
  getAboutStructuredData,
};
