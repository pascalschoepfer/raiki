'use client';

import { useState } from 'react';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';

/**
 * Demo Page - Showcasing Different Link Design Styles
 * 
 * This page demonstrates various design approaches for navigation links
 * so you can see them in action and choose your preferred style.
 */
export default function Demo() {
  const [currentStyle, setCurrentStyle] = useState('cyberpunk');

  const styles = {
    // Modern Artsy
    artsy: (
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        <a href="/services" className="group relative text-2xl font-light text-gray-300 hover:text-white transition-all duration-500 overflow-hidden">
          <span className="relative z-10 px-8 py-4 block">Services</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </a>
        <a href="/about" className="group relative text-2xl font-light text-gray-300 hover:text-white transition-all duration-500 overflow-hidden">
          <span className="relative z-10 px-8 py-4 block">About</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </a>
        <a href="/contact" className="group relative text-2xl font-light text-gray-300 hover:text-white transition-all duration-500 overflow-hidden">
          <span className="relative z-10 px-8 py-4 block">Contact</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </a>
      </div>
    ),

    // Cyberpunk Hardcore
    cyberpunk: (
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a href="/services" className="group font-mono text-green-400 hover:text-green-300 transition-all duration-300 text-lg relative">
          <div className="absolute inset-0 bg-green-400/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
          <div className="relative px-6 py-3 border-2 border-green-400/50 hover:border-green-400 bg-black/80 hover:bg-black/90 transform hover:skew-x-[-5deg] transition-all duration-300">
            <span className="text-green-500 animate-pulse mr-2">&gt;&gt;</span>
            <span className="tracking-widest">SERVICES.EXE</span>
            <span className="absolute top-0 right-0 text-xs text-green-600 opacity-60">[READY]</span>
          </div>
        </a>
        <a href="/about" className="group font-mono text-cyan-400 hover:text-cyan-300 transition-all duration-300 text-lg relative">
          <div className="absolute inset-0 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
          <div className="relative px-6 py-3 border-2 border-cyan-400/50 hover:border-cyan-400 bg-black/80 hover:bg-black/90 transform hover:skew-x-[-5deg] transition-all duration-300">
            <span className="text-cyan-500 animate-pulse mr-2">&gt;&gt;</span>
            <span className="tracking-widest">ABOUT.SYS</span>
            <span className="absolute top-0 right-0 text-xs text-cyan-600 opacity-60">[READY]</span>
          </div>
        </a>
        <a href="/contact" className="group font-mono text-red-400 hover:text-red-300 transition-all duration-300 text-lg relative">
          <div className="absolute inset-0 bg-red-400/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
          <div className="relative px-6 py-3 border-2 border-red-400/50 hover:border-red-400 bg-black/80 hover:bg-black/90 transform hover:skew-x-[-5deg] transition-all duration-300">
            <span className="text-red-500 animate-pulse mr-2">&gt;&gt;</span>
            <span className="tracking-widest">CONTACT.BAT</span>
            <span className="absolute top-0 right-0 text-xs text-red-600 opacity-60">[READY]</span>
          </div>
        </a>
      </div>
    ),

    // Cool/Sleek
    sleek: (
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a href="/services" className="group relative overflow-hidden text-white hover:text-white transition-all duration-500">
          <div className="relative px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-full border border-gray-600 hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110">
            <span className="relative z-10 font-medium tracking-wide">Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        </a>
        <a href="/about" className="group relative overflow-hidden text-white hover:text-white transition-all duration-500">
          <div className="relative px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-full border border-gray-600 hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110">
            <span className="relative z-10 font-medium tracking-wide">About</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        </a>
        <a href="/contact" className="group relative overflow-hidden text-white hover:text-white transition-all duration-500">
          <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full border border-blue-400 hover:border-blue-300 shadow-lg hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-110">
            <span className="relative z-10 font-medium tracking-wide">Contact</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        </a>
      </div>
    ),

    // Nerdy/Geeky
    nerdy: (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono text-sm">
        <a href="/services" className="group bg-gray-900 border-l-4 border-blue-400 hover:border-blue-300 px-4 py-3 min-w-[200px] hover:bg-gray-800 transition-all duration-300 rounded-r-md">
          <div className="flex items-center justify-between">
            <span className="text-blue-400 hover:text-blue-300">01</span>
            <span className="text-gray-300 hover:text-white mx-4 flex-grow text-left">services()</span>
            <span className="text-green-400 text-xs">.js</span>
          </div>
          <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            // Our digital solutions
          </div>
        </a>
        <a href="/about" className="group bg-gray-900 border-l-4 border-yellow-400 hover:border-yellow-300 px-4 py-3 min-w-[200px] hover:bg-gray-800 transition-all duration-300 rounded-r-md">
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 hover:text-yellow-300">02</span>
            <span className="text-gray-300 hover:text-white mx-4 flex-grow text-left">about()</span>
            <span className="text-green-400 text-xs">.ts</span>
          </div>
          <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            // Who we are
          </div>
        </a>
        <a href="/contact" className="group bg-gray-900 border-l-4 border-red-400 hover:border-red-300 px-4 py-3 min-w-[200px] hover:bg-gray-800 transition-all duration-300 rounded-r-md">
          <div className="flex items-center justify-between">
            <span className="text-red-400 hover:text-red-300">03</span>
            <span className="text-gray-300 hover:text-white mx-4 flex-grow text-left">contact()</span>
            <span className="text-green-400 text-xs">.jsx</span>
          </div>
          <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            // Let's connect
          </div>
        </a>
      </div>
    ),

    // Clean Minimal
    clean: (
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        <a href="/services" className="group text-gray-400 hover:text-white transition-all duration-300 text-lg relative">
          <span className="relative px-2 py-1">Services</span>
          <div className="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </a>
        <a href="/about" className="group text-gray-400 hover:text-white transition-all duration-300 text-lg relative">
          <span className="relative px-2 py-1">About</span>
          <div className="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </a>
        <a href="/contact" className="bg-white text-black hover:bg-gray-200 transition-all duration-300 text-lg px-6 py-3 rounded-full font-medium hover:scale-105">
          Contact
        </a>
      </div>
    ),

    // Retro Gaming - Original Colors
    retro: (
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center font-mono">
        <a href="/services" className="group bg-black border-4 border-green-400 hover:border-green-300 px-6 py-4 relative overflow-hidden transition-all duration-200 hover:scale-105">
          <div className="absolute inset-0 bg-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative text-green-400 hover:text-green-300 text-xl tracking-wider">▶ SERVICES</span>
          <div className="absolute -top-2 -right-2 bg-green-400 text-black text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            NEW!
          </div>
        </a>
        <a href="/about" className="group bg-black border-4 border-yellow-400 hover:border-yellow-300 px-6 py-4 relative overflow-hidden transition-all duration-200 hover:scale-105">
          <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative text-yellow-400 hover:text-yellow-300 text-xl tracking-wider">▶ ABOUT</span>
        </a>
        <a href="/contact" className="group bg-black border-4 border-red-400 hover:border-red-300 px-6 py-4 relative overflow-hidden transition-all duration-200 hover:scale-105 animate-pulse">
          <div className="absolute inset-0 bg-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative text-red-400 hover:text-red-300 text-xl tracking-wider">▶ CONTACT</span>
          <div className="absolute -top-2 -right-2 bg-red-400 text-black text-xs px-2 py-1 animate-bounce">
            START
          </div>
        </a>
      </div>
    ),

    // Retro Gaming - Grey Shades
    retroGrey: (
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center font-mono">
        <a href="/services" className="group bg-gray-900 border-4 border-gray-400 hover:border-gray-300 px-6 py-4 relative overflow-hidden transition-all duration-200 hover:scale-105">
          <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative text-gray-300 hover:text-white text-xl tracking-wider">▶ SERVICES</span>
          <div className="absolute -top-2 -right-2 bg-gray-400 text-black text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            NEW!
          </div>
        </a>
        <a href="/about" className="group bg-gray-900 border-4 border-gray-500 hover:border-gray-400 px-6 py-4 relative overflow-hidden transition-all duration-200 hover:scale-105">
          <div className="absolute inset-0 bg-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative text-gray-400 hover:text-gray-200 text-xl tracking-wider">▶ ABOUT</span>
        </a>
        <a href="/contact" className="group bg-gray-900 border-4 border-white hover:border-gray-200 px-6 py-4 relative overflow-hidden transition-all duration-200 hover:scale-105 animate-pulse">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative text-white hover:text-gray-100 text-xl tracking-wider">▶ CONTACT</span>
          <div className="absolute -top-2 -right-2 bg-white text-black text-xs px-2 py-1 animate-bounce">
            START
          </div>
        </a>
      </div>
    )
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="relative overflow-hidden h-full">
        <NeuralNetwork />
        
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-2 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/"><RaikiLogo /></a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono">← back</a>
          </nav>
        </header>

        {/* Main Content Area */}
        <div className="absolute inset-0 flex flex-col justify-center z-10 px-6 pt-16 pb-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                Design Styles Demo
              </h1>
              
              {/* Style Buttons */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {Object.keys(styles).map((style) => (
                  <button
                    key={style}
                    onClick={() => setCurrentStyle(style)}
                    className={`px-3 py-1 rounded font-mono text-xs transition-all duration-300 ${
                      currentStyle === style
                        ? 'bg-white text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Area */}
            <div className="text-center">
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-4">
                <h2 className="text-lg text-white mb-6 font-mono capitalize">{currentStyle} Style</h2>
                {styles[currentStyle]}
              </div>
              <p className="text-gray-400 text-sm">
                Hover over the links to see the interactive effects
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 px-6 bg-gradient-to-t from-black/60 to-transparent pt-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-400">
              Choose your preferred style and we'll implement it on your site
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}