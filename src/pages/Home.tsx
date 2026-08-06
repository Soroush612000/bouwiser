import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import AISection from "../components/AISection";
import ProductComparison from "../components/ProductComparison";
import StoreComparison from "../components/StoreComparison";
import RenovationRoadmap from "../components/RenovationRoadmap";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedBy />
      <AISection />
      <ProductComparison />
      <StoreComparison />
      <RenovationRoadmap />
      <Testimonials />
    </>
  );
}