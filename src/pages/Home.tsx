import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import AISection from "../components/AISection";
import ProductComparison from "../components/ProductComparison";
import RenovationRoadmap from "../components/RenovationRoadmap";
import Testimonials from "../components/Testimonials";
import CommunityFeedbackBar from "../components/CommunityFeedbackBar";

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

      <CommunityFeedbackBar />
    </>
  );
}