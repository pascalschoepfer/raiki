'use client';

import { useState } from 'react';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';

/**
 * Burger Menu Demo Page
 * 
 * Shows all burger menu alternatives in action so you can see
 * how they look and behave with your site's styling.
 */
export default function BurgerDemo() {
  const [openStates, setOpenStates] = useState({});

  const toggleMenu = (menuId) => {
    setOpenStates(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const burgerStyles = [
    {
      id: 'matrix',
      name: 'Matrix Style',
      description: 'Digital brackets - cyberpunk themed',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-gray-400 hover:text-white transition-all duration-300 text-lg font-mono group-hover:animate-pulse">
            [ ]
          </span>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-white transition-all duration-300 text-lg font-mono animate-pulse">
            [X]
          </span>
        </button>
      )
    },
    {
      id: 'terminal',
      name: 'Terminal Style',
      description: 'Command prompt with cursor',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-mono">
            ≡
          </span>
          <span className="text-gray-600 group-hover:text-gray-300 transition-all duration-300 text-xs font-mono animate-pulse">
            _
          </span>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-white transition-all duration-300 text-sm font-mono">
            ×
          </span>
          <span className="text-gray-300 transition-all duration-300 text-xs font-mono animate-pulse">
            _
          </span>
        </button>
      )
    },
    {
      id: 'retro',
      name: 'Retro Gaming Style',
      description: 'Pixel perfect lines',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <div className="flex flex-col gap-1">
            <div className="w-5 h-1 bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
            <div className="w-5 h-1 bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
            <div className="w-5 h-1 bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
          </div>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <div className="relative">
            <div className="w-5 h-1 bg-white transform rotate-45 absolute"></div>
            <div className="w-5 h-1 bg-white transform -rotate-45"></div>
          </div>
        </button>
      )
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Dots',
      description: 'Circuit board pattern',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <div className="grid grid-cols-3 gap-1">
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
          </div>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-white text-lg">×</span>
        </button>
      )
    },
    {
      id: 'glitch',
      name: 'Glitch Style',
      description: 'Distorted lines with movement',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-200 transform group-hover:translate-x-0.5"></div>
            <div className="w-4 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-200 transform group-hover:-translate-x-0.5"></div>
            <div className="w-5 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-200 transform group-hover:translate-x-1"></div>
          </div>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <div className="relative">
            <div className="w-6 h-0.5 bg-white transform rotate-45 absolute"></div>
            <div className="w-6 h-0.5 bg-white transform -rotate-45"></div>
          </div>
        </button>
      )
    },
    {
      id: 'binary',
      name: 'Binary Style',
      description: '0s and 1s pattern',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <div className="text-gray-400 group-hover:text-white transition-all duration-300 font-mono text-xs leading-tight">
            <div>101</div>
            <div>010</div>
            <div>111</div>
          </div>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-white font-mono text-lg">×</span>
        </button>
      )
    },
    {
      id: 'neon',
      name: 'Neon Box Style',
      description: 'Outlined square with glow',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-2 border-gray-400 hover:border-white transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-gray-400/25">
          <div className="flex flex-col gap-0.5">
            <div className="w-3 h-px bg-gray-400 group-hover:bg-white transition-colors duration-300"></div>
            <div className="w-3 h-px bg-gray-400 group-hover:bg-white transition-colors duration-300"></div>
            <div className="w-3 h-px bg-gray-400 group-hover:bg-white transition-colors duration-300"></div>
          </div>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-2 border-white transition-all duration-300 cursor-pointer group shadow-lg shadow-white/25">
          <span className="text-white text-sm">×</span>
        </button>
      )
    },
    {
      id: 'ascii',
      name: 'ASCII Art Style',
      description: 'Text character symbols',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-gray-400 group-hover:text-white transition-all duration-300 font-mono text-sm">
            ▦
          </span>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
          <span className="text-white font-mono text-sm">
            ▣
          </span>
        </button>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal Retro',
      description: 'Matches your button style perfectly',
      closed: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-gray-900 border border-gray-400 hover:border-gray-300 cursor-pointer group transition-all duration-200 hover:shadow-lg hover:shadow-gray-400/25">
          <div className="flex flex-col gap-1">
            <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
            <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
            <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
          </div>
        </button>
      ),
      open: (
        <button className="flex flex-col justify-center items-center w-8 h-8 bg-gray-900 border border-white cursor-pointer group transition-all duration-200 shadow-lg shadow-white/25">
          <span className="text-white text-xs">×</span>
        </button>
      )
    }
  ];

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

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col justify-center z-10 px-6 pt-16 pb-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                Burger Menu Examples
              </h1>
              <p className="text-gray-400">
                Click each burger menu to see open/closed states
              </p>
            </div>

            {/* Burger Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {burgerStyles.map((style) => (
                <div key={style.id} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
                  <h3 className="text-white font-mono text-lg mb-2">{style.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{style.description}</p>
                  
                  {/* Demo Button */}
                  <div className="mb-4 flex justify-center">
                    <div onClick={() => toggleMenu(style.id)}>
                      {openStates[style.id] ? style.open : style.closed}
                    </div>
                  </div>
                  
                  {/* State Label */}
                  <p className="text-xs text-gray-500 font-mono">
                    {openStates[style.id] ? 'OPEN STATE' : 'CLOSED STATE'}
                  </p>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="text-center bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-white font-mono text-lg mb-2">Recommendation</h3>
              <p className="text-gray-300 mb-4">
                The <strong className="text-white">Minimal Retro</strong> style matches your navigation buttons perfectly
              </p>
              <p className="text-gray-400 text-sm">
                Same colors, borders, and hover effects as your ▶ services/about/contact buttons
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}