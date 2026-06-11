// ======================================================
// File: components/Landing/PlotAvailability/PlotAvailability.jsx
// Description: Plot Inventory Section
// ======================================================

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";

import styles from "./PlotAvailability.module.css";

const PLOTS = [
  {
    plotNo: "A-101",
    size: "1200 Sq.ft",
    facing: "East",
    price: "₹25.99 L",
    status: "available",
  },
  {
    plotNo: "A-102",
    size: "1200 Sq.ft",
    facing: "West",
    price: "₹25.99 L",
    status: "reserved",
  },
  {
    plotNo: "B-201",
    size: "1800 Sq.ft",
    facing: "North",
    price: "₹38.50 L",
    status: "available",
  },
  {
    plotNo: "B-202",
    size: "1800 Sq.ft",
    facing: "South",
    price: "₹38.50 L",
    status: "sold",
  },
  {
    plotNo: "C-301",
    size: "2400 Sq.ft",
    facing: "Corner",
    price: "₹52.00 L",
    status: "available",
  },
];

const getBadgeVariant = (status) => {
  switch (status) {
    case "available":
      return "success";

    case "reserved":
      return "warning";

    case "sold":
      return "danger";

    default:
      return "outline";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "available":
      return "Available";

    case "reserved":
      return "Reserved";

    case "sold":
      return "Sold";

    default:
      return status;
  }
};

export default function PlotAvailability() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Availability"
          title="Live Plot Inventory"
          subtitle="Explore available plots and reserve your preferred location before inventory runs out."
        />

        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div>Plot No.</div>
            <div>Size</div>
            <div>Facing</div>
            <div>Price</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {PLOTS.map((plot) => (
            <div key={plot.plotNo} className={styles.row}>
              <div className={styles.plotNo}>{plot.plotNo}</div>

              <div>{plot.size}</div>

              <div>{plot.facing}</div>

              <div className={styles.price}>{plot.price}</div>

              <div>
                <Badge variant={getBadgeVariant(plot.status)}>
                  {getStatusLabel(plot.status)}
                </Badge>
              </div>

              <div>
                {plot.status === "available" ? (
                  <Button size="sm">Reserve Now</Button>
                ) : (
                  <Button size="sm" variant="secondary">
                    Details
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
