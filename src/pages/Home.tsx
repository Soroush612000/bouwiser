import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import AISection from "../components/AISection";
import ProductComparison from "../components/ProductComparison";
import RenovationRoadmap from "../components/RenovationRoadmap";
import Testimonials from "../components/Testimonials";
import FeedbackButton from "../components/FeedbackButton";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <TrustedBy />

        <AISection />

        <ProductComparison />

        <RenovationRoadmap />

        <Testimonials />
      </main>

      <FeedbackButton />
    </>
  );
}