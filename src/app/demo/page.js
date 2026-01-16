'use client';

import { useState, useEffect, useRef } from 'react';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';

/**
 * Loader Demo Page
 * 
 * Showcasing different loading transitions to solve the text flash issue
 * when navigating between pages with MatrixText components.
 */
export default function LoaderDemo() {
  const [currentLoader, setCurrentLoader] = useState('hexagon');
  const [isLoading, setIsLoading] = useState(false);

  const loaders = {
    // Spinning Hexagon v1 - Large White
    hexagon: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 border-4 border-gray-700 border-t-white animate-spin" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                 animationDuration: '1s'
               }}>
          </div>
        </div>
        <p className="text-white font-mono text-lg tracking-wider">INITIALIZING...</p>
      </div>
    ),

    // Spinning Hexagon v2 - Glowing Blue
    hexagonGlow: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-blue-800 border-t-blue-400 animate-spin shadow-lg shadow-blue-400/50" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                 animationDuration: '1.2s'
               }}>
          </div>
          <div className="absolute inset-2 border-2 border-blue-600 border-t-blue-200 animate-spin" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                 animationDuration: '2s',
                 animationDirection: 'reverse'
               }}>
          </div>
        </div>
        <p className="text-blue-300 font-mono text-lg tracking-wider">CONNECTING...</p>
      </div>
    ),

    // Spinning Hexagon v3 - Double Ring
    hexagonDouble: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 border-3 border-gray-600 border-t-gray-300 animate-spin" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                 animationDuration: '1.5s'
               }}>
          </div>
          <div className="absolute inset-4 border-2 border-gray-700 border-t-white animate-spin" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                 animationDuration: '1s',
                 animationDirection: 'reverse'
               }}>
          </div>
        </div>
        <p className="text-gray-300 font-mono text-lg tracking-wider">LOADING...</p>
      </div>
    ),

    // Glitch Effect
    glitch: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="text-2xl font-mono text-white mb-4 animate-pulse">
          <span className="inline-block animate-bounce delay-0">L</span>
          <span className="inline-block animate-bounce delay-100">O</span>
          <span className="inline-block animate-bounce delay-200">A</span>
          <span className="inline-block animate-bounce delay-300">D</span>
          <span className="inline-block animate-bounce delay-400">I</span>
          <span className="inline-block animate-bounce delay-500">N</span>
          <span className="inline-block animate-bounce delay-600">G</span>
        </div>
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gray-600 to-white animate-pulse"></div>
        </div>
      </div>
    ),

    // Minimal Dots
    dots: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="flex space-x-1 mb-4">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-0"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
        </div>
        <p className="text-gray-500 font-mono text-xs">loading</p>
      </div>
    ),

    // Typing Effect
    typing: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="text-lg font-mono text-gray-300 mb-4">
          <span className="animate-pulse">&gt; preparing interface</span>
          <span className="animate-pulse ml-1">_</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-1 h-4 bg-gray-600 animate-pulse delay-0"></div>
          <div className="w-1 h-4 bg-gray-600 animate-pulse delay-200"></div>
          <div className="w-1 h-4 bg-gray-600 animate-pulse delay-400"></div>
        </div>
      </div>
    ),

    // Matrix Rain - White/Gray
    matrix: (
      <div className="flex flex-col items-center justify-center h-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          {[...Array(12)].map((_, i) => (
            <div key={i} 
                 className="absolute top-0 text-white font-mono text-xl animate-pulse"
                 style={{ 
                   left: `${i * 8.33}%`, 
                   animationDelay: `${i * 0.15}s`,
                   animationDuration: '1.8s' 
                 }}>
              {['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', '01', '10'][Math.floor(Math.random() * 10)]}
            </div>
          ))}
        </div>
        <div className="relative z-10 text-white font-mono text-lg tracking-wider">
          <span className="animate-pulse">MATRIX LOADING...</span>
        </div>
      </div>
    ),

    // Cyberpunk Terminal
    terminal: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="bg-black border-2 border-gray-400 p-6 font-mono text-sm w-80">
          <div className="text-green-400 mb-2">raiki@system:~$</div>
          <div className="text-white mb-1">
            <span className="animate-pulse">loading interface...</span>
          </div>
          <div className="text-gray-400 mb-2">
            [████████████████████] 100%
          </div>
          <div className="text-cyan-400">
            <span className="animate-pulse">&gt; ready_</span>
          </div>
        </div>
      </div>
    ),

    // Binary Code Rain
    binary: (
      <div className="flex flex-col items-center justify-center h-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          {[...Array(20)].map((_, i) => (
            <div key={i} 
                 className="absolute top-0 text-gray-300 font-mono text-lg animate-pulse"
                 style={{ 
                   left: `${i * 5}%`, 
                   animationDelay: `${i * 0.1}s`,
                   animationDuration: '1.5s' 
                 }}>
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
        <div className="relative z-10 bg-black/60 px-6 py-3 border border-gray-500">
          <div className="text-white font-mono text-lg tracking-wider">
            <span className="animate-pulse">DECRYPTING DATA...</span>
          </div>
        </div>
      </div>
    ),

    // Sliding Bars
    bars: (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} 
                 className="w-1 bg-gray-600 animate-pulse"
                 style={{ 
                   height: `${20 + (i % 3) * 10}px`,
                   animationDelay: `${i * 0.1}s` 
                 }}>
            </div>
          ))}
        </div>
        <p className="text-gray-400 font-mono text-sm">PROCESSING</p>
      </div>
    )
  };

  const simulateLoading = (duration = 2000) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), duration);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#0c0a08] via-[#151210] to-[#1f1a15]">
      <div className="relative overflow-hidden h-full">
        <NeuralNetwork />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            {loaders[currentLoader]}
          </div>
        )}
        
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-2 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/"><RaikiLogo /></a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono">← back</a>
          </nav>
        </header>

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col justify-center z-10 px-6 pt-16 pb-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                Loader Options
              </h1>
              <p className="text-gray-400 mb-6">
                Different loading transitions to prevent text flash when switching pages
              </p>
              
              {/* Loader Selection */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {Object.keys(loaders).map((loader) => (
                  <button
                    key={loader}
                    onClick={() => setCurrentLoader(loader)}
                    className={`px-4 py-2 rounded font-mono text-sm transition-all duration-300 ${
                      currentLoader === loader
                        ? 'bg-white text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {loader}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Area */}
            <div className="text-center">
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-6">
                <h2 className="text-lg text-white mb-4 font-mono capitalize">{currentLoader} Loader</h2>
                {loaders[currentLoader]}
                
                <button
                  onClick={() => simulateLoading()}
                  disabled={isLoading}
                  className="mt-6 group bg-gray-800 border-2 border-gray-400 hover:border-gray-300 px-6 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative text-gray-300 group-hover:text-white font-mono tracking-wider">
                    {isLoading ? 'LOADING...' : '>> TEST LOADER'}
                  </span>
                </button>
              </div>
              
              {/* Implementation Notes */}
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600 rounded-lg p-6">
                <h3 className="text-white font-mono mb-3">Implementation</h3>
                <div className="text-left text-gray-300 font-mono text-sm space-y-2">
                  <p>• Show loader for ~200-500ms during page transitions</p>
                  <p>• Hide MatrixText until loader completes</p>
                  <p>• Prevents text flash by covering initial render</p>
                  <p>• Maintains cyberpunk aesthetic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 px-6 bg-gradient-to-t from-black/60 to-transparent pt-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-3 font-mono max-w-sm mx-auto sm:max-w-none sm:justify-center">
              <a href="/" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center sm:w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none">&gt;&gt; home</span>
              </a>
              <a href="/services" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-5 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center sm:w-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-gray-400 group-hover:text-white text-sm tracking-wider leading-none">&gt;&gt; services</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}