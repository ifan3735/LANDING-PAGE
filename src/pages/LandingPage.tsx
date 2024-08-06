import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Collection from '../components/Collection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <About />
      <Features />
      <Collection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Landing;
