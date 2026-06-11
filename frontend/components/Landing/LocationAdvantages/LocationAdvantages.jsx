// ======================================================
// File: components/Landing/LocationAdvantages/LocationAdvantages.jsx
// Description: Location Benefits & Connectivity
// ======================================================

import {
  Plane,
  Hospital,
  GraduationCap,
  Train,
  Route,
  MapPin,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import IconBox from "@/components/ui/IconBox/IconBox";

import styles from "./LocationAdvantages.module.css";

const LOCATIONS = [
  {
    icon: <Hospital size={28} />,
    title: "AIIMS Patna",
    description: "Only 10 Minutes Drive",
  },
  {
    icon: <Plane size={28} />,
    title: "Bihta Airport",
    description: "15 Minutes Away",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "IIT Patna",
    description: "12 Minutes Drive",
  },
  {
    icon: <Route size={28} />,
    title: "Patna Ring Road",
    description: "5 Minutes Connectivity",
  },
  {
    icon: <Train size={28} />,
    title: "Railway Station",
    description: "10 Minutes Distance",
  },
  {
    icon: <MapPin size={28} />,
    title: "Patna City",
    description: "Excellent Road Access",
  },
];

export default function LocationAdvantages() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Prime Location"
          title="Everything Within Reach"
          subtitle="Strategically located in one of Patna's fastest-growing investment corridors with seamless connectivity."
        />

        <div className={styles.grid}>
          {/* ==========================
              Location Cards
          ========================== */}

          <div className={styles.cardsGrid}>
            {LOCATIONS.map((item, index) => (
              <IconBox
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                variant="default"
                align="left"
              />
            ))}
          </div>

          {/* ==========================
              Google Map Placeholder
          ========================== */}

          <div className={styles.mapWrapper}>
            <div className={styles.mapContent}>
              <h3>Project Location Map</h3>

              <p>
                Near AIIMS Patna, Bihta Airport and upcoming infrastructure
                developments.
              </p>

              <div className={styles.mapWrapper}>
                <iframe
                  src="https://www.google.com/maps?q=Patna,Bihar&output=embed"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Agrani Woods Location"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
