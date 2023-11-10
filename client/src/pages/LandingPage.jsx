/* eslint-disable no-unused-vars */
// import React from 'react'
import { useState } from "react";
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
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const changeTheme = (para) => {
    setTheme(para);
  };
  return (
    <div>
      <Navbar theme={theme} changeTheme={changeTheme} />
      <Hero />
      <Logogrid />
      <Feature1 />
      <Testimonials />
      <Price />
      <StatsLand />
      {/* <News/> */}
      {/* <Faq/> */}
      <Footer theme={theme} />
    </div>
  );
};

export default LandingPage;
