import API from "../utils/api";

export const fetchProperties = async (params) => {
  const { data } = await API.get("/properties", { params });
  return data;
};
