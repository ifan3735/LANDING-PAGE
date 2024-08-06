import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Collection from '../components/Collection';
import Clients from '../components/Clients';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-yellow-50 text-gray-900">
      <Header />
      <Hero />
      <About />
      <WhyChooseUs />
      <Collection />
      <Clients />
      <Footer />
    </div>
  );
}

export default LandingPage;
