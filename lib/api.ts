import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export const getProperties = (params = {}) =>
  API.get("/properties", { params });

export const getPropertyBySlug = (slug: string) =>
  API.get(`/properties/slug/${slug}`);

export const getBlogs = () => API.get("/blogs");

export const getBlogBySlug = (slug: string) =>
  API.get(`/blogs/slug/${slug}`);