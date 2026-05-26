// ======================================================
// File: frontend/services/aboutService.js
// Description: About Page Service
// ======================================================

import API from "../utils/api";
import aboutFallbackData from "../data/aboutFallbackData";

/**
 * Normalize API response
 * Prevent UI crashes from missing fields
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
 * API → fallback
 */
export const getAboutPageData = async () => {
  try {
    const response = await API.get("/about");

    const apiData = response?.data?.data || {};

    return normalizeAboutData(apiData);
  } catch (error) {
    console.error("Failed to fetch about page data:", error);

    return normalizeAboutData(aboutFallbackData);
  }
};

/**
 * SEO
 */
export const getAboutSeoData = async () => {
  const data = await getAboutPageData();

  return data?.seo || aboutFallbackData.seo;
};

/**
 * Structured Data
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
