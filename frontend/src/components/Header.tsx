import React from 'react';
import { Waves } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 px-4 py-16 sm:py-24">
      {/* Wave Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path
            d="M0,160 C300,100 600,200 900,140 C1050,120 1150,140 1200,160 L1200,400 L0,400 Z"
            fill="rgba(255,255,255,0.1)"
            className="animate-pulse"
          />
          <path
            d="M0,200 C300,140 600,240 900,180 C1050,160 1150,180 1200,200 L1200,400 L0,400 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 left-1/4 h-8 w-8 rounded-full bg-blue-400 opacity-20 animate-bounce"></div>
        <div className="absolute top-10 right-1/3 h-6 w-6 rounded-full bg-cyan-300 opacity-30 animate-pulse"></div>
        <div className="absolute top-20 left-3/4 h-4 w-4 rounded-full bg-blue-300 opacity-25 animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
            <Waves className="h-8 w-8 text-cyan-300" />
            <span className="text-2xl font-bold text-white">BLUE-HARBOUR</span>
          </div>
        </div>
        
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl">
          Ocean Intelligence
          <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Platform
          </span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl">
          Empowering researchers, fishermen, and authorities with real-time ocean data, 
          smart alerts, and collaborative monitoring tools.
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;