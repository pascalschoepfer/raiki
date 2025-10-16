'use client';

import { useState, useEffect, useRef } from 'react';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';
import MatrixText from '../components/MatrixText';

/**
 * Services Page Component
 * 
 * Displays Raiki's cybersecurity, web development, and web3 services
 * with the same neural network background and cyberpunk aesthetic.
 */
export default function Services() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
        {/* Services Section with Neural Network */}
        <div className="relative overflow-hidden h-full">
        <NeuralNetwork />
        
        {/* Header - positioned over neural network */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-2 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/"><RaikiLogo /></a>
            
            {/* Burger Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer"
              >
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </button>
              
              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                  <div className="py-2">
                    <a href="/services" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                      Services
                    </a>
                    <a href="/about" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                      About
                    </a>
                    <a href="/contact" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                      Contact
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>

        {/* Page Title - reduced top margin on mobile */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[5vh] min-[400px]:top-[7vh] sm:top-20 md:top-24 h-[15vh] min-[400px]:h-[6vh] sm:h-auto flex items-center justify-center">
          <div className="flex justify-center">
            <MatrixText
              text="services"
              className="text-[2.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-gray-300 tracking-wider whitespace-nowrap"
            />
          </div>
        </div>

        {/* Services Content - starts right after title on mobile */}
        <div className="absolute z-10 px-4 sm:px-6 top-[22vh] min-[400px]:top-[13vh] bottom-[15vh] left-0 right-0 sm:inset-0 flex items-center justify-center sm:pt-16 md:pt-8">
          <div className="max-w-4xl sm:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 min-[400px]:gap-3 sm:gap-6 md:gap-8 w-[80%] sm:w-full max-h-none sm:max-h-none overflow-y-auto sm:overflow-visible">
            
            {/* System Engineering - Available but Passive */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 font-mono">systems</h3>
              <ul className="text-gray-300 space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• architecture and engineering</li>
                <li>• security assessments</li>
                <li>• cloud guidance</li>
                <li>• infrastructure consulting</li>
              </ul>
            </div>

            {/* Digital Experiences - Main Focus */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 font-mono">digital experiences</h3>
              <ul className="text-gray-300 space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• cutting edge web apps</li>
                <li>• site modernization</li>
                <li>• dashboard solutions</li>
                <li>• data visualization</li>
              </ul>
            </div>

            {/* Web3 - Main Focus */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg py-3 px-3 pr-1 min-[400px]:pr-2 sm:py-6 sm:px-5 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg min-[400px]:text-xl sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 font-mono">web3</h3>
              <ul className="text-gray-300 space-y-1 min-[400px]:space-y-1.5 sm:space-y-2 text-sm min-[400px]:text-base sm:text-sm">
                <li>• DeFi onboarding and guidance</li>
                <li>• yield optimization strategies</li>
                <li>• security and risk education</li>
                <li>• basic to advanced technical advisory</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Navigation - Hidden on mobile, shown on desktop */}
        <section className="absolute bottom-0 left-0 right-0 z-15 pb-16 px-6 bg-gradient-to-t from-black/60 to-transparent pt-6 hidden sm:block">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="flex flex-row gap-3 font-mono justify-center">
              <a href="/" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none">&gt;&gt; home</span>
              </a>
              <a href="/about" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none">&gt;&gt; about</span>
              </a>
              <a href="/contact" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none">&gt;&gt; contact</span>
              </a>
            </div>
          </div>
        </section>
        </div>
    </div>
  );
}