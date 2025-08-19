import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import UploadScan from "../UploadScan";
import Benefits from "./Benefits";
import Footer from "./Footer";
import FeaturesCardSection from "./FeaturesCardSection";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesCardSection />
      <HowItWorks />
      <UploadScan />
      <Benefits />
      <Footer />
    </>
  );
};

export default HomePage;
