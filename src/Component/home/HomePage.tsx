import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import UploadScan from "../UploadScan";
import Benefits from "./Benefits";
import Footer from "./Footer";
import FeaturesCardSection from "./FeaturesCardSection";
import useAppSelector from "../../Hooks/useAppSelector";
import Admin from "../../Pages/Admin/Admin";

const HomePage: React.FC = () => {
  const { is_admin } = useAppSelector((state) => state.auth);
  return (
    <>
      {is_admin ? (
        <Admin />
      ) : (
        <div>
          <HeroSection />
          <FeaturesCardSection />
          <HowItWorks />
          <UploadScan />
          <Benefits />
          <Footer />
        </div>
      )}
    </>
  );
};

export default HomePage;
