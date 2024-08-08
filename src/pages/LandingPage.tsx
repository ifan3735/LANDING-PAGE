import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Collection from '../components/Collection';
import Testimonials from '../components/Testimonials';
import GetStarted from '../components/GetStarted';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import OffRoadCars from '../components/OffRoad';

const Landing: React.FC = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <HowItWorks />
      <About />
      <OffRoadCars />
      <Features />
      <Collection />
      <Testimonials />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Landing;
