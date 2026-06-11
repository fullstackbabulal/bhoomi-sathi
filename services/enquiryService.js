import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createEnquiry = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/enquiries`, payload);

    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to submit enquiry",
      }
    );
  }
};
