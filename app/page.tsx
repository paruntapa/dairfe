import Image, { type ImageProps } from "next/image";
import HeroSection from "../components/sections/hero-section";
import AirQualitySection from "../components/sections/air-quality-section";
import ValidatorSection from "../components/sections/validator-section";
import ContributeSection from "../components/sections/contribute-section";
import Header from "../components/header";
import Footer from "../components/footer";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
      <Header />
        <HeroSection />
        <AirQualitySection />
        <ValidatorSection />
        <ContributeSection />
      <Footer />
      </div>
    </div>
  );
}
