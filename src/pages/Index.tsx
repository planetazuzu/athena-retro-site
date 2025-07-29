import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DownloadSection from "@/components/DownloadSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <DownloadSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
