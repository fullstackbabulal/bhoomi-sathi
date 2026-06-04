// components/property/add/constants.js

export const INITIAL_PROPERTY_FORM = {
  title: "",
  slug: "",
  overview: "",
  description: "",
  type: "",
  status: "draft",
  price: "",
  bedrooms: "",
  bathrooms: "",

  area: {
    value: "",
    unit: "sqft",
  },

  location: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },

  videos: [],
  amenities: [],

  images: [],
  thumbnail: null,

  isFeatured: false,
  isVerified: false,
};
