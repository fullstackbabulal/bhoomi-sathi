"use client";

import {
  Activity,
  BarChart3,
  Building2,
  FileText,
  Mail,
  Users,
} from "lucide-react";

import KpiCard from "../KpiCard";
import QuickAction from "../QuickAction";

import styles from "./DashboardHome.module.css";

export default function DashboardHome({
  dashboardData = null,

  loading = false,
  error = null,
}) {
  /*
  ===================================
  MOCK / STATIC FALLBACK
  ===================================
  */

  const mockDashboardData = {
    stats: [
      {
        label: "Total Properties",
        value: 245,
        change: "+12%",
        icon: "building",
      },
      {
        label: "Agents",
        value: 38,
        change: "+4%",
        icon: "users",
      },
      {
        label: "Enquiries",
        value: 182,
        change: "+18%",
        icon: "mail",
      },
      {
        label: "Blogs",
        value: 32,
        change: "+8%",
        icon: "blog",
      },
    ],

    quickActions: [
      {
        title: "Add Property",
        description: "Create and publish a new property listing",
        href: "/admin/properties/add",
        icon: "property",
        variant: "blue",
      },
      {
        title: "Add Agent",
        description: "Register and manage new agents",
        href: "/admin/agents/new",
        icon: "agent",
        variant: "green",
      },
      {
        title: "Manage Enquiries",
        description: "Respond to customer enquiries",
        href: "/admin/enquiries",
        icon: "enquiry",
        variant: "purple",
      },
      {
        title: "Write Blog",
        description: "Create SEO-friendly blog content",
        href: "/admin/blogs/new",
        icon: "blog",
        variant: "orange",
      },
    ],

    activities: [
      {
        id: 1,
        title: "New enquiry received",
        description: "A customer submitted a premium property enquiry.",
        time: "2 min ago",
      },
      {
        id: 2,
        title: "New property added",
        description: "A new luxury apartment listing was published.",
        time: "20 min ago",
      },
    ],

    properties: [
      {
        id: 1,
        title: "Premium Apartment",
        location: "Patna, Bihar",
        status: "published",
      },
      {
        id: 2,
        title: "Luxury Villa",
        location: "Bihta, Bihar",
        status: "pending",
      },
    ],
  };

  /*
  ===================================
  SAFE DATA
  API → STATIC FALLBACK
  ===================================
  */

  const safeData = dashboardData || mockDashboardData;

  const safeStats = safeData?.stats || [];

  const safeQuickActions = safeData?.quickActions || [];

  const safeActivities = safeData?.activities || [];

  const safeProperties = safeData?.properties || [];

  /*
  ===================================
  EMPTY SAFE
  ===================================
  */

  const isEmpty =
    !safeStats.length &&
    !safeQuickActions.length &&
    !safeActivities.length &&
    !safeProperties.length;

  return (
    <section className={styles.dashboard}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Dashboard Overview</h1>

          <p>
            Monitor properties, agents, enquiries, analytics, and overall
            platform performance.
          </p>
        </div>
      </div>

      {/* ERROR */}
      {!loading && error && (
        <div className={styles.card}>
          <div className={styles.analyticsPlaceholder}>
            <Activity size={40} />

            <h4>Dashboard unavailable</h4>

            <p>Failed to load dashboard data.</p>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className={styles.kpiGrid}>
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <KpiCard key={index} loading />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && isEmpty && (
        <div className={styles.card}>
          <div className={styles.analyticsPlaceholder}>
            <BarChart3 size={42} />

            <h4>No dashboard data</h4>

            <p>Dashboard data is currently unavailable.</p>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {!loading && !error && !isEmpty && (
        <>
          {/* KPI GRID */}
          <div className={styles.kpiGrid}>
            {safeStats.map((item, index) => (
              <KpiCard key={item?.label || index} data={item} />
            ))}
          </div>

          {/* MAIN GRID */}
          <div className={styles.grid}>
            {/* LEFT */}
            <div className={styles.leftColumn}>
              {/* QUICK ACTION */}
              <section className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Quick Actions</h3>
                </div>

                <div className={styles.quickActionGrid}>
                  {safeQuickActions.map((action, index) => (
                    <QuickAction key={action?.title || index} data={action} />
                  ))}
                </div>
              </section>

              {/* RECENT ACTIVITY */}
              <section className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Recent Activity</h3>
                </div>

                <div className={styles.activityList}>
                  {safeActivities.map((activity) => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={styles.activityIndicator} />

                      <div className={styles.activityContent}>
                        <h4>{activity.title}</h4>

                        <p>{activity.description}</p>

                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <div className={styles.rightColumn}>
              {/* PROPERTY STATUS */}
              <section className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Latest Properties</h3>
                </div>

                <div className={styles.propertyList}>
                  {safeProperties.map((property) => (
                    <div key={property.id} className={styles.propertyItem}>
                      <div>
                        <h4>{property.title}</h4>

                        <p>{property.location}</p>
                      </div>

                      <span
                        className={`${styles.status} ${
                          property.status === "published"
                            ? styles.published
                            : styles.pending
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ANALYTICS */}
              <section className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Analytics</h3>
                </div>

                <div className={styles.analyticsPlaceholder}>
                  <BarChart3 size={48} />

                  <h4>Analytics Ready</h4>

                  <p>Connect API or chart system to display real analytics.</p>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
