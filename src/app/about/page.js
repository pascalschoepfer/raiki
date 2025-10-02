'use client';

import { useState, useEffect, useRef } from 'react';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';
import MatrixText from '../components/MatrixText';

export default function About() {
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
        <div className="relative overflow-hidden h-full">
        <NeuralNetwork />
        
        {/* Header */}
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

        {/* Page Title */}
        <div className="absolute left-0 right-0 z-10 px-6 top-16 sm:top-20 md:top-24">
          <div className="flex justify-center">
            <MatrixText 
              text="about" 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-gray-300 tracking-wider"
            />
          </div>
        </div>

        {/* About Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 pt-24 sm:pt-16 md:pt-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
            
            {/* Experience */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg p-4 sm:p-6 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-mono">experience</h3>
              <div className="text-gray-300 space-y-2 text-sm font-normal">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <rect x="7" y="2" width="2" height="3" fill="currentColor"/>
                      <rect x="7" y="11" width="2" height="3" fill="currentColor"/>
                      <rect x="2" y="7" width="3" height="2" fill="currentColor"/>
                      <rect x="11" y="7" width="3" height="2" fill="currentColor"/>
                      <rect x="3.5" y="3.5" width="2" height="2" fill="currentColor" transform="rotate(45 4.5 4.5)"/>
                      <rect x="10.5" y="3.5" width="2" height="2" fill="currentColor" transform="rotate(45 11.5 4.5)"/>
                      <rect x="3.5" y="10.5" width="2" height="2" fill="currentColor" transform="rotate(45 4.5 11.5)"/>
                      <rect x="10.5" y="10.5" width="2" height="2" fill="currentColor" transform="rotate(45 11.5 11.5)"/>
                    </svg>
                  </div>
                  <span>15+ years in systems architecture</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <rect x="3" y="5" width="10" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M5,5 V3 a3,3 0 0,1 6,0 V5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>15+ years in security engineering</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <span className="text-gray-300 text-sm font-bold">₿</span>
                  </div>
                  <span>10+ years in digital assets</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <span className="text-gray-300 text-sm font-bold">Ξ</span>
                  </div>
                  <span>5+ years in decentralized finance</span>
                </div>
              </div>
            </div>

            {/* Education & Specialization */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg p-4 sm:p-6 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-mono">education</h3>
              <div className="text-gray-300 space-y-2 text-sm font-normal">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <path d="M2,4 L8,3 L14,4 L14,13 L8,12 L2,13 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="3" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="4" y1="6" x2="6" y2="6" stroke="currentColor" strokeWidth="1"/>
                      <line x1="4" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="1"/>
                      <line x1="10" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1"/>
                      <line x1="10" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span>bsc. in information technology</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 20 20">
                      <path d="M5,6 A4,4 0 1,1 5,14 A4,4 0 1,1 5,6 M5,8.5 A1.5,1.5 0 1,0 5,11.5 A1.5,1.5 0 1,0 5,8.5" fillRule="evenodd"/>
                      <rect x="9" y="9" width="8" height="2" fill="currentColor"/>
                      <rect x="15" y="11" width="2" height="3" fill="currentColor"/>
                      <rect x="12" y="11" width="2" height="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>cybersecurity specialization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 20 20">
                      <rect x="5" y="5" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="7" y1="1.5" x2="7" y2="5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="10" y1="1.5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="13" y1="1.5" x2="13" y2="5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="7" y1="15" x2="7" y2="18.5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="10" y1="15" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="13" y1="15" x2="13" y2="18.5" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="1.5" y1="7" x2="5" y2="7" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="1.5" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="1.5" y1="13" x2="5" y2="13" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="15" y1="7" x2="18.5" y2="7" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="15" y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.75"/>
                      <line x1="15" y1="13" x2="18.5" y2="13" stroke="currentColor" strokeWidth="1.75"/>
                    </svg>
                  </div>
                  <span>core system engineering</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <rect x="2" y="6" width="3" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <rect x="6.5" y="6" width="3" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <rect x="11" y="6" width="3" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <line x1="5" y1="8" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1"/>
                      <line x1="9.5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span>decentralized systems</span>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg p-4 sm:p-6 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-mono">expertise</h3>
              <div className="text-gray-300 space-y-2 text-sm font-normal">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 20 20">
                      <path d="M10 2 L18 5 L18 11 C18 14.5 15 17.5 10 19 C5 17.5 2 14.5 2 11 L2 5 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M6 10 L9 13 L14 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>traditional security practices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <path d="M8,2 L10,4 L12,3 L11,6 L14,7 L10,8 L12,11 L8,10 L6,13 L6,9 L3,10 L5,7 L2,6 L6,5 L4,2 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="7" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>web3 protocol stress testing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <line x1="9" y1="9" x2="14" y2="14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>defi strategy assessments</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 fill-gray-400" viewBox="0 0 16 16">
                      <circle cx="8" cy="5.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5.5 9 L10.5 9" stroke="currentColor" strokeWidth="1"/>
                      <rect x="7" y="10" width="2" height="2" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <path d="M6 12 L10 12" stroke="currentColor" strokeWidth="1"/>
                      <path d="M7.5 14 L8.5 14" stroke="currentColor" strokeWidth="1"/>
                      <line x1="1.5" y1="2" x2="2.8" y2="3.3" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="14.5" y1="2" x2="13.2" y2="3.3" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="1.5" y1="9" x2="2.8" y2="7.7" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="14.5" y1="9" x2="13.2" y2="7.7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span>deep technical web3 knowledge</span>
                </div>
              </div>
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
              <a href="/services" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none">&gt;&gt; services</span>
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