import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Get Contact Page Data
 */
export const getContactPageData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/contact`);

    return response?.data?.data || {};
  } catch (error) {
    console.error("Contact page fetch error:", error);

    return {};
  }
};

/**
 * Submit Contact Form
 */
export const submitContactForm = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/contact/submit`,
      payload,
    );

    return response?.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to submit contact form",
      }
    );
  }
};
