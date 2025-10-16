'use client';

import { useState, useEffect, useRef } from 'react';
import RaikiLogo from './components/RaikiLogo';
import NeuralNetwork from './components/MouseTrail';
import MatrixText from './components/MatrixText';
import DynamicButton from './components/DynamicButton';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
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


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
        {/* Hero Section with Neural Network */}
        <div className="relative overflow-hidden h-full">
        <NeuralNetwork />
        
        {/* Header - positioned over neural network */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-2 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <RaikiLogo showText={false} />
            
            {/* Burger Menu - Minimal Retro Style */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col justify-center items-center w-8 h-8 bg-gray-900 border border-gray-400 hover:border-gray-300 cursor-pointer group transition-all duration-200 hover:shadow-lg hover:shadow-gray-400/25"
              >
                {!isMenuOpen ? (
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
                    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
                    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
                  </div>
                ) : (
                  <span className="text-white text-xs">×</span>
                )}
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
        {/* Top Section Container - 20vh from top on desktop, 15vh on mobile */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[15vh] sm:top-[20vh]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Small text */}
            <div className="mb-2">
              <p className="text-xs md:text-sm text-gray-400 font-mono">
                cybersecurity • digital experiences • web3
              </p>
            </div>

            {/* Hero Title - with proper container */}
            <div className="inline-block">
              <MatrixText
                text="raiki"
                className="text-5xl md:text-6xl font-mono font-bold text-white tracking-wider"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section Container - more bottom space on mobile */}
        <div className="absolute left-0 right-0 z-10 px-6 bottom-[25vh] sm:bottom-[15vh]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Description - 3vh above buttons */}
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto">
                At Raiki we specialize in securing digital infrastructure, crafting modern
                web applications and navigating the depths of decentralized finance and web3.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 font-mono max-w-sm mx-auto sm:max-w-none sm:justify-center">
              <a href="/services" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center sm:w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none whitespace-nowrap">&gt;&gt; services</span>
              </a>
              <a href="/about" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center sm:w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none whitespace-nowrap">&gt;&gt; about</span>
              </a>
              <a href="/contact" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center sm:w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none whitespace-nowrap">&gt;&gt; contact</span>
              </a>
            </div>
          </div>
        </div>
        </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}