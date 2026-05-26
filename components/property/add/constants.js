// ======================================================
// File: components/property/add/constants.js
// Description: Property Form Constants
// ======================================================

import {
  Car,
  Wifi,
  Shield,
  Dumbbell,
  Trees,
  Waves,
  Building2,
  School,
  Hospital,
  Bus,
  ParkingCircle,
} from "lucide-react";

// ======================================================
// PROPERTY TYPES
// ======================================================
export const PROPERTY_TYPES = [
  {
    label: "Plot",
    value: "plot",
  },
  {
    label: "Apartment",
    value: "apartment",
  },
  {
    label: "House",
    value: "house",
  },
  {
    label: "Villa",
    value: "villa",
  },
  {
    label: "Commercial",
    value: "commercial",
  },
];

// ======================================================
// PROPERTY STATUS
// ======================================================
export const PROPERTY_STATUS = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Sold",
    value: "sold",
  },
];

// ======================================================
// AREA UNITS
// ======================================================
export const AREA_UNITS = [
  {
    label: "Square Feet (sqft)",
    value: "sqft",
  },
  {
    label: "Square Meter (sqm)",
    value: "sqm",
  },
  {
    label: "Bigha",
    value: "bigha",
  },
  {
    label: "Acre",
    value: "acre",
  },
];

// ======================================================
// DEFAULT AMENITIES
// ======================================================
export const DEFAULT_AMENITIES = [
  {
    label: "Parking",
    icon: Car,
  },
  {
    label: "WiFi",
    icon: Wifi,
  },
  {
    label: "Security",
    icon: Shield,
  },
  {
    label: "Gym",
    icon: Dumbbell,
  },
  {
    label: "Garden",
    icon: Trees,
  },
  {
    label: "Swimming Pool",
    icon: Waves,
  },
  {
    label: "Lift",
    icon: Building2,
  },
  {
    label: "School Nearby",
    icon: School,
  },
  {
    label: "Hospital Nearby",
    icon: Hospital,
  },
  {
    label: "Public Transport",
    icon: Bus,
  },
  {
    label: "Reserved Parking",
    icon: ParkingCircle,
  },
];

// ======================================================
// EMPTY FORM DATA
// ======================================================
export const INITIAL_PROPERTY_FORM = {
  // BASIC INFO
  title: "",
  slug: "",
  overview: "",
  description: "",

  // PROPERTY DETAILS
  type: "plot",
  status: "available",
  price: "",

  bedrooms: 0,
  bathrooms: 0,

  area: {
    value: "",
    unit: "sqft",
  },

  // LOCATION
  location: {
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",

    coordinates: {
      type: "Point",
      coordinates: [0, 0],
    },
  },

  // MEDIA
  thumbnail: "",
  images: [],
  videos: [],

  // FEATURES
  amenities: [],

  // SEO
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    canonicalUrl: "",
    ogImage: "",
  },

  // FLAGS
  isFeatured: false,
  isVerified: false,
};
