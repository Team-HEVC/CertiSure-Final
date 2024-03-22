import Feature1 from "../components/LandingPage/Feature1";
import Hero from "../components/LandingPage/Hero";
import Logogrid from "../components/LandingPage/Logogrid";
import Price from "../components/LandingPage/Price";
import StatsLand from "../components/LandingPage/Stats";
import Testimonials from "../components/LandingPage/Testimonials";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Logogrid />
      <Feature1 />
      <Testimonials />
      <Price />
      <StatsLand />
    </div>
  );
};

export default LandingPage;
