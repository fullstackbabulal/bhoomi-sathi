// ======================================================
// File: components/Landing/Amenities/Amenities.jsx
// Description: Township Amenities Section
// ======================================================

import {
  Shield,
  Camera,
  Trees,
  Droplets,
  Lightbulb,
  Building2,
  Landmark,
  ToyBrick,
  Route,
  Waves,
  Car,
  HeartHandshake,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import IconBox from "@/components/ui/IconBox/IconBox";

import styles from "./Amenities.module.css";

const AMENITIES = [
  {
    icon: <Shield size={30} />,
    title: "Gated Community",
    description: "Secure township with controlled access.",
  },
  {
    icon: <Camera size={30} />,
    title: "CCTV Security",
    description: "24x7 surveillance for enhanced safety.",
  },
  {
    icon: <Trees size={30} />,
    title: "Landscaped Parks",
    description: "Green open spaces for families.",
  },
  {
    icon: <Droplets size={30} />,
    title: "Water Supply",
    description: "Reliable water infrastructure.",
  },
  {
    icon: <Lightbulb size={30} />,
    title: "Street Lighting",
    description: "Well-lit roads and common areas.",
  },
  {
    icon: <Building2 size={30} />,
    title: "Commercial Zone",
    description: "Shops and daily conveniences nearby.",
  },
  {
    icon: <Landmark size={30} />,
    title: "Temple Area",
    description: "Dedicated spiritual and community space.",
  },
  {
    icon: <ToyBrick size={30} />,
    title: "Kids Play Area",
    description: "Safe recreation area for children.",
  },
  {
    icon: <Route size={30} />,
    title: "Wide Roads",
    description: "30 & 40 ft internal roads.",
  },
  {
    icon: <Waves size={30} />,
    title: "Drainage System",
    description: "Modern drainage infrastructure.",
  },
  {
    icon: <Car size={30} />,
    title: "Parking Space",
    description: "Dedicated parking provisions.",
  },
  {
    icon: <HeartHandshake size={30} />,
    title: "Community Zone",
    description: "Open spaces for gatherings and events.",
  },
];

export default function Amenities() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionTitle
          badge="Amenities"
          title="Modern Lifestyle Amenities"
          subtitle="Everything you need for a comfortable and future-ready residential community."
        />

        <div className={styles.grid}>
          {AMENITIES.map((item, index) => (
            <IconBox
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              variant="default"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
