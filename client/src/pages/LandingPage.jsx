/* eslint-disable no-unused-vars */
// import React from 'react'
import Footer from "../components/Footer";
import Faq from "../components/LandingPage/Faq";
import Feature1 from "../components/LandingPage/Feature1";
import Hero from "../components/LandingPage/Hero";
import Logogrid from "../components/LandingPage/Logogrid";
import Price from "../components/LandingPage/Price";
import StatsLand from "../components/LandingPage/Stats";
import Testimonials from "../components/LandingPage/Testimonials";
import Navbar from "../components/Navbar";
import News from "./News";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Logogrid />
      <Feature1 />
      <Testimonials />
      <Price />
      <StatsLand />
      {/* <News/> */}
      {/* <Faq/> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
