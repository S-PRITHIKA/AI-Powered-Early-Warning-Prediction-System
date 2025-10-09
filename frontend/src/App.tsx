import React, { useState } from 'react';
import Header from './components/Header';
import AuthenticationSection from './components/AuthenticationSection';
import AboutUsSection from './components/AboutUsSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <AuthenticationSection />
      <AboutUsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default App;