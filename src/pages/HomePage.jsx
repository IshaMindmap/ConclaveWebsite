import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Offerings from '../components/Offerings';

export const HomePage = () => {
return(
  <div>
    <HeroSection />
    <Offerings />
    <Footer />
  </div>
 );
};

export default HomePage;
