import React, { useState } from "react";
import Navbar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import PhoneList from "../components/PhoneList";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} />
      <HeroSection />
      <PhoneList />
    </>
  );
};

export default Home;
