// ======================================================
// File: src/utils/AdminSidebarConfig.js
// Description: Admin Sidebar Navigation Config
// ======================================================

import {
  Building2,
  FileText,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
} from "lucide-react";

const ADMIN_SIDEBAR_CONFIG = [
  // ====================================================
  // DASHBOARD
  // ====================================================
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },

  // ====================================================
  // PROPERTY MANAGEMENT
  // ====================================================
  {
    label: "Properties",
    icon: Building2,

    children: [
      {
        label: "All Properties",
        path: "/admin/properties",
      },

      {
        label: "Add Property",
        path: "/admin/properties/add",
      },
    ],
  },

  // ====================================================
  // AGENT MANAGEMENT
  // ====================================================
  {
    label: "Agents",
    icon: Users,

    children: [
      {
        label: "All Agents",
        path: "/admin/agents",
      },

      {
        label: "Add Agent",
        path: "/admin/agents/add",
      },
    ],
  },

  // ====================================================
  // ENQUIRIES
  // ====================================================
  {
    label: "Enquiries",
    icon: Mail,
    path: "/admin/enquiries",
  },

  // ====================================================
  // BLOG MANAGEMENT
  // ====================================================
  {
    label: "Blogs",
    icon: FileText,

    children: [
      {
        label: "All Blogs",
        path: "/admin/blogs",
      },

      {
        label: "Add Blog",
        path: "/admin/blogs/add",
      },
    ],
  },

  // ====================================================
  // SETTINGS
  // ====================================================
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default ADMIN_SIDEBAR_CONFIG;
