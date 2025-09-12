'use client';

import { useState, useEffect, useRef } from 'react';
import RaikiLogo from './components/RaikiLogo';
import NeuralNetwork from './components/MouseTrail';
import MatrixText from './components/MatrixText';

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
            <RaikiLogo />
            
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
        {/* Center Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 -mt-48">
          <p className="text-sm md:text-base text-gray-400 mb-6 text-center">
            cybersecurity <span className="text-gray-600">•</span> digital experiences <span className="text-gray-600">•</span> web3
          </p>
          {/* Hero Logo with Matrix Effect */}
          <div className="flex items-center justify-center gap-3 scale-[240%] whitespace-nowrap w-full" style={{ marginLeft: '10%' }}>
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 flex-shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Raiki company logo"
            >
              {/* Outer hexagonal frame - main brand shape */}
              <path
                d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Inner hexagonal frame - adds depth and dimension */}
              <path
                d="M12 6 L18 9.5 L18 14.5 L12 18 L6 14.5 L6 9.5 Z"
                stroke="#FFFFFF"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              {/* Central focal point - represents the core/hub */}
              <circle
                cx="12"
                cy="12"
                r="2"
                fill="#FFFFFF"
              />
              {/* Top connection line - extends upward from center */}
              <line
                x1="12"
                y1="2"
                x2="12"
                y2="6"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              {/* Bottom connection line - extends downward from center */}
              <line
                x1="12"
                y1="18"
                x2="12"
                y2="22"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </svg>
            <MatrixText 
              text="raiki" 
              className="text-xl font-mono font-bold text-gray-300 tracking-wider flex-shrink-0"
            />
          </div>
        </div>
        
        {/* Services Preview Section - positioned at bottom */}
        <section className="absolute bottom-0 left-0 right-0 z-15 pb-32 px-6 bg-gradient-to-t from-black/60 to-transparent pt-3">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
              At Raiki, we specialize in securing digital infrastructure, crafting cutting-edge 
              modern websites, and navigating every corner of web3 and decentralized finance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center font-mono">
              <a href="/services" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-3 py-2 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/25 cursor-pointer">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 hover:text-white text-xs tracking-wider">&gt;&gt; services</span>
              </a>
              <a href="/about" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-3 py-2 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/25 cursor-pointer">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 hover:text-white text-xs tracking-wider">&gt;&gt; about</span>
              </a>
              <a href="/contact" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-3 py-2 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/25 cursor-pointer">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 hover:text-white text-xs tracking-wider">&gt;&gt; contact</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        /* Intersection Observer will trigger these */
        section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Hero is always visible */
        section:first-of-type {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}