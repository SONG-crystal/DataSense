import Link from "next/link";
import Hero from "./components/flowers/Hero";
import Services from "./components/flowers/Services";
import Testimonials from "./components/flowers/Testimonials";
import Contact from "./components/flowers/Contact";

export const metadata = {
  title: "DataSense | IoT Data Collection & Analysis",
  description:
    "Advanced IoT solution for real-time environmental monitoring using Raspberry Pi sensors and data analytics.",
};

export default function Home() {
  return (
    <div className="relative">
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
