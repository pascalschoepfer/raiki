'use client';

import { useState, useEffect, useRef } from 'react';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';

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

        {/* Page Title */}
        <div className="absolute top-20 left-0 right-0 z-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
              ~/services
            </h1>
            <p className="text-lg text-gray-300">
              comprehensive digital security and web3 solutions
            </p>
          </div>
        </div>

        {/* Services Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6 mt-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            
            {/* Cybersecurity */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <div className="text-yellow-400 text-2xl mb-4 font-mono">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3 font-mono">cybersecurity</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• penetration testing</li>
                <li>• vulnerability assessments</li>
                <li>• security audits</li>
                <li>• incident response</li>
                <li>• compliance consulting</li>
              </ul>
            </div>

            {/* Digital Experiences */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <div className="text-green-400 text-2xl mb-4 font-mono">💻</div>
              <h3 className="text-xl font-bold text-white mb-3 font-mono">digital experiences</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• modern web applications</li>
                <li>• responsive design</li>
                <li>• performance optimization</li>
                <li>• user experience design</li>
                <li>• progressive web apps</li>
              </ul>
            </div>

            {/* Web3 */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
              <div className="text-blue-400 text-2xl mb-4 font-mono">⛓️</div>
              <h3 className="text-xl font-bold text-white mb-3 font-mono">web3</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• smart contract development</li>
                <li>• DeFi protocols</li>
                <li>• NFT marketplaces</li>
                <li>• blockchain integration</li>
                <li>• tokenomics design</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Navigation */}
        <section className="absolute bottom-0 left-0 right-0 z-15 pb-16 px-6 bg-gradient-to-t from-black/60 to-transparent pt-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-400 mb-6">
              ready to secure your digital future?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/" className="group font-mono text-gray-400 hover:text-white transition-all duration-300 text-lg border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-800/50 hover:shadow-lg hover:scale-105">
                <span className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300">~/</span>home
              </a>
              <a href="/about" className="group font-mono text-gray-400 hover:text-white transition-all duration-300 text-lg border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-800/50 hover:shadow-lg hover:scale-105">
                <span className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300">~/</span>about
              </a>
              <a href="/contact" className="group font-mono text-gray-400 hover:text-white transition-all duration-300 text-lg border border-gray-700 hover:border-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-400/10 hover:text-yellow-400 hover:shadow-lg hover:scale-105 font-bold">
                get started
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}